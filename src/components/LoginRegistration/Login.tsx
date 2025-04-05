/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import loginImg from "../../../public/assets/images/login/loginWp.jpg";
import { useState } from "react";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { GoCheckbox } from "react-icons/go";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";
import Logo from "../ui/logo/Logo";
import { url } from "@/api/api";

const Login = () => {
  const t = useTranslations("login");

  const locale = useLocale();
  const router = useRouter();
  const cookies = useCookies();
  const [rememberMe, setRememberMe] = useState(false);
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
  const onSubmit: SubmitHandler<UserLoginInput> = (loginData) => {
    // if (loginData) {
    //   console.log(loginData);
    // }

    setIsLoading(true);
    fetch(`${url}/api/user-login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        // console.log("res", res);
        return res.json();
      })
      .then((data) => {
        // console.log({ data });
        if (data?.success) {
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
          cookies.set("email", loginData.email);
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
        <div className="hidden lg:block lg:w-6/12 lg:h-full">
          <div className="relative lg:h-full">
            <Image
              src={`/assets/images/login/loginWp.jpg`}
              width={450}
              height={450}
              // src={loginImg}
              alt="login image"
              className="absolute lg:h-full h-full w-full"
            />
            <div className="absolute right-0 bottom-0 w-full h-full bg-gradient-to-br from-transparent to-brandPrimary opacity-40"></div>
            {/* <div className="absolute right-0 bottom-0 w-full h-full bg-gradient-to-br from-transparent to-brandPrimary opacity-100"></div> */}
            <div className="absolute inset-x-0 top-0">
              <div className=" flex justify-center items-center pt-9">
                <Logo
                  logoHeight="h-32"
                  logoWidth="w-auto"
                  text={true}
                  textHeight="h-20"
                  textWidth="w-auto"
                />

                {/* <Image
                    src={`/assets/images/navbar/Her Power Logo.gif`}
                    width={200}
                    height={150}
                    alt="her-power Logo"
                    className="h-32 w-auto"
                    priority
                  /> */}
              </div>
            </div>
          </div>
          {/* <div className="absolute lg:left-16 lg:top-96 font-normal text-bgSecondary text-5xl">
              <h1>Welcome to Her Power, </h1>
              <h1>empowering </h1>
              <h1 className="font-bold">Women Entrepreneurs</h1>
              <h1>in Bangladesh.</h1>
            </div> */}
        </div>
        {/* --------------------------------------------------------- LOGIN SECTION -------------------------------------------------- */}
        <div className="flex justify-center lg:justify-center items-center lg:w-6/12 px-6 lg:px-0 my-8 lg:my-0 ">
          <div>
            <h1 className="text-4xl text-center">
              <span className="text-brandPrimary font-normal">
                {" "}
                {t("Welcometo")}
              </span>{" "}
              <span className="text-brandDs">{t("HerPower")}</span>
            </h1>
            <h6 className="text-base font-normal text-greyPrimary text-center my-3">
              {t("Enteryourcredentialstoaccessyouraccount")}
            </h6>
            {/* -------------------------------------- GOOGLE LOGIN ------------------------------------- */}
            <div>
              {/* <button className="flex justify-center items-center border border-brandPrimary font-medium w-full py-1 rounded-3xl my-8 text-brandPrimary text-base">
                  <FcGoogle className="h-8 w-8 pr-3" />
                  Log in with Google
                </button> */}
            </div>
            {/* ------------------------------------------------ OR SECTION ---------------------------------------------- */}
            {/* <div className="flex justify-evenly items-center">
								<div className="border-b border-greyPrimary w-1/2"></div>
								<div className="mx-2 text-greyPrimary">or</div>
								<div className="border-b border-greyPrimary w-1/2"></div>
							</div> */}
            {/* ---------------------------------------------- LOGIN FORM ------------------------------------ */}
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
                  value={t("Login")}
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
