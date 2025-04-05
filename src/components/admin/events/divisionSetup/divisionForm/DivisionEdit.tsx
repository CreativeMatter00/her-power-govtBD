"use client";

import React, { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputField from "@/components/shared/input/InputField";
import { url } from "@/api/api";
import axios from "axios";
import { toast } from "react-toastify";
import divisionSchema from "./divisionSchema";

interface IFormInput {
  division_code: string;
  division_name: string;
  bn_division_name: string;
}

interface IDivisionAddProps {
  editData: any;
  setEditModalOpen: Function;
  refetch: any;
}

const DivisionEdit: FC<IDivisionAddProps> = ({
  editData,
  setEditModalOpen,
  refetch,
}) => {
  const [isActive, setIsActive] = useState<boolean>(
    editData.active_status || false
  );

  // ================ RESOLVER ====================
  const resolver = yupResolver(divisionSchema);

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
    try {
      const response: any = await axios.patch(
        `${url}/api/admin/geo-division/${editData.division_pid}`,
        data
      );

      // console.log(response);

      if (response?.data?.meta?.status === true) {
        // ? Add to cart toast notification
        toast.success("Division added successfully!", {
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
    <section className="w-full">
      <main className={`rounded-2xl`}>
        <div className={`p-2`}>
          {/* ========================== HEADING PART ======================= */}
          <div className="border-b border-[#989898]">
            <div className="mx-12 my-4 flex justify-between items-center">
              <h1 className="text-xl text-[#1C1C1C] font-bold">Add Division</h1>
              {/* <RxCross2 className="h-8 w-8 cursor-pointer" /> */}
            </div>
          </div>
          {/* ===================== FORM PART ========================= */}
          <div className="mx-12 my-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <InputField
                type="text"
                register={register}
                errors={errors}
                defaultValue={editData.division_name}
                labelName="Division Name"
                inputName="division_name"
                placeholderText="Enter Division Name"
                mandatory={true}
              />
              <InputField
                type="text"
                register={register}
                errors={errors}
                defaultValue={editData.bn_division_name}
                labelName="Division Name Bangla"
                inputName="bn_division_name"
                placeholderText="Enter Division Name in Bangla"
                mandatory={true}
              />
              <InputField
                type="text"
                register={register}
                errors={errors}
                defaultValue={editData.division_code}
                labelName="Division Code"
                inputName="division_code"
                placeholderText="Enter Division Code"
                mandatory={true}
              />

              <div className="mt-4 w-full">
                <div className="bg-[#F2F2F2]">
                  <div className="p-3 flex">
                    <button
                      type="button"
                      onClick={() => setIsActive(true)}
                      className={`${
                        isActive ? "bg-link text-[#FFFFFF]" : "text-[#646464]"
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

              {/* ======================== SUBMIT FORM =================== */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-success text-bgPrimary text-sm font-medium px-8 py-3 rounded-sm"
                >
                  Edit Division
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};

export default DivisionEdit;
