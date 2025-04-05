"use client";
import { url } from "@/api/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../inputFields/InputField";
import TextInput from "../inputFields/TextInput";
import Schema from "./Schema";

interface IFormInput {
  user_pid: string;
  jobtitle: string;
  duration: number;
  email: string;
  jobdescription: string;
  remarks: string;
}

const PostTask = () => {
  const t = useTranslations("career");

  const [textDescription, setTextDescription] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cookies = useCookies();
  const providerId = cookies.get("jobProvider_pid");

  const router = useRouter();
  const locale = useLocale();

  const resolver = yupResolver(Schema);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
  } = useForm<IFormInput>({ resolver });

  const onSubmit = (data: any) => {
    setIsLoading(true);
    fetch(`${url}/api/task-store`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.meta.status == true) {
          toast.success("Message sent successfully!", {
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
          router.push(`/${locale}/career`);
          // refetch();
        } else {
          toast.error("Message not sent. Please try again!", {
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
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <section className="container px-4 py-10 max-md:py-20">
      <p className="font-bold text-2xl">{t("FreelanceServiceDetails")}</p>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="mt-9 flex flex-col gap-7"
      >
        <input hidden value={providerId} {...register("user_pid")} />
        <InputField
          inputLabel={t("Title")}
          inputName="jobtitle"
          placeHolderText={t("Title")}
          errors={errors}
          register={register}
          required={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-5">
          <InputField
          inputType="number"
            inputLabel={t("Duration")}
            inputName="duration"
            placeHolderText={t("Duration")}
            errors={errors}
            register={register}
            required={true}
          />
          <InputField
            inputLabel={t("Email")}
            inputName="email"
            placeHolderText={t("Email")}
            errors={errors}
            register={register}
            required={true}
          />
        </div>
        <div className="flex flex-col gap-5">
          <TextInput
            labelName={t("Description")}
            errors={errors}
            setTextDescription={setTextDescription}
            control={control}
            name="jobdescription"
            required={true}
          />
          <InputField
            inputLabel={t("Remarks")}
            inputName="remarks"
            placeHolderText={t("Remarks")}
            errors={errors}
            register={register}
            required={true}
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
              {t("PostFreelanceService")}
            </button>
          </div>
        </div>
        <ToastContainer />
      </form>
    </section>
  );
};

export default PostTask;
