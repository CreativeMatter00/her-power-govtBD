/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";
import Logo from "../../../../components/ui/logo/Logo";
import adminLogin from "../../../../../public/assets/admin-login.json";
// import adminLogin from "../../../public/assets/admin-login.json";
// import Logo from "../ui/logo/Logo";
import { url } from "@/api/api";
import Lottie from "lottie-react";

const Login = () => {
  const t = useTranslations("login");

  const locale = useLocale();
  const router = useRouter();
  const cookies = useCookies();
  // const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  // console.log("redirect", redirect);

  interface UserLoginInput {
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginInput>();

  //   const onSubmit: SubmitHandler<UserLoginInput> = (data) => console.log(data);
  const onSubmit: SubmitHandler<UserLoginInput> = (data) => {
    if (data) {
      // console.log(data);
    }

    setIsLoading(true);
    fetch(`${url}/api/user-login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        // console.log("res", res);
        return res.json();
      })
      .then((data) => {
        if (data?.success) {
          // console.log({data})
          // cookies.remove("");
          document.cookie.split(";").forEach((cookie) => {
            const cookieName = cookie.split("=")[0].trim();
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
          });

          cookies.set("token", data?.data?.token);
          cookies.set("customer_pid", data?.data?.customer_pid);
          if (data?.data?.isCourseProvider) {
            cookies.set("isProvider", true as any);
            cookies.set("providor_pid", data?.data?.providor_pid);
          } else {
            cookies.set("isProvider", false as any);
          }
          if (data?.data?.isStudent === true) {
            cookies.set("isStudent", true as any);
            cookies.set("student_pid", data?.data?.student_pid);
          } else {
            cookies.set("isStudent", false as any);
          }
          if (data?.data?.isJobProvider === true) {
            cookies.set("isJobProvider", true as any);
            cookies.set("jobProvider_pid", data?.data?.jobprovider_pid);
          } else {
            cookies.set("isJobProvider", false as any);
          }

          if (data?.data?.isJobSeeker === true) {
            cookies.set("isJobSeeker", true as any);
          } else {
            cookies.set("isJobSeeker", false as any);
          }

          cookies.set("enterpenure_pid", data?.data?.enterpenure_pid);
          cookies.set("isCustomer", data?.data?.isCustomer);
          cookies.set("isSeller", data?.data?.isSeller);
          cookies.set("isOrganizer", data?.data?.isOrganizer);
          cookies.set("isOrganizer_pid", data?.data?.isOrganizer_pid);
          cookies.set("name", data?.data?.name);
          cookies.set("user_pid", data?.data?.user_pid);
          localStorage.setItem("loginDetails", JSON.stringify(data?.data));
          localStorage.setItem("token", data?.data?.token);

          toast.success("User Logged in Successfully");
          if (redirect) {
            router.push(redirect);
          } else {
            router.push(`/${locale}/`);
          }
          // router.push(`/${locale}/`);
        } else {
          toast.error("Login Failed", {
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
      .finally(() => {
        setIsLoading(false);
        // if (redirect) {
        //   router.push(redirect);
        // } else {
        //   router.push(`/${locale}/`);
        // }
      });
  };

  return (
    <section className="lg:h-screen">
      <div className="flex flex-col lg:flex-row lg:h-full items-center md:h-screen justify-center">
        {/* -------------------------------------------- IMAGE WITH HEADING ---------------------------------------- */}
        <div className="hidden  lg:w-6/12 lg:h-full bg-brandDs border-r border-r-linkHover lg:flex justify-center items-center">
          <div className=" flex flex-col justify-center gap-5 bg-brandLsPrimary rounded-xl hover:rotate-2 hover:scale-105 transition-all p-10">
            <div className=" flex justify-center items-center ">
              <Logo
                logoHeight="h-32"
                logoWidth="w-auto"
                text={true}
                textHeight="h-20"
                textWidth="w-auto"
              />
            </div>

            <div className="flex justify-center mb-4">
              <Lottie
                animationData={adminLogin}
                loop={true}
                className="w-auto h-[460px]"
              />
            </div>
          </div>
        </div>
        {/* --------------------------------------------------------- LOGIN SECTION -------------------------------------------------- */}
        <div className="flex justify-center lg:justify-center items-center lg:w-6/12 px-6 lg:px-0 my-8 lg:my-0 ">
          <div>
            <h1 className="text-4xl text-center">
              <span className="text-brandPrimary font-normal">
                {t("Welcometo")}
              </span>{" "}
              <span className="text-brandDs">{t("HerPower")}</span>
            </h1>
            <h6 className="text-base font-normal text-greyPrimary text-center my-3">
              {t("Enteryourcredentialstoaccessyouraccount")}
            </h6>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* ------------------------------------------ EMAIL FIELD -------------------------------------------- */}
              <div className="my-4">
                <label className="text-brandDs text-sm">{t("Email")}</label>
                <input
                  type="email"
                  placeholder={t("Enter_your_email")}
                  className="block outline-none border-b border-[#252525] w-full px-2 py-1 placeholder:text-[#CACACA] text-base font-normal mt-2"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                />
                {errors?.email?.type === "required" && (
                  <span className="text-xs text-red-500 pl-2">
                    {t("Email_is_required")}
                  </span>
                )}

                {errors?.email?.type === "pattern" && (
                  <span className="text-xs text-red-500 pl-2">
                    {t("Email_address_is_invalid")}
                  </span>
                )}
              </div>

              {/* -------------------------------------------- PASSWORD FIELD --------------------------------- */}
              <div>
                <label className="text-brandDs text-sm">{t("Password")}</label>
                <div className="flex border-b border-[#252525] mt-2">
                  <input
                    placeholder={t("Enter_your_password")}
                    type={showPassword ? "text" : "password"}
                    className="block outline-none w-full px-2 placeholder:text-[#CACACA] text-base font-normal mb-1"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="mr-2 text-[#cacaca]"
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                {errors?.password?.type === "required" && (
                  <span className="text-xs text-red-500 pl-2">
                    {t("Password_is_required")}
                  </span>
                )}
                {errors?.password?.type === "minLength" && (
                  <span className="text-xs text-red-500 pl-2">
                    {t("Password_must_be_at_least_6_characters")}
                  </span>
                )}
              </div>
              {/* ----------------------------------------- REMEMBER ME ---------------------------------------------- */}
              <div className="text-brandPrimary flex items-center my-4 font-normal">
                {/* <button
										onClick={() => setRememberMe(!rememberMe)}
										type="button"
									>
										{rememberMe ? (
											<GoCheckbox />
										) : (
											<MdOutlineCheckBoxOutlineBlank />
										)}
									</button>
										<p className="text-base pl-2 w-full">Remember me</p> */}
                {/* <div className="flex justify-between items-center w-full">
										
										<p className="w-full text-end text-link text-base my-2 border-blue-500">
											Forgot Password?
										</p>
									</div> */}
              </div>
              {/* ---------------------------------------- LOGIN BUTTON -------------------- */}
              {isLoading ? (
                <button className="bg-link text-bgSecondary font-medium text-base w-full py-2 rounded-3xl mt-2 cursor-pointer">
                  {" "}
                  <BeatLoader color="#ffffff" />{" "}
                </button>
              ) : (
                <input
                  type="submit"
                  value="Login"
                  className="bg-link text-bgSecondary font-medium text-base w-full py-2 rounded-3xl mt-2 cursor-pointer"
                />
              )}
            </form>
            {/* ------------------------------------ Back to Home OPTION ---------------------------------------- */}
            <div></div>
            <Link href={`/${locale}`} className="">
              <p className="font-semibold text-center text-base text-link hover:text-brandPrimary my-4 underline ">
                {t("Back_to_Home")}
              </p>
            </Link>
            {/* ------------------------------------ SIGN UP OPTION ---------------------------------------- */}
            <div className="flex items-center gap-4 justify-center">
              <p className="font-normal text-center text-base text-brandPrimary my-4">
                {t("Dont_have_an_account")}{" "}
                {/* <span className="text-link">Sign up</span> */}
              </p>
              <Link
                href={`/${locale}/registration`}
                className="text-link hover:underline"
              >
                {t("Sign_up")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
