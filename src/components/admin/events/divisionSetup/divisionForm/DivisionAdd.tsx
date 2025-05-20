"use client";

import { api } from "@/api/api";
import InputField from "@/components/shared/input/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import divisionSchema from "./divisionSchema";

interface IFormInput {
  division_code: string;
  division_name: string;
  bn_division_name: string;
}

interface IDivisionAddProps {
  refetch: any;
  modalClose?: any;
}

const DivisionAdd: FC<IDivisionAddProps> = ({ refetch, modalClose }) => {
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
    // console.log("Form Submitted:", data); // Add this line to check if the form is submitted
    try {
      const response: any = await api.post(
        `/api/admin/geo-division`,
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
                labelName="Division Name"
                inputName="division_name"
                placeholderText="Enter Division Name"
                mandatory={true}
              />
              <InputField
                type="text"
                register={register}
                errors={errors}
                labelName="Division Name Bangla"
                inputName="bn_division_name"
                placeholderText="Enter Division Name in Bangla"
                mandatory={true}
              />
              <InputField
                type="text"
                register={register}
                errors={errors}
                labelName="Division Code"
                inputName="division_code"
                placeholderText="Enter Division Code"
                mandatory={true}
              />

              {/* ======================== SUBMIT FORM =================== */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-success text-bgPrimary text-sm font-medium px-8 py-3 rounded-sm"
                >
                  Add Division
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};

export default DivisionAdd;
