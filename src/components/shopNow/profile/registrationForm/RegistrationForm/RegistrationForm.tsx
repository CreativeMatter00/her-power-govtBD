"use client";
import { url } from "@/api/api";
import InputField from "@/components/shared/input/InputField";
import PasswordField from "@/components/talentHunt/registration/inputFields/PasswordField";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ScaleLoader from "react-spinners/ScaleLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfileSchema from "../UserProfileSchema/UserProfileSchema";
import ImagePart from "../imagePart/ImagePart";

interface RegFormInput {
  fname: string;
  lname: string;
  mobile_no: number;
  username: string;
  email: string;
  house_number: string;
  city_name: string;
  area_name: string;
  zip_postal_code: number;
  password: string;
  confirm_password: string;
  attachment?: FileList;
  birthCertificate?: string;
  nid?: string;
  nidOrBirthCertificate: string;
}

const RegistrationForm = ({ setVerifyEmail, setEmail,setBirthCertificate,setNid }: any) => {
  const t = useTranslations("login");

  const [selectedOption, setSelectedOption] = useState<string>("nid");
  const locale = useLocale();
  const router = useRouter();
  const cookies = useCookies();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const resolver = yupResolver(UserProfileSchema);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
    trigger,
  } = useForm<RegFormInput>({ resolver });
// console.log()
  const onSubmit: SubmitHandler<RegFormInput> = (data) => {
    const registrationData = new FormData();
    registrationData.append("fname", data.fname);
    registrationData.append("lname", data.lname);
    registrationData.append("mobile_no", "0" + data.mobile_no.toString());
    // registrationData.append("mobile_no", data.mobile_no.toString());
    registrationData.append("username", data.username);
    registrationData.append("email", data.email);
    registrationData.append("house_number", data.house_number);
    registrationData.append("city_name", data.city_name);
    registrationData.append("area_name", data.area_name);
    registrationData.append("zip_postal_code", data.zip_postal_code.toString());
    registrationData.append("password", data.password);
    registrationData.append("confirm_password", data.confirm_password);
    if (selectedOption === 'nid' && data.nid){
      registrationData.append("nid", data.nid);
      setNid(data.nid);
    }else  if (selectedOption !== 'nid' && data.birthCertificate){
      registrationData.append("birth_reg_no", data.birthCertificate);
      setBirthCertificate(data.birthCertificate);
    }

    if (selectedImage) {
      const fileList = createFileList([selectedImage]);
      registrationData.append("attachments", fileList[0]);
    }

    setIsLoading(true);

    axios
      .post(`${url}/api/customer-registration`, registrationData)
      .then((res) => res.data)
      .then((data) => {
        if (data?.success) {
          toast.success("Please Verify Your Email via OTP", {
            position: "top-left",
            autoClose: 3001,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          reset();
          setSelectedImage(null);
          setEmail(data?.data?.userloginInfo?.email || data?.data);
          setTimeout(() => {
            setVerifyEmail(true);
          }, 4000);
        } else {
          toast.error("Registration Failed", {
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
      .catch((error) => {
        // console.error("Error during submission:", error.response.data.message);
        toast.error(`Registration failed. ${error.response.data.message}`, {
          position: "bottom-left",
          autoClose: 3001,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .finally(() => setIsLoading(false));
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
    setValue("attachment", fileList);
    trigger("attachment");
  };

  const clearForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    reset();
    setSelectedImage(null);
  };

  // if (isLoading)
  //   return (
  //     <div className="w-screen h-screen flex justify-center items-center">
  //       <ScaleLoader color="#421957" height={70} radius={8} width={10} />
  //     </div>
  //   );

  return (
    <>
      <ToastContainer className="z-50" />
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <ScaleLoader color="#421957" height={70} radius={8} width={10} />
        </div>
      ) : (
        <section className="bg-bgPrimary">
          <main className="container my-8">
            <div className="text-brandPrimary font-normal ">
              <h1 className="text-3xl mb-4">{t("Registration_Form")}</h1>
              <div className="flex items-center gap-2">
                <p className="text-base">
                  {t("Already_have_an_account")} &nbsp;
                </p>
                <Link
                  href={`/${locale}/login`}
                  className="text-link hover:underline"
                >
                  {" "}
                  {t("Click_here_to_login")}{" "}
                </Link>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border border-brandLsPrimary rounded-lg max-md:px-3 px-6 py-3 mt-4"
            >
              <div>
                <h1 className="pb-4 max-md:pb-2 border-b border-brandLsPrimary text-brandPrimary text-base font-bold">
                  {t("Personal_Information")}
                </h1>
                <div className="flex max-md:flex-col flex-row max-md:items-center justify-evenly items-start max-md:gap-2 gap-8 mt-4">
                  <div className="basis-1/2 max-md:w-full flex flex-col gap-4 max-md:order-2 max-md:mt-1.5">
                    <div className="max-md:mb-3 mb-5">
                      <ImagePart
                        selectedImage={selectedImage}
                        setSelectedImage={handleImageChange}
                        errors={errors}
                        register={register}
                        labelName={t("Image")}
                      />
                    </div>
                  </div>

                  <div className="basis-1/2 max-md:w-full  flex flex-col gap-4 max-md:order-1">
                    <InputField
                      type="text"
                      labelName={t("First_Name")}
                      placeholderText={t("Enter_your_first_name")}
                      inputName="fname"
                      errors={errors}
                      register={register}
                      mandatory={true}
                    />
                    <InputField
                      type="text"
                      labelName={t("Last_Name")}
                      placeholderText={t("Enter_your_last_name")}
                      inputName="lname"
                      errors={errors}
                      register={register}
                      mandatory={true}
                    />
                  </div>
                </div>
                <div className="flex max-md:flex-col flex-row max-md:items-center justify-evenly items-start max-md:gap-2 gap-8 mt-4">
                  <div className="basis-1/2 max-md:w-full  flex flex-col gap-4">
                    <InputField
                      type="number"
                      labelName={t("Phone")}
                      placeholderText={t("Ex_01xxxxxxxx")}
                      inputName="mobile_no"
                      errors={errors}
                      register={register}
                      mandatory={true}
                    />
                    <InputField
                      type="text"
                      labelName={t("User_Name")}
                      placeholderText={t("Enter_your_username")}
                      inputName="username"
                      errors={errors}
                      register={register}
                      mandatory={true}
                    />
                  </div>
                  <div className="basis-1/2 max-md:w-full  flex flex-col gap-4">
                    <InputField
                      type="email"
                      labelName={t("Email")}
                      placeholderText={t("Enter_your_email")}
                      inputName="email"
                      errors={errors}
                      register={register}
                      mandatory={true}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                <div className="flex items-center gap-4">
                  <label>
                    <input
                      type="radio"
                      value="nid"
                      {...register("nidOrBirthCertificate")}
                      checked={selectedOption === "nid"}
                      onChange={() => {
                        setSelectedOption("nid");
                        setValue("nidOrBirthCertificate", "nid");
                        trigger("nidOrBirthCertificate");
                      }}
                    />
                    {t("NID")}
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="birthCertificate"
                      {...register("nidOrBirthCertificate")}
                      checked={selectedOption === "birthCertificate"}
                      onChange={() => {
                        setSelectedOption("birthCertificate");
                        setValue("nidOrBirthCertificate", "birthCertificate");
                        trigger("nidOrBirthCertificate");
                      }}
                    />
                    {t("Birth_Certificate")}
                  </label>
                </div>
                <div className="flex flex-col gap-4">
                  {selectedOption === "nid" && (
                    <InputField
                      type="text"
                      labelName={t("NID")}
                      placeholderText={t("Enter_your_NID")}
                      inputName="nid"
                      errors={errors}
                      register={register}
                      mandatory={true}
                    />
                  )}

                  {selectedOption === "birthCertificate" && (
                    <InputField
                      type="text"
                      labelName={t("Birth_Certificate")}
                      placeholderText={t("Enter_your_Birth_Certificate")}
                      inputName="birthCertificate"
                      errors={errors}
                      register={register}
                      mandatory={true}
                    />
                  )}
                </div>
              </div>

              <div>
                <h1 className="pb-4 max-md:pb-2 border-b border-brandLsPrimary text-brandPrimary text-base font-bold my-4">
                  {t("Delivery_Address")}
                </h1>
                <div className="flex max-md:flex-col flex-row max-md:items-center justify-evenly items-start max-md:gap-2 gap-8 mt-4">
                  <div className="basis-1/2 max-md:w-full  flex flex-col gap-4">
                    <InputField
                      type="text"
                      labelName={t("Address")}
                      placeholderText={t("Ex_House_number_and_street_name")}
                      inputName="house_number"
                      errors={errors}
                      register={register}
                      mandatory={true}
                    />
                    <InputField
                      type="text"
                      labelName={t("City")}
                      placeholderText={t("Ex_Dhaka-north")}
                      inputName="city_name"
                      errors={errors}
                      register={register}
                      mandatory={true}
                    />
                  </div>
                  <div className="basis-1/2 max-md:w-full  flex flex-col gap-4">
                    <InputField
                      type="text"
                      labelName={t("Area")}
                      placeholderText={t("Ex_Banani")}
                      inputName="area_name"
                      errors={errors}
                      register={register}
                      mandatory={true}
                    />
                    <InputField
                      type="number"
                      labelName={t("Zip_Code")}
                      placeholderText={t("Ex_1230")}
                      inputName="zip_postal_code"
                      errors={errors}
                      register={register}
                      mandatory={true}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h1 className="pb-4 max-md:pb-2 border-b border-brandLsPrimary text-brandPrimary text-base font-bold my-4">
                  {t("Security_Password")}
                </h1>

                <div className="flex max-md:flex-col flex-row max-md:items-center justify-evenly items-start max-md:gap-2 gap-8 mt-4">
                  <div className="basis-1/2 max-md:w-full flex flex-col gap-4">
                    <PasswordField
                      inputLabel={t("Password")}
                      inputName="password"
                      register={register}
                      errors={errors}
                      borderStyle="rounded-md"
                    />
                  </div>
                  <div className="basis-1/2 max-md:w-full flex flex-col gap-4">
                    <PasswordField
                      inputLabel={t("Confirm_Password")}
                      inputName="confirm_password"
                      register={register}
                      errors={errors}
                      borderStyle="rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full max-md:mt-2 mt-6">
                <input
                  type="submit"
                  value={t("Submit")}
                  className="font-medium text-lg text-bgSecondary bg-link px-8 py-2 rounded-3xl cursor-pointer"
                />
                <div className="inline px-6">
                  <button
                    onClick={clearForm}
                    className="text-link text-base px-6"
                  >
                    {t("Clear")}
                  </button>
                </div>
              </div>
            </form>
          </main>
        </section>
      )}
    </>
  );
};

export default RegistrationForm;
