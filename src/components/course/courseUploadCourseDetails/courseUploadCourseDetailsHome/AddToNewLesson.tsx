"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FaVideo } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InputField from "@/components/shared/input/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";
import TextInput from "./TextInput";
import VideoInput from "./videoPart/VideoInput";
import { addNewLesson, url } from "@/api/api";
import schema from "./schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { AiOutlineUpload } from "react-icons/ai";
import { useTranslations } from "next-intl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IFormInput {
  title: string;
  des: string;
  video: any;
}

export default function AddToNewLesson() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);
  const [textDescription, setTextDescription] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [open, setOpen] = useState<boolean>(false);
  const t = useTranslations("resources_Library");

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const { mutate, isSuccess } = useMutation({
    mutationFn: async (data: any) => {
      abortControllerRef.current = new AbortController();
      try {
        const response = await axios.post(
          `${url}/api/admin/course-lessons`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || 1)
              );
              setUploadProgress(percentCompleted);
            },
            signal: abortControllerRef.current.signal,
          }
        );
        if (response.status === 201) {
          return response.data;
        } else {
          throw new Error("Upload failed");
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("New Lesson Added...");
      queryClient.invalidateQueries(["CourseLessons"] as any);
    },
    onError: (error: Error) => {
      toast.error("Upload failed...");
      console.error("Error adding lesson:", error.message);
    },
    onMutate: () => {
      setUploadProgress(0);
    },
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    if (id) formData.append("course_pid", Array.isArray(id) ? id[0] : id);
    formData.append("session_title", data.title);
    formData.append("session_description", data.des);
    if (selectedFile) {
      const fileList = createFileList([selectedFile]);
      formData.append("video", fileList[0]);
    }

    try {
      await mutate(formData);
      toast.success("New Lesson Added...");
    } catch (error) {
      console.log("error", error);
    }
  };

  // Cancel upload function
  const handleCancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Abort the ongoing request
    }
    resetForm(); // Reset the form and state
  };

  // Reset form and state
  const resetForm = () => {
    reset({
      title: "",
      des: "",
      video: "",
    });
    setUploadProgress(0);
    setSelectedFile(null);
    setTextDescription("");
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      resetForm();
    }
  }, [isSuccess]);

  const createFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  };

  const handleVideoChange = (file: File | null) => {
    setSelectedFile(file);
    const fileList = file ? createFileList([file]) : new DataTransfer().files;
    setValue("video", fileList);
    trigger("video");
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-end mt-8">
        <Button
          onClick={handleOpen}
          className="bg-[#2D0C3E] px-6 text-white rounded-full flex items-center gap-2"
        >
          <FaVideo className="text-xl" /> {t("Add New Course Video")}
        </Button>
      </div>
      <div>
        <Dialog open={open} onOpenChange={handleClose}>
          <DialogContent className="w-8/12 bg-white overflow-y-auto max-h-[78vh]">
            <DialogHeader>
              <DialogTitle>{t("Add New Course Video")}</DialogTitle>
            </DialogHeader>
            <div className="">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 py-5"
              >
                <InputField
                  type="text"
                  labelName={t("Lesson Name")}
                  placeholderText={t("Enter the title")}
                  inputName="title"
                  errors={errors}
                  register={register}
                  mandatory={true}
                />
                <VideoInput
                  selectedFile={selectedFile}
                  setSelectedFile={handleVideoChange}
                  errors={errors}
                  register={register}
                />
                <div className="mt-3 flex items-center gap-2">
                  <AiOutlineUpload size={24} />
                  <Progress value={uploadProgress} />
                </div>
                <TextInput
                  control={control}
                  errors={errors}
                  textDescription={textDescription}
                  setTextDescription={setTextDescription}
                  required={true}
                />
                <DialogFooter className="flex gap-2">
                  {uploadProgress > 0 && (
                    <Button
                      type="button"
                      onClick={handleCancelUpload}
                      className="bg-red-500 px-6 text-white rounded-full"
                    >
                      {t("Cancel")}
                    </Button>
                  )}
                  {uploadProgress === 0 && (
                    <Button
                      type="submit"
                      className="bg-[#2D0C3E] px-6 text-white rounded-full"
                    >
                      {t("Upload")}
                    </Button>
                  )}
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
