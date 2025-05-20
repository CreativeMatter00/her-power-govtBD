"use client";
import { useState } from "react";
import TextInput from "../inputFields/TextInput";
import Title from "../Title";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import JobProviderSchema from "./JobProviderSchema";
import { useQuery } from "@tanstack/react-query";
import { api, getUserInfo, url } from "@/api/api";
import { useCookies } from "next-client-cookies";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface IFormInputs {
  companyName: string;
  designation: string;
  companyAddress: string;
  companyType: string;
  companyWebsiteUrl: string;
}

const JobProviderRegistration = () => {
  const t = useTranslations("career");
  const locale = useLocale();
  const router = useRouter();
  const resolver = yupResolver(JobProviderSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({ resolver });

  const cookies = useCookies();

  const userId = cookies.get("user_pid");
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(userId as string),
  });
 
 
  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something_went_wrong")}
      </div>
    );

  const onSubmit = async (data: IFormInputs) => {
    const jobProviderData = new FormData();
    jobProviderData.append("user_pid", userId as string);
    jobProviderData.append("provider_name", data.companyName);
    jobProviderData.append("designation", data.designation);
    jobProviderData.append("address_line", data.companyAddress);
    jobProviderData.append("company_type", data.companyType);
    jobProviderData.append("websites_name", data.companyWebsiteUrl);
    try {
      const response = await api.post(
        `/api/job-provider-register`,
        jobProviderData
      );
      if (response?.data?.meta?.status === true) {
        cookies.set("isJobProvider", true as any);
        cookies.set("jobProvider_pid", response?.data?.jobprovider_pid);
        toast.success("Job provider registered successfully!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push(`/${locale}/career`);
        reset();
      } else {
        toast.error("Job provider registration failed!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        reset();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
        // console.log("job provider registration failed", error);
        toast.error(
          `Error: ${error.response?.data.message || "Something went wrong"}`,
          {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      } else {
        console.error("Error during form submission", error);
        toast.error("Unexpected error during form submission", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const onError = (errors: any) => {
    // console.log("Form validation errors:", errors);
    // alert("Please correct the errors in the form.");
  };

  return (
    <main className="container p-4 mt-16">
      <section className="my-8 w-full">
        <p className="text-brandPrimary text-3xl">
          {t("JobProviderRegistrationForm")}
        </p>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="my-5 border border-brandLsPrimary rounded-lg w-full p-6">
            {/* ======================================== PERSONAL INFORMATION ================================= */}
            {/* <div>
              <Title infoTitle="Personal Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-4 mt-4">
                <div>
                  <h1 className="text-greyPrimary ml-6">{t("firstName")}</h1>
                  <p className="px-6 py-1 mt-1">{data && data.fname}</p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">{t("lastName")}</h1>
                  <p className="px-6 py-1 mt-1">{data && data.lname}</p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">{t("Email")}</h1>
                  <p className="px-6 py-1 mt-1">{data && data.email}</p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">{t("phoneNumber")}</h1>
                  <p className="px-6 py-1 mt-1">{data && data.mobile_no}</p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">{t("Address")}</h1>
                  <p className="px-6 py-1 mt-1">
                    {data && data.address_line}
                  </p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">{t("Area_Name")}</h1>
                  <p className="px-6 py-1 mt-1">
                    {data && data.area_name}
                  </p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">{t("City_Name")}</h1>
                  <p className="px-6 py-1 mt-1">
                    {data && data.city_name}
                  </p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">{t("zipCode")}</h1>
                  <p className="px-6 py-1 mt-1">
                    {data && data.zip_postal_code}
                  </p>
                </div>
              </div>
            </div> */}

            <div className="">
              <Title infoTitle="Company Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-4 mt-4">
                <TextInput
                  inputType="text"
                  register={register}
                  errors={errors}
                  labelName="Company Name"
                  inputName="companyName"
                  placeholderText="Enter your company name"
                  required={true}
                />
                <TextInput
                  inputType="text"
                  register={register}
                  errors={errors}
                  labelName="Designation"
                  inputName="designation"
                  placeholderText="Enter your designation"
                  required={true}
                />
                <TextInput
                  inputType="text"
                  register={register}
                  errors={errors}
                  labelName="Company Address"
                  inputName="companyAddress"
                  placeholderText="Enter company address"
                  required={true}
                />
                <TextInput
                  inputType="text"
                  register={register}
                  errors={errors}
                  labelName="Company Type"
                  inputName="companyType"
                  placeholderText="Enter company type"
                  required={true}
                />
                <TextInput
                  inputType="text"
                  register={register}
                  errors={errors}
                  labelName="Company Website (if any)"
                  inputName="companyWebsiteUrl"
                  placeholderText="Enter company website url"
                  required={true}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="flex gap-6">
              <button className="bg-link hover:bg-linkHover rounded-full py-4 px-10 text-bgPrimary font-medium">
                {t("Submit")}
              </button>
            </div>
          </div>
        </form>
      </section>
      <ToastContainer />
    </main>
  );
};

export default JobProviderRegistration;
