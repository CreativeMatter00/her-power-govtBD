"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { format, parseISO } from "date-fns";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../inputFields/InputField";
import { FaMinus, FaPlus } from "react-icons/fa";
import DateField from "../inputFields/DateField";
import { useCookies } from "next-client-cookies";
import { getStudentInfo, url } from "../../../../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

const EditStudent = () => {
  const t = useTranslations("course");
  const cookies = useCookies();
  const userId = cookies.get("user_pid");
  const studentId = cookies.get("student_pid");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["studentInfo", userId],
    queryFn: () => getStudentInfo(userId as any),
  });

  const schema = Yup.object().shape({
    full_name: Yup.string().required("Provider name is required."),
    dob: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required."),
    education_info: Yup.array().of(
      Yup.object().shape({
        degree: Yup.string().required("Degree is required"),
        group: Yup.string().required("Group/Department is required"),
        passing_year: Yup.string().required("Passing year is required"),
        result: Yup.string()
          .required("GPA result is required")
          .test(
            "is-less-than-outof",
            "GPA result cannot be greater than GPA/CGPA out of",
            function (value) {
              const { gpa_cgpa_outof } = this.parent;
              return value <= gpa_cgpa_outof;
            }
          ),
        gpa_cgpa_outof: Yup.string().required("GPA/CGPA out of is required"),
      })
    ),
  });

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const {
    fields: educationFields,
    append: addEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education_info",
  });

  useEffect(() => {
    if (data) {
      const filterData = {
        full_name: data.full_name,
        dob: data.dob,
        gender: data.gender,
        education_info: data.education_info?.map((item: any) => ({
          educatmap_pid: item.educatmap_pid,
          degree: item.degree,
          group: item.group_department,
          passing_year: item.passing_year,
          result: item.result_gpa,
          gpa_cgpa_outof: item.gpa_cgpa_outof,
        })),
      };

      // Reset the form with the new data
      reset(filterData);

      // Clear the existing fields and append the new ones
      removeEducation(); // Remove all existing fields
      filterData.education_info?.forEach((item: any) => {
        addEducation(item); // Append each education item
      });
    }
  }, [data, reset, addEducation, removeEducation]);

  const onSubmit = async (data: any) => {
    const dobFormat = data?.dob ? format(data.dob, "yyyy-MM-dd") : null;
    const formattedData = {
      ref_user_pid: userId,
      student_info: {
        full_name: data?.full_name,
        dob: dobFormat,
        gender: data?.gender || "N/A",
      },
      education_info: data?.education_info.map((edu: any) => ({
        educatmap_pid: edu?.educatmap_pid || null,
        degree: edu.degree,
        group: edu.group,
        passing_year: edu.passing_year,
        result: parseFloat(edu.result),
        gpa_cgpa_outof: parseFloat(edu.gpa_cgpa_outof),
      })),
    };

    try {
      const response = await axios.put(
        `${url}/api/admin/student/${studentId}`,
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
        reset();
        refetch();
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
  };

  return (
    <section className="container p-4">
      <ToastContainer />
      <main className="my-12">
        <h1 className="text-center text-brandDs mt-12 font-bold underline underline-offset-4 text-4xl">
          {t("Edit Student Information")}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-8">
          <div className="grid grid-cols-2 gap-6 w-full">
            <InputField
              labelName={t("Full Name")}
              placeholderText={t("Enter your full name here")}
              inputName="full_name"
              register={register}
              errors={errors}
            />
            <DateField
              labelName={t("Date of Birth")}
              placeholderText="yyyy-mm-dd"
              inputName="dob"
              register={register}
              errors={errors}
            />
          </div>
          <div className="my-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl text-[#252525] font-bold">
                {t("Educational Information")}
              </h1>
              <button
                type="button"
                onClick={() =>
                  addEducation({
                    degree: "",
                    group: "",
                    passing_year: "",
                    result: "",
                    gpa_cgpa_outof: "",
                  })
                }
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
                      placeholderText={t("Degree")}
                      inputName={`education_info.${index}.degree`}
                      register={register}
                      errors={errors}
                    />
                    <div className="flex justify-end items-center mt-8">
                      <button
                        onClick={() => removeEducation(index)}
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
                      labelName={t("Group/Department")}
                      placeholderText={t("Group/Department")}
                      inputName={`education_info.${index}.group`}
                      register={register}
                      errors={errors}
                    />
                    <InputField
                      inputType="number"
                      labelName={t("Passing Year")}
                      placeholderText={t("Passing Year")}
                      inputName={`education_info.${index}.passing_year`}
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="w-1/2 pr-3 flex items-center gap-2">
                    <div className="pr-2 w-full">
                      <InputField
                        inputType="number"
                        labelName={t("GPA/CGPA")}
                        placeholderText={t("GPA/CGPA")}
                        inputName={`education_info.${index}.result`}
                        register={register}
                        errors={errors}
                      />
                    </div>
                    <p className="min-w-fit mt-6">{t("out of")}</p>
                    <div className="mt-6">
                      <select
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 min-w-[160px]"
                        id="gpaCgpaOutOf"
                        {...register(`education_info.${index}.gpa_cgpa_outof`, {
                          required: "Please select a value",
                        })}
                      >
                        <option value={4} selected>
                          4.00
                        </option>
                        <option value={5}>5.00</option>
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
            {t("Submit")}
          </button>
        </form>
      </main>
    </section>
  );
};

export default EditStudent;