import React from "react";
import InputField from "./InputField";
import axios from "axios";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { url } from "@/api/api";
import SkillsetSchema from "./SkillsetSchema";

interface ISkill {
  skill_desc: string;
  skill_name: string;
  skill_pid: string;
}

interface IFormInput {
  skill_name: string;
  skill_desc: string;
}

interface IProps {
  skill: ISkill;
  refetch: () => void;
  modalClose: () => void;
}

const EditSkillSet: React.FC<IProps> = ({ skill, refetch, modalClose }) => {
  const resolver = yupResolver(SkillsetSchema);
  // console.log(skill);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver });

  // ================== FORM SUBMIT ==================
  const onSubmit = async (data: any) => {
    // console.log(data);

    const skillData = {
      skill_name: "",
      skill_desc: "",
      skill_pid: "",
    };

    skillData.skill_name = data.skill_name;
    skillData.skill_desc = data.skill_desc;
    skillData.skill_pid = skill.skill_pid;
    // console.log(skillData);

    try {
      const response = await axios.post(
        `${url}/api/update-skillset/${skill.skill_pid}`,
        skillData
      );
      // console.log(response);

      refetch();
      modalClose();
      if (response?.data?.meta?.status === true) {
        // ? Add to cart toast notification
        toast.success("Skill updated successfully!", {
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
          {/* ========= FORM PART ========= */}
          <div className="border-t border-[#989898]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 mt-6"
            >
              <div className="flex flex-col gap-6">
                <InputField
                  register={register}
                  errors={errors}
                  labelName="Skill's Name"
                  inputName="skill_name"
                  defaultSkill={skill.skill_name}
                />

                <InputField
                  register={register}
                  errors={errors}
                  labelName="Skill's Description"
                  inputName="skill_desc"
                  defaultSkill={skill.skill_desc}
                />
              </div>

              {/* ======================== SUBMIT FORM =================== */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-success text-bgPrimary text-sm font-medium px-8 py-3 rounded-sm"
                >
                  Edit Skillset
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};

export default EditSkillSet;
