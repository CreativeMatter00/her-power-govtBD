"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "@/components/shared/input/InputField";
import ImagePart from "./imagePart/ImagePart";
import schema from "./schema";
import axios from "axios";
import { url } from "@/api/api";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import "react-toastify/dist/ReactToastify.css";

interface IFormInput {
  title: string;
  doc: any;
}
const AddDocument = () => {
  const t = useTranslations("resources_Library");
  const cookies = useCookies();
  const user_pid = cookies.get("user_pid");
  const locale = useLocale();
  const router = useRouter();
  const [selectedDocs, setSelectedDocs] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInput) => {
    // console.log(data);
    const formData = new FormData();
    if (user_pid) formData.append("user_pid", user_pid);
    formData.append("title", data.title);
    formData.append("active_status", "1");

    if (selectedDocs.length > 0) {
      selectedDocs.forEach((file) => {
        formData.append("document[]", file);
        // console.log(file);
      });
    }
    // const printFormData = (formData: FormData) => {
    //   formData.forEach((value, key) => {
    //     if (value instanceof File) {
    //       console.log(`${key}: File - ${value.name}`);
    //     } else {
    //       console.log(`${key}: ${value}`);
    //     }
    //   });
    // };
    // printFormData(formData);
    try {
      await axios.post(`${url}/api/admin/document`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
        title: "",
        doc: "",
      });
      setSelectedDocs([]);
      router.push(`/${locale}/resource-library/documents`);
      // setTimeout(() => {
      // }, 3000);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDocChange = (files: File[]) => {
    setSelectedDocs(files);
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    setValue("doc", dataTransfer.files);
    trigger("doc");
  };

  return (
    <div className="container max-w-7xl mt-20">
      <div className="bg-brandDs font-bold text-bgPrimary p-2 rounded-md">
        {t("Add Your Document")}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 py-5"
      >
        <InputField
          type="text"
          labelName={t("Document Title")}
          placeholderText={t("Enter the title")}
          inputName="title"
          errors={errors}
          register={register}
          mandatory={true}
        />
        <div className="pb-5">
          <ImagePart
            selectedImages={selectedDocs}
            setSelectedImages={handleDocChange}
            errors={errors}
            register={register}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-success text-bgPrimary text-sm font-medium w-[50%] py-3 rounded-full"
          >
            {t("Add Document")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDocument;
