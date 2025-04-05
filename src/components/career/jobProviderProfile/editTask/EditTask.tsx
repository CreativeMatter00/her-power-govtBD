"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../inputFields/InputField";
import TextInput from "../inputFields/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { getTaskDetailsById, url } from "@/api/api";
import { useCookies } from "next-client-cookies";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Schema from "./Schema";
import { useTranslations } from "next-intl";

interface IFormInput {
  user_pid: string;
  jobtitle: string;
  duration: number;
  email: string;
  jobdescription?: string;
  remarks?: string;
}

const EditTask = () => {
  const t = useTranslations("career");

  const [textDescription, setTextDescription] = useState("");
  const cookies = useCookies();
  const params = useParams();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");
  const router = useRouter();
  const providerId = cookies.get("jobProvider_pid");
  const { id } = params;
  const {
    isLoading,
    error,
    data: taskDetails,
    refetch,
  } = useQuery({
    queryKey: ["getTaskDetails", id],
    queryFn: () => getTaskDetailsById(id as string),
  });
  const resolver = yupResolver(Schema);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
  } = useForm<IFormInput>({ resolver, defaultValues: {} });

  useEffect(() => {
    if (taskDetails) {
      setValue("jobtitle", taskDetails.jobtitle);
      setValue("duration", taskDetails.duration);
      setValue("email", taskDetails.email);
      setValue("jobdescription", taskDetails.jobdescription);
      setValue("remarks", taskDetails.remarks);
    } else {
      reset();
    }
  }, [reset, taskDetails]);

  const onSubmit = async (data: any) => {
    const newData = {
      jobdescription: data.jobdescription ?? taskDetails.jobdescription,
      ...data,
    };
    try {
      const response = await axios.post(
        `${url}/api/task-update/${id}`,
        newData
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
        router.push(redirectPath as string);
        refetch();
        reset();
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
  return (
    <section className="container px-4 py-10 max-md:py-20">
      <p className="font-bold text-2xl">{t("TaskDetails")}</p>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="mt-9 flex flex-col gap-7"
      >
        <input hidden value={providerId} {...register("user_pid")} />
        <InputField
          inputLabel="Title"
          inputName="jobtitle"
          placeHolderText="Title"
          errors={errors}
          register={register}
          // defaultValue={taskDetails?.jobtitle}
          required={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-5">
          <InputField
          inputType="number"
            inputLabel="Duration"
            inputName="duration"
            placeHolderText="Duration"
            errors={errors}
            register={register}
            // defaultValue={taskDetails?.duration}
            required={true}
          />
          <InputField
            inputLabel="Email"
            inputName="email"
            placeHolderText="Email"
            errors={errors}
            register={register}
            // defaultValue={taskDetails?.email}
            required={true}
          />
        </div>
        <div className="flex flex-col gap-5">
          <TextInput
            labelName="Description"
            errors={errors}
            setTextDescription={setTextDescription}
            control={control}
            name="jobdescription"
            required={true}
            // defaultValue={taskDetails.jobdescription}
          />
          <InputField
            inputLabel="Remarks"
            inputName="remarks"
            placeHolderText="Remarks"
            errors={errors}
            register={register}
            // defaultValue={taskDetails?.remarks}
            // required={true}
          />
        </div>
        <div className="flex justify-end">
          <div className="flex item-center gap-5">
            <button
              className="text-lg font-medium text-brandDs px-[37px] py-[3px] border hover:border-2 border-brandDs rounded-full"
              type="button"
              onClick={() => reset()}
            >
              {t("Cancel")}
            </button>
            <button className="text-lg text-white font-medium px-[37px] py-2 bg-brandHover hover:bg-brandDs rounded-full">
              {t("PostTask")}
            </button>
          </div>
        </div>
        <ToastContainer />
      </form>
    </section>
  );
};

export default EditTask;
