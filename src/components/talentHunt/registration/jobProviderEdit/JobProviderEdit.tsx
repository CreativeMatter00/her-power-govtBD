"use client";
import { useState } from "react";
import TextInput from "../inputFields/TextInput";
import Title from "../Title";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { getJobProviderInfo, getUserInfo, url } from "@/api/api";
import { useCookies } from "next-client-cookies";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import JobProviderSchema from "../jobProviderRegistration/JobProviderSchema";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface IFormInputs {
  companyName: string;
  designation: string;
  companyAddress: string;
  companyType: string;
  companyWebsiteUrl: string;
}
const JobProviderEdit = () => {
  const t = useTranslations("career");
  const [loading, setLoading] = useState(false);
  const resolver = yupResolver(JobProviderSchema);
  const locale = useLocale();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({ resolver });
  const cookies = useCookies();
  const userId = cookies.get("user_pid");
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["userInfo", userId],
    queryFn: () => getUserInfo(userId as string),
  });
  const {
    isLoading: jobProviderInfoLoading,
    error: jobProviderInfoError,
    data: jobProviderInfo,
    refetch: jobProviderInfoRefetch,
  } = useQuery({
    queryKey: ["jobProviderInfo"],
    queryFn: () => getJobProviderInfo(userId as string),
  });
  const onSubmit = async (data: IFormInputs) => {
    const jobProviderData = new FormData();
    jobProviderData.append("user_pid", userId as string);
    jobProviderData.append("provider_name", data.companyName);
    jobProviderData.append("designation", data.designation);
    jobProviderData.append("address_line", data.companyAddress);
    jobProviderData.append("company_type", data.companyType);
    jobProviderData.append("websites_name", data.companyWebsiteUrl);
    try {
      const response = await axios.post(
        `${url}/api/job-provider-update/${jobProviderInfo[0].jobprovider_pid}`,
        jobProviderData
      );
      // console.log(response?.data?.meta?.status);
      if (response?.data?.meta?.status === true) {
        refetch();
        jobProviderInfoRefetch();
        toast.success("Job provider Information Updated successfully!", {
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
        setTimeout(()=>{
          router.push(`/${locale}/career/profile/job-provider/profile`);
        },3000)
      } else {
        setLoading(false);
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
    console.log("Form validation errors:", errors);
    // alert("Please correct the errors in the form.");
  };

  if (isLoading || loading || jobProviderInfoLoading)
    return (
      <div className="min-h-[600px] pt-10">
        <div className="flex items-center justify-center">
          <ScaleLoader color="#421957" height={70} radius={8} width={10} />
        </div>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something went wrong. Please reload")}
      </div>
    );

  return (
    <main className="container p-4 ">
      <section className="my-8 w-full">
        <p className="text-brandPrimary text-3xl">{t("Job_Provider_Edit")}</p>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="my-5 border border-brandLsPrimary rounded-lg w-full p-6">
            {/* ======================================== PERSONAL INFORMATION ================================= */}
            <div>
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
                    {data && (data?.address_line || data.customer_address)}
                  </p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">{t("Area_Name")}</h1>
                  <p className="px-6 py-1 mt-1">
                    {data && (data.area_name ||data.customer_area_name )}
                  </p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">{t("City_Name")}</h1>
                  <p className="px-6 py-1 mt-1">
                    {data && (data.city_name ||data.customer_city_name )}
                  </p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">{t("zipCode")}</h1>
                  <p className="px-6 py-1 mt-1">
                    {data && data.zip_postal_code || data.customer_zip_postal_code}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-16">
              <Title infoTitle={t("Company Information")} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-4 mt-4">
                <TextInput
                  inputType="text"
                  register={register}
                  errors={errors}
                  labelName={t("Company Name")}
                  inputName="companyName"
                  placeholderText={t("Enter your company name")}
                  defaultValue={jobProviderInfo[0]?.provider_name}
                  required={true}
                />
                <TextInput
                  inputType="text"
                  register={register}
                  errors={errors}
                  labelName={t("Designation")}
                  inputName="designation"
                  placeholderText={t("Enter your designation")}
                  defaultValue={jobProviderInfo[0]?.designation}
                  required={true}
                />
                <TextInput
                  inputType="text"
                  register={register}
                  errors={errors}
                  labelName={t("Company Address")}
                  inputName="companyAddress"
                  placeholderText={t("Enter company address")}
                  defaultValue={jobProviderInfo[0]?.address_line}
                  required={true}
                />
                <TextInput
                  inputType="text"
                  register={register}
                  errors={errors}
                  labelName={t("Company Type")}
                  inputName="companyType"
                  placeholderText={t("Enter company type")}
                  defaultValue={jobProviderInfo[0]?.company_type}
                  required={true}
                />
                <TextInput
                  inputType="text"
                  register={register}
                  errors={errors}
                  labelName={t("Company Website (if any)")}
                  inputName="companyWebsiteUrl"
                  placeholderText={t("Enter company website url")}
                  defaultValue={jobProviderInfo[0]?.websites_name}
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

export default JobProviderEdit;
