"use client";

import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import InputField from "@/components/shared/input/InputField";
import venueSchema from "./venueSchema";
import { getAllDivisions, url } from "@/api/api";
import { toast } from "react-toastify";
import SelectInput from "@/components/shared/input/SelectInput";
import { useQuery } from "@tanstack/react-query";
import ScaleLoader from "react-spinners/ScaleLoader";

interface IFormInput {
  venueName: string;
  venueAddress: string;
  venueTitle: string;
  venueDescription: string;
  venueCapacity: number;
  perdayRent: number;
  divisionVenue: string;
}

interface IEditProps {
  refetch: any;
  modalClose?: any;
}

const VenueAdd: FC<IEditProps> = ({ refetch, modalClose }) => {
  const {
    isLoading: isAllDivisionLoading,
    isError: isDivisionError,
    data: allDivisions,
  } = useQuery({
    queryKey: ["divisions"],
    queryFn: () => getAllDivisions(),
  });

  // ================ RESOLVER ====================
  const resolver = yupResolver(venueSchema);

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
    // alert(JSON.stringify(data));
    const venueData = {
      venue_name: data.venueName,
      venue_address: data.venueAddress,
      venue_title: data.venueTitle,
      // effectivefrom: data.venueDescription,
      capacity: data.venueCapacity,
      per_day_rent: data.perdayRent,
      division_code: data.divisionVenue,
    };

    // console.log(venueData);
    try {
      const response = await axios.post(
        `${url}/api/admin/event/venue`,
        venueData
      );
      // console.log(response);
      modalClose();
      if (response?.data?.meta?.status === true) {
        // ? Add to cart toast notification
        toast.success("Venue added successfully!", {
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
                <h1 className="text-xl text-[#1C1C1C] font-bold">Add Venue</h1>
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
                      labelName="Venue Name"
                      inputName="venueName"
                      placeholderText="Enter Venue Name"
                      mandatory={true}
                    />
                    <div>
                      <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
                        Venue Description
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
                        placeholder="Venue Descriptions"
                        className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded w-full"
                        {...register("venueDescription")}
                      />
                      {errors.venueDescription && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.venueDescription?.message}
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
                      labelName="Venue title"
                      inputName="venueTitle"
                      placeholderText="Enter Venue Title"
                      mandatory={true}
                    />
                    <InputField
                      type="text"
                      register={register}
                      errors={errors}
                      labelName="Venue Address"
                      inputName="venueAddress"
                      placeholderText="Enter Venue Address"
                      mandatory={true}
                    />
                    <InputField
                      type="number"
                      register={register}
                      errors={errors}
                      labelName="Venue Capacity"
                      inputName="venueCapacity"
                      placeholderText="Enter Venue Capacity"
                      mandatory={true}
                    />
                    <InputField
                      type="number"
                      register={register}
                      errors={errors}
                      labelName="Venue Perday Rent"
                      inputName="perdayRent"
                      placeholderText="Enter Venue Perday Rent"
                      mandatory={true}
                    />
                    {isAllDivisionLoading ? (
                      <div className="flex items-center justify-center">
                        <ScaleLoader
                          color="#421957"
                          height={70}
                          radius={8}
                          width={10}
                        />
                      </div>
                    ) : (
                      <SelectInput
                        labelName="Division"
                        placeholderText="Select a Division"
                        register={register}
                        errors={errors}
                        inputName="divisionVenue"
                        allData={allDivisions}
                        optionalField={true}
                      />
                    )}
                  </div>
                </div>

                {/* ======================== SUBMIT FORM =================== */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-success text-bgPrimary text-sm font-medium px-8 py-3 rounded-sm"
                  >
                    Add Venue
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

export default VenueAdd;
