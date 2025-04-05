"use client";

import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { url } from "@/api/api";
import InputField from "@/components/shared/input/InputField";
import speakersSchema from "./speakersSchema";
import { toast } from "react-toastify";

interface IFormInput {
  speaker_name: string;
  speaker_email: string;
  phone_no: string;
  description: string;
  org_address?: string;
  designation: string;
  speaker_bio: string;
  speaker_profile_link?: string;
}

interface ISpeakersAddProps {
  refetch: any;
  modalClose?: any;
}

const SpeakersAdd: FC<ISpeakersAddProps> = ({ refetch, modalClose }) => {
  // ================ RESOLVER ====================
  const resolver = yupResolver(speakersSchema);

  // ======================== USE FORM ========================
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ resolver });

  // ================== FORM SUBMIT ==================
  const onSubmit = async (data: IFormInput) => {
    // console.log("Form Submitted:", data); // Add this line to check if the form is submitted
    try {
      const response: any = await axios.post(
        `${url}/api/admin/event/speaker`,
        data
      );

      // console.log(response);

      if (response?.data?.meta?.status === true) {
        // ? Add to cart toast notification
        toast.success("Speaker added successfully!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        refetch();
        reset();
        modalClose();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong", {
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
  };

  return (
    <>
      <section className="w-full">
        <main className={`rounded-2xl`}>
          <div className={`p-2`}>
            {/* ========================== HEADING PART ======================= */}
            <div className="border-b border-[#989898]">
              <div className="mx-12 my-4 flex justify-between items-center">
                <h1 className="text-xl text-[#1C1C1C] font-bold">
                  Add Speaker
                </h1>
                {/* <RxCross2 className="h-8 w-8 cursor-pointer" /> */}
              </div>
            </div>
            {/* ===================== FORM PART ========================= */}
            <div className="mx-12 my-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <div className="flex items-start gap-6">
                  {/* =========================== LEFT SIDE ======================== */}
                  <div className="basis-1/2 flex flex-col gap-4">
                    <InputField
                      type="text"
                      register={register}
                      errors={errors}
                      labelName="Speaker's Name"
                      inputName="speaker_name"
                      placeholderText="Enter Speaker's Name"
                      mandatory={true}
                    />
                    <InputField
                      type="text"
                      register={register}
                      errors={errors}
                      labelName="Email"
                      inputName="speaker_email"
                      placeholderText="Enter Speaker's Email"
                      mandatory={true}
                    />
                    <InputField
                      type="text"
                      register={register}
                      errors={errors}
                      labelName="Phone No"
                      inputName="phone_no"
                      placeholderText="Enter Phone No"
                      mandatory={true}
                    />
                    <div>
                      <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
                        Speaker&apos;s Description
                        <span
                          className={`text-dangerPrimary ml-2
                          `}
                        >
                          *
                        </span>
                      </label>

                      <textarea
                        rows={13}
                        cols={10}
                        placeholder="Speaker's Description"
                        className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded w-full"
                        {...register("description")}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.description?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* ===================== RIGHT SIDE ========================== */}
                  <div className="basis-1/2 flex flex-col gap-4">
                    {" "}
                    <InputField
                      type="text"
                      register={register}
                      errors={errors}
                      labelName="Organization Address"
                      inputName="org_address"
                      placeholderText="Enter Speaker's Organization Address"
                      mandatory={false}
                    />
                    <InputField
                      type="text"
                      register={register}
                      errors={errors}
                      labelName="Speaker's Designation"
                      inputName="designation"
                      placeholderText="Enter Speaker's Designation"
                      mandatory={true}
                    />
                    <InputField
                      type="text"
                      register={register}
                      errors={errors}
                      labelName="Speaker's Profile Link"
                      inputName="speaker_profile_link"
                      placeholderText="Enter Speaker's Profile"
                      mandatory={false}
                    />
                    <div>
                      <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
                        Speaker&apos;s Bio
                        <span
                          className={`text-dangerPrimary ml-2
                          }`}
                        >
                          *
                        </span>
                      </label>

                      <textarea
                        rows={13}
                        cols={10}
                        placeholder="Speaker's Bio"
                        className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded w-full"
                        {...register("speaker_bio")}
                      />
                      {errors.speaker_bio && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.speaker_bio?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ======================== SUBMIT FORM =================== */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-success text-bgPrimary text-sm font-medium px-8 py-3 rounded-sm"
                  >
                    Add Speaker
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default SpeakersAdd;
