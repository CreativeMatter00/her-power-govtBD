"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import OtpTimer from "./OtpTimer";
import ScaleLoader from "react-spinners/ScaleLoader";
import { api } from "@/api/api";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { useCookies } from "next-client-cookies";
import "react-toastify/dist/ReactToastify.css";

interface OtpFormValues {
  otp: string;
  email: string;
  birthCertificate?: string;
  nid?: string;
}

const OtpForm = ({ email, nid, birthCertificate }: any) => {
  const t = useTranslations("talentHunt");
  const cookies = useCookies();
  const otpTimeRemaining = cookies.get("otpTimeRemaining");
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300);
  const router = useRouter();
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,  // Added setValue for resetting OTP field when necessary
    clearErrors, // Added clearErrors to reset the error when the time runs out
  } = useForm<OtpFormValues>();

  useEffect(() => {
    const savedEmail = cookies.get("lastRegistrationEmail");
    const savedTime = cookies.get("otpTimeRemaining");

    if (savedEmail === email && savedTime) {
      setRemainingTime(parseInt(savedTime, 10));
    } else {
      setRemainingTime(300);
      cookies.set("lastRegistrationEmail", email, { path: "/" });
      cookies.set("otpTimeRemaining", '300', { path: "/" });
    }
  }, [cookies, email]);

  useEffect(() => {  
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime > 0) {
          const newTime = prevTime - 1;
          cookies.set("otpTimeRemaining", newTime.toString(), { path: "/" });
          return newTime;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [otpTimeRemaining]);

  const onSubmit: SubmitHandler<OtpFormValues> = async (data) => {
    const formData = new FormData();
    formData.append("email", email);
    setIsLoading(true);

    if (remainingTime <= 0) {
      if (nid !== "") {
        formData.append("nid", nid);
      } else {
        formData.append("birth_reg_no", birthCertificate);
      }
      formData.append("otp", "000000");
      try {
        const response = await api.post(`/api/customer-registration`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response?.data?.success === true) {
          toast.success("OTP Resent Successfully. Verify Email", {
            position: "top-left",
            autoClose: 3001,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          cookies.set("otpTimeRemaining", '300', { path: "/" });
          setRemainingTime(300);
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
      } catch (error: any) {
        console.error("Error during submission:", error);
        toast.error(`${error?.response?.data.message || ""}`, {
          position: "bottom-left",
          autoClose: 3001,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      formData.append("otp", data?.otp);
      try {
        const response = await api.post(`/api/otp-verify`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response?.data?.status === true) {
          toast.success("Registration Successful. Please Log In", {
            position: "top-left",
            autoClose: 3001,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          router.push(`/${locale}/login`);
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
      } catch (error: any) {
        console.error("Error during submission:", error);
        toast.error(`${error?.response?.data.message || ""}`, {
          position: "bottom-left",
          autoClose: 3001,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (remainingTime === 0) {
      // Clear OTP input value and errors when time is over
      setValue("otp", "");
      clearErrors("otp");
    }
  }, [remainingTime, setValue, clearErrors]);

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">
          {t("Verify_OTP")}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {t("Please_enter_OTP")}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <input
            type="text"
            {...register("otp", {
              required: remainingTime > 0 ? "OTP is required" : false,
              minLength: remainingTime > 0 ? {
                value: 6,
                message: "OTP must be 6 characters",
              } : undefined,
              maxLength: remainingTime > 0 ? {
                value: 6,
                message: "OTP must be 6 characters",
              } : undefined,
            })}
            maxLength={6}
            placeholder="Enter OTP"
            disabled={remainingTime <= 0}  // Disable input if time is up
            className={`w-full p-3 border rounded-lg text-center text-lg tracking-widest ${
              errors.otp ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
            }`}
          />
          {errors.otp && (
            <span className="text-red-500 text-sm">{errors.otp.message}</span>
          )}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors duration-300"
          >
            {remainingTime <= 0 ? t("Resend_Code") : t("Verify_OTP")}
          </button>
        </form>
        <OtpTimer initialTime={remainingTime} />
      </div>
      <ToastContainer className="z-50" />
    </div>
  );
};

export default OtpForm;
