"use client";

import React, { useState } from "react";
import InputField from "../inputFields/InputField";
import { useForm } from "react-hook-form";
import RadioInput from "../inputFields/RadioInput";
import SelectInput from "../inputFields/SelectInput";
import DatePicker from "../inputFields/DatePicker";
import TextInput from "../inputFields/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import Schema from "./Schema";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { api, url } from "@/api/api";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import ImagePart from "./imagePart/ImagePart";

interface IFormInput {
  jobtitle: string;
  provider_name: string;
  workplace_type: string;
  job_location: string;
  jobdescription: string;
  job_type: string;
  banner: any;
}

const PostJob = () => {
  const t = useTranslations("career");
  const cookies = useCookies();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [textDescription, setTextDescription] = useState("");
  const [selectedImageBanner, setSelectedImageBanner] = useState<File | null>(
    null
  );
  const router = useRouter();
  const locale = useLocale();

  const resolver = yupResolver(Schema);
  const providerId = cookies.get("jobProvider_pid");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    trigger,
    control,
  } = useForm<IFormInput>({ resolver });

  const createFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true); // Start loading
    const formData = new FormData();
    if (providerId) formData.append("user_pid", providerId);
    formData.append("jobtitle", data.jobtitle);
    formData.append("provider_name", data.provider_name);
    formData.append("workplace_type", data.workplace_type);
    formData.append("job_location", data.job_location);
    formData.append("jobdescription", data.jobdescription);
    formData.append("job_type", data.job_type);
    formData.append("validdate", data.validdate);
    if (selectedImageBanner) {
      const fileList = createFileList([selectedImageBanner]);
      formData.append("banner", fileList[0]);
    }
    try {
      const response = await api.post(`/api/job-post-store`, formData);
      if (response?.data?.meta?.status === true) {
        toast.success("Job Posted Successfully!", {
          position: "bottom-left",
          autoClose: 3001,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        reset();
        setTimeout(()=>{
          router.push(`/${locale}/career`);
        },3000)
      } else {
        toast.error("Job Posting failed! Please try again.", {
          position: "bottom-left",
          autoClose: 3001,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error: any) {
      toast.error("Job Posting failed! Please try again.", {
        position: "bottom-left",
        autoClose: 3001,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("error", error.response ? error.response.data : error);
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

  return (
    <section className="container px-4 py-10 max-md:py-20">
      <p className="font-bold text-2xl">{t("Job Details")}</p>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="mt-9 flex flex-col gap-7"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-5">
          <InputField
            inputLabel={t("Title")}
            inputName="jobtitle"
            placeHolderText={t("Title")}
            errors={errors}
            register={register}
            required={true}
          />
          <InputField
            inputLabel={t("Company")}
            inputName="provider_name"
            placeHolderText={t("Company")}
            errors={errors}
            register={register}
            required={true}
          />
          <RadioInput
            inputLabel={t("Workplace type")}
            inputName="workplace_type"
            errors={errors}
            register={register}
            required={true}
          />
          <InputField
            inputLabel={t("Job Location")}
            inputName="job_location"
            placeHolderText={t("Job Location")}
            errors={errors}
            register={register}
            required={true}
          />
          <SelectInput
            control={control}
            name="job_type"
            data={[
              { value: "Full time", label: t("Full Time") },
              { value: "Contract", label: t("Contract") },
              { value: "Temporary", label: t("Temporary") },
              { value: "Internship", label: t("Internship") },
            ]}
            label={t("Job Type")}
            placeholder={t("-Job Type-")}
            error={errors.job_type?.message}
            valueKey="value"
            labelKey="label"
            isLoading={false}
            required={true}
          />
          <DatePicker
            name="validdate"
            setValue={setValue}
            register={register}
            errors={errors}
            required={true}
          />
        </div>
        <div>
          <ImagePart
            id="banner"
            name={"Banner"}
            selectedImage={selectedImageBanner}
            setSelectedImage={handleImageChangeBanner}
            errors={errors}
            register={register}
          />
        </div>
        <div>
          <TextInput
            labelName={t("Description")}
            name="jobdescription"
            errors={errors}
            setTextDescription={setTextDescription}
            control={control}
            required={true}
          />
        </div>
        <div className="flex justify-end">
          <div className="flex item-center gap-5">
            <button
              type="button"
              className="text-lg font-medium text-brandDs px-[37px] py-[3px] border hover:border-2 border-brandDs rounded-full"
              onClick={() => reset()}
            >
              {t("Cancel")}
            </button>
            <button
              type="submit"
              className="text-lg text-white font-medium px-[37px] py-2 bg-brandHover hover:bg-brandDs rounded-full "
            >
              {t("PostJob")}
            </button>
          </div>
        </div>

        <ToastContainer />
      </form>
    </section>
  );
};

export default PostJob;