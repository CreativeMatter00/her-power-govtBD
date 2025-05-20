"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../../../api/api";
import DateField from "../inputFields/DateField";
import InputField from "../inputFields/InputField";
import { studentSchema } from "../schema/studentSchema";

interface FormValues {
  student_info: {
    gender: any;
    full_name: string;
    dob: string;
  };
  education_info: {
    degree: string;
    group: string;
    passing_year: string;
    result: string;
    gpa_cgpa_outof: string;
  }[];
}

const StudentRegistration = () => {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("courses");

  const cookies = useCookies();
  const userId = cookies.get("user_pid");
  // console.log(userId);
  if (!userId) {
    // alert("User Must Login First: No User PID Found");
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<any>({
    resolver: yupResolver(studentSchema),
    defaultValues: {
      student_info: {
        full_name: "",
        dob: new Date().toISOString().split("T")[0],
      },
      education_info: [
        {
          degree: "",
          group: "",
          passing_year: "",
          result: "",
          gpa_cgpa_outof: 0,
        },
      ],
    },
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education_info",
  });

  const addEducation = () => {
    appendEducation({
      degree: "",
      group: "",
      passing_year: "",
      result: "",
      gpa_cgpa_outof: 0,
    });
  };

  const removeEducationSection = (index: number) => {
    if (educationFields.length > 1) {
      removeEducation(index);
    }
  };

  const onSubmit = async (data: any) => {
    // console.log(data);

    const dobFormat = data?.student_info.dob
      ? new Date(data.student_info.dob).toISOString().split("T")[0]
      : null;
    const formattedData = {
      ref_user_pid: userId,
      student_info: {
        full_name: data?.student_info.full_name,
        dob: dobFormat,
        gender: data?.student_info.gender || "N/A",
      },
      education_info: data?.education_info.map((edu: any) => ({
        degree: edu.degree,
        group: edu.group,
        passing_year: edu.passing_year,
        result: parseFloat(edu.result),
        gpa_cgpa_outof: parseFloat(edu.gpa_cgpa_outof),
      })),
    };

    try {
      const response = await api.post(
        `/api/admin/student`,
        formattedData
      );
      if (response?.data?.meta?.status === true) {
        toast.success("Form submitted successfully!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(()=>{
          reset();
          cookies.set("isStudent", true as any);
          cookies.set("student_pid", data.student_pid);
          router.push(`/${locale}/course`);
        },3000)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
        toast.error(
          `Error: ${error.response?.data.message || "Something went wrong"}`,
          {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      } else {
        console.error("Error during form submission", error);
        toast.error("Unexpected error during form submission", {
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
    }

    // console.log(formattedData);
  };

  // console.log(errors);

  return (
    <section className="container p-4">
      <ToastContainer />
      <main className="my-12">
        <h1 className="text-center text-brandDs mt-12 font-bold underline underline-offset-4 text-4xl">
          {t("Student_Registration")}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-8">
          <div className="grid grid-cols-2 gap-6 w-full">
            <InputField
              labelName={t("Full_Name")}
              placeholderText={t("Enter_your_full_name_here")}
              inputName="student_info.full_name"
              register={register}
              errors={errors}
              required={true}
            />
            <DateField
              labelName={t("Date_of_Birth")}
              placeholderText="yyyy-mm-dd"
              inputName="student_info.dob"
              register={register}
              errors={errors}
              required={true}
            />
          </div>
          <div className="my-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl text-[#252525] font-bold">
                {t("Educational_Information")}
              </h1>
              <button
                type="button"
                onClick={addEducation}
                className="rounded-full bg-link h-fit"
              >
                <FaPlus className="text-bgPrimary p-2 w-10 h-10" />
              </button>
            </div>

            {educationFields.map((section, index) => (
              <div key={section.id} className="w-full">
                <div className="grid grid-cols-1 gap-6 w-full mt-2">
                  <div className="grid grid-cols-2 gap-6 ">
                    <InputField
                      labelName={t("Degree")}
                      placeholderText={t("Degree_placeholder")}
                      inputName={`education_info[${index}].degree`}
                      register={register}
                      errors={errors}
                      required={true}
                    />
                    <div className="flex justify-end items-center mt-8">
                      <button
                        onClick={() => removeEducationSection(index)}
                        disabled={educationFields.length === 1}
                        className={`rounded-full ${
                          educationFields.length === 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-dangerSecondary"
                        } h-fit`}
                      >
                        <FaMinus className="text-bgPrimary p-2 w-10 h-10" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 ">
                    <InputField
                      labelName={t("Group_Department")}
                      placeholderText={t("Group_Department")}
                      inputName={`education_info[${index}].group`}
                      register={register}
                      errors={errors}
                      required={true}
                    />
                    <InputField
                      labelName={t("Passing_Year")}
                      placeholderText={t("Passing_Year")}
                      inputName={`education_info[${index}].passing_year`}
                      register={register}
                      errors={errors}
                      required={true}
                    />
                  </div>
                  <div className="w-1/2 pr-3 flex items-center gap-2">
                    <div className="pr-2 w-full">
                      <InputField
                        inputType="number"
                        labelName={t("GPA_CGPA")}
                        placeholderText={t("GPA_CGPA")}
                        inputName={`education_info[${index}].result`}
                        register={register}
                        errors={errors}
                        required={true}
                      />
                    </div>
                    <p className="min-w-fit mt-6">{t("out_of")}</p>
                    <div className="mt-6">
                      <select
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 min-w-[160px]"
                        id="gpaCgpaOutOf"
                        {...register(`education_info.${index}.gpa_cgpa_outof`, {
                          required: "Please select a value",
                        })}
                      >
                        <option value={4} selected>{t("4_gpa_option")}</option>
                        <option value={5}>{t("5_gpa_option")}</option>
                      </select>

                      {(errors as any)?.education_info?.[index]
                        ?.gpa_cgpa_outof && (
                        <p className="text-red-500 text-sm mt-1">
                          {
                            (errors as any).education_info[index].gpa_cgpa_outof
                              .message
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-link py-2 px-4 rounded text-white font-bold"
          >
            {t("Register")}
          </button>
        </form>
      </main>
    </section>
  );
};

export default StudentRegistration;
