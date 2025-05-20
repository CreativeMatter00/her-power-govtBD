"use client";
import React, { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { api, url } from "@/api/api";
import SponsorSchema from "./SponsorSchema";
import InputField from "@/components/shared/input/InputField";
import ImageInput from "@/components/shared/input/ImageInput";
import { toast } from "react-toastify";

interface IFormInput {
  sponsorName: string;
  contractPerson: string;
  address: string;
  contactEmail: string;
  sponsorDescription: string;
  contactPhone: number;
  imageFile?: string;
}

interface IEditProps {
  refetch: any;
  modalClose?: any;
}

const AddSponsor: FC<IEditProps> = ({ refetch, modalClose }) => {
  const [selectedImages, setSelectedImages] = useState<any>([]);
  // ================ RESOLVER ====================
  const resolver = yupResolver(SponsorSchema);

  // ======================== USE FORM ========================
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ resolver });

  // ================== FORM SUBMIT ==================
  const onSubmit = async (data: IFormInput) => {
    // console.log(data);
    // console.log("selectedImages", selectedImages[0]);
    // alert(JSON.stringify(data));

    const sponsorData = new FormData();
    sponsorData.append("sponsor_name", data.sponsorName);
    sponsorData.append("contract_persone", data.contractPerson);
    sponsorData.append("address_line", data.address);
    sponsorData.append("contact_email", data.contactEmail);
    sponsorData.append("description", data.sponsorDescription);
    sponsorData.append("contact_phone", data.contactPhone.toString()); // Convert to string if necessary

    // Append the image file if it exists
    if (selectedImages?.length > 0) {
      sponsorData.append("sponsor_image", selectedImages[0]);
    }
    const printFormData = (formData: FormData) => {
      formData.forEach((value, key) => {
        // if (value instanceof File) {
        //   console.log(`${key}: File - ${value.name}`);
        // } else {
        //   console.log(`${key}: ${value}`);
        // }
      });
    };

    printFormData(sponsorData);

    // console.log("sponsorData", sponsorData);

    try {
      const response = await api.post(
        `/api/admin/event/sponsor`,
        sponsorData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("API Response:", response.data);
      modalClose();
      if (response?.data?.meta?.status === true) {
        // ? Add to cart toast notification

        toast.success("Sponsor added successfully!", {
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
      refetch();
      reset();
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
                  Add Sponsor
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
                      labelName="Sponsor Name"
                      inputName="sponsorName"
                      placeholderText="Enter Sponsor Name"
                      mandatory={true}
                    />
                    <InputField
                      type="text"
                      register={register}
                      errors={errors}
                      labelName="Contract Person Name"
                      inputName="contractPerson"
                      placeholderText="Enter Contract Persone Name"
                      mandatory={true}
                    />
                    <InputField
                      type="tel"
                      register={register}
                      errors={errors}
                      labelName="Contact Number"
                      inputName="contactPhone"
                      placeholderText="Enter Contact number"
                      mandatory={true}
                    />
                    <div>
                      <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
                        Sponsor Description
                        <span
                          className={`text-dangerPrimary
                          }`}
                        >
                          *
                        </span>
                      </label>

                      <textarea
                        rows={13}
                        cols={10}
                        placeholder="News Descriptions"
                        className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded w-full"
                        {...register("sponsorDescription")}
                      />
                      {errors.sponsorDescription && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.sponsorDescription?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* ===================== RIGHT SIDE ========================== */}
                  <div className="basis-1/2 flex flex-col gap-4">
                    {" "}
                    <InputField
                      type="email"
                      register={register}
                      errors={errors}
                      labelName="Contact Email"
                      inputName="contactEmail"
                      placeholderText="Enter Contact Email"
                      mandatory={true}
                    />
                    <InputField
                      type="text"
                      register={register}
                      errors={errors}
                      labelName="Address"
                      inputName="address"
                      placeholderText="Enter Address"
                      mandatory={true}
                    />
                    <ImageInput
                      labelName="Sponsor Image"
                      selectedImages={selectedImages}
                      setSelectedImages={setSelectedImages}
                    />
                  </div>
                </div>

                {/* ======================== SUBMIT FORM =================== */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-success text-bgPrimary text-sm font-medium px-8 py-3 rounded-sm"
                  >
                    Add Sponsor
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

export default AddSponsor;
