"use client";
import React from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import SkillsetSchema from "./SkillsetSchema";
import { api, url } from "@/api/api";
import axios from "axios";
import { toast } from "react-toastify";

interface IFormInput {
  skill_name: string;
  skill_desc: string;
}

interface IProps {
  refetch: () => void; // refetch function after editing
  modalClose: any;
}

const AddSkillset: React.FC<IProps> = ({ refetch, modalClose }) => {
  const resolver = yupResolver(SkillsetSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver });

  // ================== FORM SUBMIT ==================
  const onSubmit = async (data: IFormInput) => {
    // setIsLoading(true);
    // console.log(data);

    const skillData = {
      skill_name: "",
      skill_desc: "",
    };
    skillData.skill_name = data.skill_name;
    skillData.skill_desc = data.skill_desc;
    // console.log(skillData);

    try {
      const response = await api.post(`/api/skillset-store`, skillData);
      // console.log(response);

      refetch();
      modalClose();
      if (response?.data?.meta?.status === true) {
        // ? Add to cart toast notification
        toast.success("Skill added successfully!", {
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
      if (axios.isAxiosError(error)) {
        console.error("api error:", error.response?.data);
        // alert(
        //   `Error: ${error.response?.data.message || "Something went wrong"}`
        // );
      } else {
        console.error("Error during form submission", error);
        // alert("Unexpected error during form submission");
      }
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <section className="w-full">
      <main className={`rounded-2xl`}>
        <div className={`p-2`}>
          {/* ========================== HEADING PART ======================= */}
          <div className="border-b border-[#989898]">
            <div className="mx-12 my-4 flex justify-between items-center">
              <p className="text-xl text-[#1C1C1C] font-bold">Add Skillset</p>
            </div>
          </div>
          {/* ===================== FORM PART ========================= */}
          <div className="mx-12 my-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-6">
                <InputField
                  register={register}
                  errors={errors}
                  labelName="Skill's Name"
                  inputName="skill_name"
                  placeholderText="Enter Skill's Name"
                />

                <InputField
                  register={register}
                  errors={errors}
                  labelName="Skill's Description"
                  inputName="skill_desc"
                  placeholderText="Enter Skill's Description"
                />
              </div>

              {/* ======================== SUBMIT FORM =================== */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-success text-bgPrimary text-sm font-medium px-8 py-3 rounded-sm"
                >
                  Add Skillset
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};

export default AddSkillset;
