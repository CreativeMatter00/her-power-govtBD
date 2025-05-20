"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "@/components/shared/input/InputField";
import ImagePart from "./imagePart/ImagePart";
import VideoInput from "./videoPart/VideoInput";
import { Progress } from "@/components/ui/progress";
import { AiOutlineUpload } from "react-icons/ai";
import { useCookies } from "next-client-cookies";
import axios from "axios";
import { api, getStoryById } from "@/api/api";
import { useParams, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import schema from "./schema";
import { useQuery } from "@tanstack/react-query";

interface IFormInput {
  title: string;
  thumbnail?: any;
  video?: any;
}

const EditStroy = () => {
  const t = useTranslations("story");
const abortControllerRef = useRef<AbortController | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const cookies = useCookies();
  const userPid = cookies.get("user_pid");
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();
  const { id } = params;
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

  const { data } = useQuery({
    queryKey: ["getStoryById", id],
    queryFn: () => getStoryById(id as string),
  });
  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        video: data.video_url,
        thumbnail: data.thumbnail_url,
      });
      setSelectedImage(data.thumbnail_url);
      setSelectedFile(data.video_url);
    }
  }, [data, reset]);

  const onSubmit = async (data: IFormInput) => {
    // console.log(data);
    const formData = new FormData();
    if (userPid) formData.append("user_pid", userPid);
    formData.append("title", data.title);
    formData.append("active_status", "1");
    if (selectedImage && selectedImage !== data.thumbnail) { 
      formData.append("thumbnail", selectedImage);
    }
    if (selectedFile && selectedFile !== data.video) {
      formData.append("video", selectedFile);
    }
    abortControllerRef.current = new AbortController();
    try {
      setIsUploading(true);
      await api.post(`/api/admin/update-success-stories/${id}`, formData, {
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
      });
      reset({
        title: "",
        thumbnail: "",
        video: ""
      });
      setSelectedFile(null);
      setSelectedImage(null);
      setUploadProgress(0);
      setIsUploading(false);
      router.push(`/${locale}/success-stories/stories/stories-management`);
    } catch (error) {
      console.log("error", error);
      setIsUploading(false);
    }
  };
  const handleCancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    resetForm();
    setIsUploading(false);
  };
  const resetForm = () => {
    reset({
      title: "",
      thumbnail: "",
      video: "",
    });
    setUploadProgress(0);
    setSelectedFile(null);
    setSelectedImage(null);
  };
  const createFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  };

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
    const fileList = file ? createFileList([file]) : new DataTransfer().files;
    setValue("thumbnail", fileList);
    trigger("thumbnail");
  };

  const handleVideoChange = (file: File | null) => {
    setSelectedFile(file);
    const fileList = file ? createFileList([file]) : new DataTransfer().files;
    setValue("video", fileList);
    trigger("video");
  };
  return (
    <div className="container max-w-7xl mt-20">
      <div className="bg-brandDs font-bold text-bgPrimary p-2 rounded-md">
        {t("Edit Success Story")}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 py-5"
      >
        <InputField
          type="text"
          labelName={t("Story Title")}
          placeholderText={t("Enter the title")}
          inputName="title"
          errors={errors}
          register={register}
          mandatory={true}
        />
        <div className="grid pb-5 gap-10 lg:grid-cols-2">
          <ImagePart
            id="thumbnail"
            name="thumbnail"
            selectedImage={selectedImage}
            setSelectedImage={handleImageChange}
            errors={errors}
            register={register}
          />
          <VideoInput
            id="video"
            name="video"
            selectedFile={selectedFile}
            setSelectedFile={handleVideoChange}
            errors={errors}
            register={register}
          />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <AiOutlineUpload size={24} />
          <Progress value={uploadProgress} />
        </div>
        <div className="flex justify-center py-5">
        {isUploading ? (
            <button
              type="button"
              onClick={handleCancelUpload}
              className="bg-red-500 text-bgPrimary text-sm font-medium w-[50%] py-3 rounded-full"
            >
              {t("Cancel")}
            </button>
          ) : (
            <button
              type="submit"
              className="bg-success text-bgPrimary text-sm font-medium w-[50%] py-3 rounded-full"
            >
              {t("Publish Now")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditStroy;
