"use client";

import { url } from "@/api/api";
import PasswordSchema from "@/components/shopNow/profile/userProfile/passwordForm/PasswordSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

interface IPassword {
  setEditPassword: Function;
  setEditProfile: Function;
  userId: string;
}
interface IFormInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const EditPassword: React.FC<IPassword> = ({
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
      if (data?.newPassword === data?.oldPassword) {
		toast.error("New Password and Confirm New Password Doesn't Match", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (data?.newPassword !== data?.confirmPassword) {
        toast.error("New Password and Old Password Can't Be Same", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        const response = await axios.post(`${url}/api/admin/change-userpw`, {
          user_pid: userId,
          old_password: data.oldPassword,
          password: data.newPassword,
        });
        if (response.data.code == 200) {
          // ? Password update notification
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
          handleCancel();
        }
      }
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
export default EditPassword;
