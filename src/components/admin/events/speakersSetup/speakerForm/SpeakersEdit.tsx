"use client";

import React, { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import speakersSchema from "./speakersSchema";
import InputField from "@/components/shared/input/InputField";
import { url } from "@/api/api";
import axios from "axios";
import { toast } from "react-toastify";

interface IFormInput {
  speaker_name: string;
  speaker_email: string;
  phone_no: string;
  description: string;
  org_address?: string;
  designation: string;
  speaker_bio: string;
}

interface ISpeakersEditProps {
  editData: any;
  setEditModalOpen: Function;
  refetch: any;
}

const SpeakersEdit: FC<ISpeakersEditProps> = ({
  editData,
  setEditModalOpen,
  refetch,
}) => {
  // console.log(editData);

  const [isActive, setIsActive] = useState<boolean>(
    editData.active_status || false
  );

  // console.log(isActive);

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
    // console.log("Form Submitted:", data);

    // Add isActive to the data object
    const updatedData = {
      ...data,
      // active_status: isActive, // Assuming the API expects a field named 'is_active'
    };

    try {
      const response: any = await axios.put(
        `${url}/api/admin/event/speaker/${editData.speaker_pid}`,
        updatedData
      );

      // console.log(response);

      if (response?.data?.meta?.status === true) {
        toast.success("Speaker updated successfully!", {
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
        setEditModalOpen(false);
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
                  Edit Speakers
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
                      labelName="Speakers Name"
                      inputName="speaker_name"
                      defaultValue={editData.speaker_name}
                      placeholderText="Enter Speakers Name"
                      mandatory={true}
                    />
                    <InputField
                      type="text"
                      register={register}
                      errors={errors}
                      labelName="Email"
                      inputName="speaker_email"
                      defaultValue={editData.speaker_email}
                      placeholderText="Enter Speakers Email"
                      mandatory={true}
                    />
                    <InputField
                      type="text"
                      register={register}
                      errors={errors}
                      labelName="Phone No"
                      inputName="phone_no"
                      defaultValue={editData.phone_no}
                      placeholderText="Enter Phone No"
                      mandatory={true}
                    />
                    <div>
                      <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
                        Speakers Description
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
                        placeholder="Speakers Description"
                        defaultValue={editData.speaker_description}
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
                      defaultValue={editData.org_address}
                      placeholderText="Enter Speakers Organization Address"
                      mandatory={false}
                    />
                    <InputField
                      type="text"
                      register={register}
                      errors={errors}
                      labelName="Speakers Designation"
                      inputName="designation"
                      defaultValue={editData.designation}
                      placeholderText="Enter Speakers Designation"
                      mandatory={true}
                    />
                    <div>
                      <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
                        Speakers Bio
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
                        placeholder="Speakers Bio"
                        defaultValue={editData.speaker_bio}
                        className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded w-full"
                        {...register("speaker_bio")}
                      />
                      {errors.speaker_bio && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.speaker_bio?.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-4 w-full">
                      <div className="bg-[#F2F2F2]">
                        <div className="p-3 flex">
                          <button
                            type="button"
                            onClick={() => setIsActive(true)}
                            className={`${
                              isActive
                                ? "bg-link text-[#FFFFFF]"
                                : "text-[#646464]"
                            } text-base w-1/2 rounded py-3`}
                          >
                            Active
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsActive(false)}
                            className={`${
                              isActive === false
                                ? "bg-link text-[#FFFFFF]"
                                : "text-[#646464]"
                            } text-base w-1/2 rounded py-3`}
                          >
                            Inactive
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ======================== SUBMIT FORM =================== */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-success text-bgPrimary text-sm font-medium px-8 py-3 rounded-sm"
                  >
                    Edit Speaker
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

export default SpeakersEdit;
