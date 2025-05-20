"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "@/components/shared/input/InputField";
import ImagePart from "./imagePart/ImagePart";
import TextInput from "./TextInput";
import schema from "./schema";
import axios from "axios";
import { api, url } from "@/api/api";
import { getBlogById } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "next-client-cookies";
interface IFormInput {
  title: string;
  banner: any;
  des: string;
  thumbnail: any;
}

const EditBlog = () => {
  const cookies = useCookies();
  const user_pid = cookies.get("user_pid");
  const t = useTranslations("Blog");
  const [selectedImageBanner, setSelectedImageBanner] = useState<
    File | string | null
  >(null);
  const [selectedImageThumbnail, setSelectedImageThumbnail] = useState<
    File | string | null
  >(null);
  const [textDescription, setTextDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const { id } = params;
  const locale = useLocale();
  const router = useRouter();
  const {
    isLoading: isL,
    data,
    error,
  } = useQuery({
    queryKey: ["getBlogById", id],
    queryFn: () => getBlogById(id as string, 1),
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        des: data.description,
        banner: data.banner_file_url,
        thumbnail: data.thumbnail_file_url,
      });
      setSelectedImageBanner(data.banner_file_url);
      setSelectedImageThumbnail(data.thumbnail_file_url);
      setTextDescription(data.description);
    }
  }, [data, reset]);

  const createFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  };

  const onSubmit = async (data: IFormInput) => {
    setIsLoading(true);
    const formData = new FormData();
    if (user_pid) formData.append("user_pid", user_pid);
    // formData.append("category_pid", "C250100000001");
    formData.append("title", data.title);
    if (data?.des) {
      formData.append("description", data.des);
    }
    formData.append("active_status", "1");

    if (selectedImageBanner && typeof selectedImageBanner !== "string") {
      const fileList = createFileList([selectedImageBanner]);
      formData.append("banner", fileList[0]);
    }

    if (selectedImageThumbnail && typeof selectedImageThumbnail !== "string") {
      const fileList = createFileList([selectedImageThumbnail]);
      formData.append("thumbnail", fileList[0]);
    }
    try {
      await api.post(`/api/admin/blog-post-update/${id}`, formData);
      toast.success("Submitted successfully", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset({
        des: "",
        title: "",
        banner: "",
        thumbnail: "",
      });
      setSelectedImageBanner(null);
      setSelectedImageThumbnail(null);
      setTimeout(() => {
        router.push(`/${locale}/meet-partners/blogs/blog-management/${id}`);
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong! please try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChangeBanner = (file: File | null) => {
    setSelectedImageBanner(file);
    if (file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      setValue("banner", dataTransfer.files);
      trigger("banner");
    }
  };

  const handleImageChangeThumbnail = (file: File | null) => {
    setSelectedImageThumbnail(file);
    if (file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      setValue("thumbnail", dataTransfer.files);
      trigger("thumbnail");
    }
  };

  if (error) {
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Somethingwentwrong")}
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mt-20">
      <ToastContainer />
      <div className="bg-brandDs font-bold text-bgPrimary p-2 rounded-md">
        {t("EditYourBlogPost")}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 py-5"
      >
        <InputField
          type="text"
          labelName={t("BlogPostTitle")}
          placeholderText={t("EnterTitle")}
          inputName="title"
          errors={errors}
          register={register}
          mandatory={true}
        />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 pb-5">
          <ImagePart
            id="banner"
            name={"Banner"}
            selectedImage={selectedImageBanner}
            setSelectedImage={handleImageChangeBanner}
            errors={errors}
            register={register}
            setValue={setValue}
          />
          <ImagePart
            id="thumbnail"
            name={"Thumbnail"}
            selectedImage={selectedImageThumbnail}
            setSelectedImage={handleImageChangeThumbnail}
            errors={errors}
            register={register}
            setValue={setValue}
          />
        </div>
        <TextInput
          control={control}
          errors={errors}
          textDescription={textDescription}
          setTextDescription={setTextDescription}
          required={true}
        />
        <div className="flex justify-center py-5">
          <button
            type="submit"
            className="bg-success text-bgPrimary text-sm font-medium w-[50%] py-3 rounded-full"
          >
            {t("PublishNow")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
