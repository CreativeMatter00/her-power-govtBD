"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "@/components/shared/input/InputField";
import ImagePart from "./imagePart/ImagePart";
import TextInput from "./TextInput";
import schema from "./schema";
import axios from "axios";
import { api, url } from "@/api/api";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

interface IFormInput {
  title: string;
  banner: any;
  thumbnail: any;
  des: string;
}

const WriteArticle = () => {
  const t = useTranslations("resources_Library");
  const cookies = useCookies();
  const user_pid = cookies.get("user_pid");
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImageBanner, setSelectedImageBanner] = useState<File | null>(
    null
  );
  const [selectedImageThumbnail, setSelectedImageThumbnail] =
    useState<File | null>(null);
  const [textDescription, setTextDescription] = useState<string>("");

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
  const createFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  };
  const onSubmit = async (data: IFormInput) => {
    // console.log(data);
    setIsLoading(true);
    const formData = new FormData();
    if(user_pid) formData.append("user_pid", user_pid);
    formData.append("title", data.title);
    if (data?.des) {
      formData.append("description", data.des);
    }
    formData.append("active_status", "1");

    if (selectedImageBanner) {
      const fileList = createFileList([selectedImageBanner]);
      formData.append("banner", fileList[0]);
    }

    if (selectedImageThumbnail) {
      const fileList = createFileList([selectedImageThumbnail]);
      formData.append("thumbnail", fileList[0]);
    }
    try {
      await api.post(`/api/admin/article`, formData);
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
      router.push(`/${locale}/resource-library/articles`);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChangeBanner = (file: File | null) => {
    setSelectedImageBanner(file);
    const dataTransfer = new DataTransfer();
    if (file) {
      dataTransfer.items.add(file);
    }
    setValue("banner", dataTransfer.files);
    trigger("banner");
  };
  const handleImageChangeThumbnail = (file: File | null) => {
    setSelectedImageThumbnail(file);
    const dataTransfer = new DataTransfer();
    if (file) {
      dataTransfer.items.add(file);
    }
    setValue("thumbnail", dataTransfer.files);
    trigger("thumbnail");
  };

  return (
    <div className="container max-w-7xl mt-20">
      <div className="bg-brandDs font-bold text-bgPrimary p-2 rounded-md">
        {t("Write Your Article")}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 py-5"
      >
        <InputField
          type="text"
          labelName={t("Article Title")}
          placeholderText={t("Enter the title")}
          inputName="title"
          errors={errors}
          register={register}
          mandatory={true}
        />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 pb-5">
          <ImagePart
            name={"Banner"}
            selectedImage={selectedImageBanner}
            setSelectedImage={handleImageChangeBanner}
            errors={errors}
            register={register}
          />
          <ImagePart
            name={"Thumbnail"}
            selectedImage={selectedImageThumbnail}
            setSelectedImage={handleImageChangeThumbnail}
            errors={errors}
            register={register}
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
            {t("Publish Now")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteArticle;
