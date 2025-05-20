"use client";

import { api } from "@/api/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserSchema from "./UserSchema";

// ? Interfaces

interface EditProfile {
  setEditProfile: Function;
  userData: any;
  refetch: any;
}

interface IFormInput {
  fname: string;
  lname: string;
  mobile_no: string;
  customer_address: string;
  customer_city_name: string;
  customer_area_name: string;
  customer_zip_postal_code: string;
}

const UserForm: React.FC<EditProfile> = ({
  setEditProfile,
  userData,
  refetch,
}) => {
  const t = useTranslations("talentHunt");

  // * CSS
  const inputFieldStyle =
    "block outline-none border border-brandLsPrimary rounded-3xl w-full px-6 py-2 mt-2";

  // ? Fetching User Info and id
  const userId = JSON.parse(
    localStorage.getItem("loginDetails") || "{}"
  )?.user_pid;

  // ? Form Hooks

  const resolver = yupResolver(UserSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver });

  // ? Form submission

  const onSubmit = async (data: IFormInput) => {
    try {
      // const updatedData = {
      // 	...data,
      // 	user_pid: userId,
      // };
      const response = await api.put(
        `/api/admin/user-info-update/${userId}`,
        data
      );
      // console.log("Response:", response.data);
      toast.success("Profile Updated Successfully.", {
        position: "bottom-left",
        autoClose: 3001,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      refetch();
      setTimeout(() => {
        setEditProfile(false);
      }, 4000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to update", {
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
  };

  return (
    <>
      <div className="my-6">
        <form
          action="submit"
          className="border border-brandLsPrimary rounded-md max-md:p-3 p-6 text-brandPrimary"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* ---------------------------- personal information --------------------------------- */}
          <div>
            <h1 className="text-base font-bold my-3 pb-3 border-b border-brandLsPrimary">
              {t("My_Personal_Information")}
            </h1>
            <div className="flex max-md:flex-col max-md:justify-center justify-evenly items-start max-md:gap-0 gap-8">
              <div className="w-full max-md:basis-1/2">
                <div className="my-3">
                  <label className="text-greyPrimary ml-6">
                    {t("First_Name")}
                  </label>
                  <input
                    type="text"
                    className={`${inputFieldStyle}`}
                    defaultValue={userData.fname}
                    {...register("fname")}
                  />
                  {errors.fname && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fname?.message}
                    </p>
                  )}
                </div>
                <div className="my-3">
                  <label className="text-greyPrimary ml-6">
                    {t("Mobile_Number")}
                  </label>
                  <input
                    type="text"
                    className={`${inputFieldStyle}`}
                    defaultValue={userData.mobile_no}
                    {...register("mobile_no")}
                  />
                  {errors.mobile_no && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.mobile_no?.message}
                    </p>
                  )}
                </div>
                <div className="my-3">
                  <label className="text-greyPrimary ml-6">{t("Email")}</label>
                  <input
                    disabled
                    type="text"
                    className={`${inputFieldStyle}`}
                    defaultValue={userData.email}
                    // {...register("email", {
                    // 	required: true,
                    // 	pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    // })}
                  />
                  {/* {errors?.email?.type === "required" && (
										<span className="text-xs text-red-500 mt-1">
											Email is required
										</span>
									)}

									{errors?.email?.type === "pattern" && (
										<span className="text-xs text-red-500 mt-1">
											Email address is invalid
										</span>
									)} */}
                </div>
              </div>
              <div className="w-full max-md:basis-1/2">
                <div className="my-3">
                  <label className="text-greyPrimary ml-6">
                    {t("Last_Name")}
                  </label>
                  <input
                    type="text"
                    className={`${inputFieldStyle}`}
                    defaultValue={userData.lname}
                    {...register("lname")}
                  />
                  {errors.lname && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lname?.message}
                    </p>
                  )}
                </div>
                {/* <div className="my-3">
									<label className="text-greyPrimary ml-6">Username</label>
									<input
										type="text"
										className={`${inputFieldStyle}`}
										defaultValue={`samiul333`}
									/>
								</div> */}
              </div>
            </div>
          </div>

          {/* ---------------------------------------- My Address --------------------------------- */}
          <div>
            <h1 className="text-base font-bold my-3 pb-3 border-b border-brandLsPrimary">
              {t("My_Addresses")}
            </h1>
            <div className="flex max-md:flex-col max-md:justify-center justify-evenly items-start max-md:gap-0 gap-8">
              <div className="w-full max-md:basis-1/2">
                <div className="my-3">
                  <label className="text-greyPrimary ml-6">
                    {t("Address")}
                  </label>
                  <input
                    type="text"
                    className={`${inputFieldStyle}`}
                    defaultValue={userData.customer_address}
                    {...register("customer_address")}
                  />
                  {errors.customer_address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.customer_address?.message}
                    </p>
                  )}
                </div>
                <div className="my-3">
                  <label className="text-greyPrimary ml-6">{t("City")}</label>
                  <input
                    type="text"
                    className={`${inputFieldStyle}`}
                    defaultValue={userData.customer_city_name}
                    {...register("customer_city_name")}
                  />
                  {errors.customer_city_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.customer_city_name?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full max-md:basis-1/2">
                <div className="my-3">
                  <label className="text-greyPrimary ml-6">{t("Area")}</label>
                  <input
                    type="text"
                    className={`${inputFieldStyle}`}
                    defaultValue={userData.customer_area_name}
                    {...register("customer_area_name")}
                  />
                  {errors.customer_area_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.customer_area_name?.message}
                    </p>
                  )}
                </div>
                <div className="my-3">
                  <label className="text-greyPrimary ml-6">
                    {t("Zip_Code")}
                  </label>
                  <input
                    type="text"
                    className={`${inputFieldStyle}`}
                    defaultValue={userData.customer_zip_postal_code}
                    {...register("customer_zip_postal_code")}
                  />
                  {errors.customer_zip_postal_code && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.customer_zip_postal_code?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-8">
            <button
              type="submit"
              // onClick={() => setEditProfile(false)}
              className="bg-link text-white text-base font-bold py-2 px-6 rounded-md"
            >
              {t("Save_Changes")}
            </button>
            <button
              type="button"
              onClick={() => setEditProfile(false)}
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

export default UserForm;
