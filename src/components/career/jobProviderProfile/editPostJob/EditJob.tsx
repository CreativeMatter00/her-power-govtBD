"use client";

import React, { useEffect, useState } from "react";
import InputField from "../inputFields/InputField";
import ImagePart from "./imagePart/ImagePart";
import { useForm } from "react-hook-form";
import RadioInput from "../inputFields/RadioInput";
import SelectInput from "../inputFields/SelectInput";
import DatePicker from "../inputFields/DatePicker";
import TextInput from "../inputFields/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { api, getJobDetailsById, url } from "@/api/api";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import Schema from "./Schema";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTranslations } from "next-intl";

interface IFormInput {
  jobtitle: string;
  provider_name: string;
  workplace_type: string;
  job_location: string;
  jobdescription?: string;
  job_type: string;
  validdate: string;
  banner?: any;
}

const EditJob = () => {
  const t = useTranslations("career");
  const cookies = useCookies();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [textDescription, setTextDescription] = useState("");
  const providerId = cookies.get("jobProvider_pid");
  const [selectedImageBanner, setSelectedImageBanner] = useState<
      File | string | null
    >(null);
  const { id } = params;
  const {
    isLoading,
    error,
    data: jobDetails,
    refetch,
  } = useQuery({
    queryKey: ["getJobDetails", id],
    queryFn: () => getJobDetailsById(id as string),
  });

  const resolver = yupResolver(Schema);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    trigger,
    control,
    resetField,
  } = useForm<IFormInput>({
    resolver,
    defaultValues: {
      job_type: jobDetails?.job_type || "",
      validdate: jobDetails?.validdate || "",
    },
  });
 console.log("jobDetails.file_url",jobDetails?.file_url);
 
  useEffect(() => {
    if (jobDetails) {
      reset({
        job_type: jobDetails.job_type,
        jobtitle: jobDetails.jobtitle,
        provider_name: jobDetails.provider_name,
        workplace_type: jobDetails.workplace_type,
        job_location: jobDetails.job_location,
        jobdescription: jobDetails.jobdescription,
        banner: jobDetails.file_url,
      });
      setSelectedImageBanner(jobDetails.file_url);
    }
  }, [jobDetails, reset]);
  const createFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  };
  const jobType = watch("job_type");
  // console.log("job type", jobType)
  const validdate = watch("validdate");
  // console.log("validdate value", validdate)

  const onSubmit = async (data: any) => {
    // setIsLoading(true);

    const newData = {
      user_pid: providerId,
      // validdate:"11/6/24",
      jobdescription: data.jobdescription ?? jobDetails.jobdescription,
      ...data,
    };
    const formData = new FormData();
    if (providerId) formData.append("user_pid", providerId);
    formData.append("jobtitle", data.jobtitle);
    formData.append("provider_name", data.provider_name);
    formData.append("workplace_type", data.workplace_type);
    formData.append("job_location", data.job_location);
    formData.append("jobdescription", data.jobdescription);
    formData.append("job_type", data.job_type);
    formData.append("validdate", data.validdate);
    if (selectedImageBanner && typeof selectedImageBanner !== "string") {
      const fileList = createFileList([selectedImageBanner]);
      formData.append("banner", fileList[0]);
    }else{
      formData.append("banner", jobDetails.file_url);
    }
    try {
      const response = await api.post(
        `/api/job-post-update/${id}`,
        formData
      );
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
        setSelectedImageBanner(null);
        router.push(redirect as string);
        reset();
        refetch();
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
      // setIsLoading(false); // Stop loading
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
  if (isLoading) {
    return (
      <div className="w-full min-h-[300px] flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );
  }

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something_went_wrong")}
      </div>
    );

  const onError = (errors: any) => {
    // console.log("Form validation errors:", errors);
    // alert("Please correct the errors in the form.");
  };

  return (
    <section className="container px-4 py-10 max-md:py-20">
      <p className="font-bold text-2xl">{t("JobDetails")}</p>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit, onError)}
        className="mt-9 flex flex-col gap-7"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-5">
          <InputField
            inputLabel="Job Title"
            inputName="jobtitle"
            placeHolderText="Job Title"
            errors={errors}
            register={register}
            defaultValue={jobDetails?.jobtitle}
            required={true}
          />
          <InputField
            inputLabel="Company"
            inputName="provider_name"
            placeHolderText="Company"
            errors={errors}
            register={register}
            defaultValue={jobDetails?.provider_name}
            required={true}
          />
          <RadioInput
            inputLabel="Workplace type"
            inputName="workplace_type"
            errors={errors}
            register={register}
            defaultValue={jobDetails?.workplace_type}
            required={true}
          />
          <InputField
            inputLabel="Job Location"
            inputName="job_location"
            placeHolderText="Job Location"
            errors={errors}
            register={register}
            defaultValue={jobDetails?.job_location}
            required={true}
          />
          {/* <SelectInput /> */}

          <SelectInput
            control={control}
            name="job_type"
            data={[
              { value: "Full time", label: "Full Time" },
              { value: "Part time", label: "Part Time" },
              { value: "Contract", label: "Contract" },
              { value: "Temporary", label: "Temporary" },
              { value: "Internship", label: "Internship" },
            ]}
            label="Job Type"
            placeholder="-Job Type-"
            error={errors.job_type?.message}
            valueKey="value"
            labelKey="label"
            isLoading={false}
            defaultValue={jobDetails?.job_type}
            required={true}
          />

          <DatePicker
            name="validdate"
            setValue={setValue}
            register={register}
            errors={errors}
            watch={watch}
            defaultDate={jobDetails?.validdate}
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
            labelName="Description"
            name="jobdescription"
            errors={errors}
            setTextDescription={setTextDescription}
            control={control}
            required={true}
            // defaultValue={data?.jobdescription}
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

export default EditJob;
