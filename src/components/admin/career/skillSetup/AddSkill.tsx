import { api } from "@/api/api";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AddSkillSchema from "./AddSkillSchema";
import InputField from "./InputField";
import SelectInputField from "./SelectInputField";

interface IFormInput {
  parent_skill_pid: string;
  skill_name: string;
  skill_desc: string;
}

interface IProps {
  refetch: () => void;
  modalClose: any;
}

const AddSkill: React.FC<IProps> = ({ refetch, modalClose }) => {
  const resolver = yupResolver(AddSkillSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>({ resolver });

  // ================== FORM SUBMIT ==================
  const onSubmit = async (data: any) => {
    // console.log(data);

    const skillData = {
      skill_name: "",
      skill_desc: "",
      parent_skill_pid: "",
    };
    skillData.skill_name = data.skill_name;
    skillData.skill_desc = data.skill_desc;
    skillData.parent_skill_pid = data.parent_skill_pid;
    // console.log(skillData);

    try {
      const response = await api.post(`/api/skill-store`, skillData);
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
        console.error("Axios error:", error.response?.data);
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
              <p className="text-xl text-[#1C1C1C] font-bold">Add Skill</p>
            </div>
          </div>
          {/* ===================== FORM PART ========================= */}
          <div className="mx-12 my-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-6">
                <SelectInputField
                  control={control}
                  errors={errors}
                  name="parent_skill_pid"
                />

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
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};

export default AddSkill;
