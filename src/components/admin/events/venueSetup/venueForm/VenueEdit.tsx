"use client";

import { api, getAllDivisions } from "@/api/api";
import EditInput from "@/components/shared/input/EditInput";
import SelectInput from "@/components/shared/input/SelectInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import ScaleLoader from "react-spinners/ScaleLoader";
import { toast } from "react-toastify";
import venueSchema from "./venueSchema";

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
  setEditModalOpen: Function;
  refetch: any;
  editData: any;
}

const VenueEdit: FC<IEditProps> = ({ setEditModalOpen, refetch, editData }) => {
  // console.log("editData", editData);
  const [isActive, setIsActive] = useState<boolean>(true);

  // ================ RESOLVER ====================
  const resolver = yupResolver(venueSchema);

  const {
    isLoading: isAllDivisionLoading,
    isError: isDivisionError,
    data: allDivisions,
  } = useQuery({
    queryKey: ["divisions"],
    queryFn: () => getAllDivisions(),
  });

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
      capacity: data.venueCapacity,
      per_day_rent: data.perdayRent,
      division_pid: data.divisionVenue,
    };

    // console.log("venue data", venueData);

    try {
      const response = await api.put(
        `/api/admin/event/venue/${editData.venue_pid}`,
        venueData
      );

      // console.log("API Response:", response.data);
      refetch();
      reset();
      if (response?.data?.meta?.status === true) {
        // ? Add to cart toast notification
        toast.success("Venue updated successfully!", {
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
    setEditModalOpen(false);
  };

  return (
    <>
      <section className="w-full">
        <main className={`rounded-2xl`}>
          <div className={`p-2`}>
            {/* ========================== HEADING PART ======================= */}
            <div className="border-b border-[#989898]">
              <div className="mx-12 my-4 flex justify-between items-center">
                <h1 className="text-xl text-[#1C1C1C] font-bold">Edit Venue</h1>
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
                    <EditInput
                      register={register}
                      errors={errors}
                      labelName="Venue Name"
                      inputName="venueName"
                      defaultValue={editData.venue_name}
                      placeholderText="Enter Venue Name"
                      optional={true}
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
                        defaultValue={editData?.news_content}
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
                    <EditInput
                      register={register}
                      errors={errors}
                      labelName="Venue title"
                      inputName="venueTitle"
                      defaultValue={editData.venue_title}
                      placeholderText="Enter Venue Title"
                      optional={true}
                    />
                    <EditInput
                      register={register}
                      errors={errors}
                      labelName="Venue Address"
                      inputName="venueAddress"
                      defaultValue={editData.venue_address}
                      placeholderText="Enter Venue Address"
                      optional={true}
                    />
                    <EditInput
                      register={register}
                      errors={errors}
                      labelName="Venue Capacity"
                      inputName="venueCapacity"
                      defaultValue={editData.capacity}
                      placeholderText="Enter Venue Capacity"
                      optional={true}
                    />
                    <EditInput
                      register={register}
                      errors={errors}
                      labelName="Venue Perday Rent"
                      inputName="perdayRent"
                      defaultValue={editData.per_day_rent}
                      placeholderText="Enter Venue Perday Rent"
                      optional={true}
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
                    Edit Venue
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

export default VenueEdit;
