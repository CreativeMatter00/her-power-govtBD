"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import PasswordSchema from "./PasswordSchema";
import axios from "axios";
import { url } from "@/api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslations } from "next-intl";

interface EditPassword {
  setEditPassword: Function;
  setEditProfile: Function;
  userId: string;
}

interface IFormInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordForm: React.FC<EditPassword> = ({
  setEditPassword,
  setEditProfile,
  userId,
}) => {
  const t = useTranslations("talentHunt");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleCancel = () => {
    setEditProfile(false);
    setEditPassword(false);
  };

  const resolver = yupResolver(PasswordSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver });
  const onSubmit = async (data: IFormInput) => {
    try {
      const response = await axios.post(`${url}/api/admin/change-userpw`, {
        user_pid: userId,
        old_password: data.oldPassword,
        password: data.newPassword,
      });
        toast.success("Password added successfully!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          setEditPassword(false);
        }, 4000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Try again.", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <>
      <div className="my-6">
        <form
          action="submit"
          className="border border-brandLsPrimary rounded-md max-md:p-3 p-6 text-brandPrimary"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* ---------------------------------- security password ---------------------------- */}
          <div className="">
            <h1 className="text-base font-bold my-3 pb-3 border-b border-brandLsPrimary">
              {t("Security_Password")}
            </h1>

            <div className="w-full flex gap-6">
              <div className="my-3 max-md:w-full w-1/2">
                {/* ============== OLD PASSWORD ================= */}
                <label className="text-greyPrimary ml-6">
                  {t("Old_Password")}
                </label>
                <div className="border border-brandLsPrimary rounded-3xl flex justify-between px-6 py-2 my-3 max-md:mr-0 mr-3">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    className="w-full outline-none"
                    placeholder={t("Enter_old_pass")}
                    {...register("oldPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="text-greyPrimary"
                  >
                    {showOldPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                {errors.oldPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.oldPassword?.message}
                  </p>
                )}
              </div>
              <div className="my-3 max-md:w-full w-1/2">
                {/* ===================================== NEW PASSWORD ============================= */}
                <label className="text-greyPrimary ml-6">
                  {t("New_Password")}
                </label>
                <div className="border border-brandLsPrimary rounded-3xl flex justify-between px-6 py-2 my-3 max-md:mr-0 mr-3">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="w-full outline-none"
                    placeholder={t("Enter_new_password")}
                    {...register("newPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="text-greyPrimary"
                  >
                    {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="my-3 max-md:w-full w-1/2">
                {/* ==================================== RETYPE NEW PASSWORD =========================== */}
                <label className="text-greyPrimary ml-6">
                  {t("Confirm_New_Password")}
                </label>
                <div className="border border-brandLsPrimary rounded-3xl flex justify-between px-6 py-2 my-3 max-md:mr-0 mr-5">
                  <input
                    type={showConfirmNewPassword ? "text" : "password"}
                    className="w-full outline-none"
                    placeholder={t("Enter_new_pass_again")}
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
                    className="text-greyPrimary"
                  >
                    {showConfirmNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.confirmPassword?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-8">
            <button
              type="submit"
              className="bg-link text-white text-base font-bold py-2 px-6 rounded-md"
            >
              {t("Save_Changes")}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-dangerPrimary text-white text-base font-bold py-2 px-6 rounded-md"
            >
              {t("Cancel")}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default PasswordForm;
