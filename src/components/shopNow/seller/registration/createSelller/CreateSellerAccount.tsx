"use client";

import Image from "next/image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { SubmitHandler,useFormContext } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import CreateSellerInput from "./CreateSellerInput";
import { useTranslations } from "next-intl";

interface SellerInput {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const CreateSellerAccount = ({ setActive }: { setActive: Function }) => {
  const t = useTranslations("talentHunt");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } =useFormContext<SellerInput>()

  const onSubmit: SubmitHandler<SellerInput> = (data) => {
    console.log("Form data: ", data); 
    setActive(2); 
  };

  return (
    <section className="container p-4">
      <h1 className="text-brandPrimary text-3xl font-normal my-6">
        {t("Create_Seller_Account")}
      </h1>

      {/* CREATE SELLER ACCOUNT FORM */}
      <div className="border border-brandLsPrimary rounded-lg p-4">
        <h1 className="text-brandDs font-bold text-base mx-4 pb-2 border-b border-brandLsPrimary">
          {t("Personal_Information")}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid max-md:grid-cols-1 grid-cols-2 gap-6 mx-4 mt-3">
            {/* First Name Input */}
            <CreateSellerInput
              labelName={t("First_Name")}
              inputName="firstName"
              placeholderText={t("Enter_your_first_name_here")}
              inputType="text"
              register={register}
              errors={errors}
              required={true}
            />

            {/* Last Name Input */}
            <CreateSellerInput
              labelName={t("Last_Name")}
              inputName="lastName"
              placeholderText={t("Enter_your_last_name_here")}
              inputType="text"
              register={register}
              errors={errors}
              required={true}
            />

            {/* Mobile Number Input */}
            <CreateSellerInput
              labelName={t("Mobile_Number")}
              inputName="mobileNumber"
              placeholderText="Ex. 01XXXXXXXXX"
              inputType="tel"
              register={register}
              errors={errors}
              required={true}
            />

            {/* Email Input */}
            <CreateSellerInput
              labelName={t("Email")}
              inputName="email"
              placeholderText={t("Enter_your_email_address_here")}
              inputType="email"
              register={register}
              errors={errors}
              required={true}
            />

            {/* Password Input */}
            <div>
              <label className="text-brandDs text-base font-normal">
                {t("Password")} <span className="text-red-500">*</span>
              </label>
              <div className="border-b border-brandPrimary flex justify-between items-center w-full p-2 gap-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("Type_your_password_here")}
                  {...register("password")}
                  min={6}
                  className="outline-none text-base font-normal placeholder:text-[#CACACA] w-full"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-[#CACACA]" />
                  ) : (
                    <FaEye className="text-[#CACACA]" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="text-brandDs text-base font-normal">
                {t("Confirm_Password")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="border-b border-brandPrimary flex justify-between items-center w-full p-2 gap-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("Type_your_password_again")}
                  {...register("confirmPassword")}
                  min={6}
                  className="block outline-none text-base font-normal placeholder:text-[#CACACA] w-full"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-[#CACACA]" />
                  ) : (
                    <FaEye className="text-[#CACACA]" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Password Requirement Info */}
            {/* <div className="flex items-center gap-2">
              <Image
                src={"/assets/images/shop-now/registration form/i_icon.png"}
                alt="password"
                width={14}
                height={14}
                className="w-auto h-3.5"
              />
              <p className="text-brandPrimary text-sm">{t("pass_must_be")}</p>
            </div> */}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mx-4 mt-4">
            <button
              type="button" // Back button
              className="bg-link text-bgSecondary text-base font-medium flex items-center gap-2 rounded-3xl px-6 py-3"
              onClick={() => setActive(0)}
            >
              <GoArrowLeft />
              {t("Back")}
            </button>
            <button
              type="submit" // Continue button
              className="bg-link text-bgSecondary text-base font-medium flex items-center gap-2 rounded-3xl px-6 py-3"
            >
              {t("Continue")}
              <GoArrowRight />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateSellerAccount;