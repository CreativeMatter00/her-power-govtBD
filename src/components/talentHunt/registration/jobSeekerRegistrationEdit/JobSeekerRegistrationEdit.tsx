"use client";
import { fetchData, url } from "@/api/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileInput from "./FileInput";
import TextInput from "../inputFields/TextInput";
import Title from "../Title";
import UserInformation from "../UserInformation";
import JobSeekerSchema from "../jobSeekerRegistration/JobSeekerSchema";
import EditSkill from "./EditSkill";
import EducationEdit from "./EducationEdit";
import EditJob from "./EditJob";
import Achievement from "./Achievement";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface IFormInputs {
  portfolio?: string | undefined;
  degree?: string[];
  groupDepartment?: string[];
  passingYear?: string[];
  gpaCgpa?: number[];
  outOf?: number[];
  skill?: string[];
  experience?: string[];
  title?: string[];
  jobExperience?: string[];
}

const JobSeekerRegistrationEdit = () => {
    const router = useRouter();
    const locale = useLocale();
  const t = useTranslations("career");

  const [editedJobData, setEditedJobData] = useState<any>();
  const [editedAchievement, setEditedAchievement] = useState<any>();
  const [editedSkillData, setEditedSkillData] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedCV, setSelectedCV] = useState<File | null>(null);
  const cookies = useCookies();
  const userId = cookies.get("user_pid");
  const resolver = yupResolver(JobSeekerSchema);

  const {
    isLoading,
    data: jobSeekEditData,
    error,
    refetch,
  } = useQuery({
    queryKey: ["jobSeekerInfo", userId],
    queryFn: () => fetchData(`get-job-seeker/${userId}`),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<any>({ resolver });

  const methods = useForm<IFormInputs>({ resolver });

  const skill_info = watch("skill_info");
  const achievement_info = watch("achievement_info");
  const jobList = watch("jobList");

  const onSubmit = async (data: any) => {
    if (!selectedCV) {
      // alert("Upload your cv !");
    }

    const achievements = editedAchievement?.map(
      (achievement: any, index: number) => ({
        achievment_title: achievement?.achievment_title,
        attached_doc: selectedFiles[index] || null,
      })
    );

    // Create a JSON object to send in the request body
    const jobSeekerData = {
      user_pid: userId as string,
      // user_pid: "U241100000192",
      // user_pid: "U241000000162",
      job_seeker_info: {
        portfolio: data.portfolio || null,
        work_profile: data.portfolio ? "Freelancer" : null,
        cv_path: selectedCV,
      },
      education_info: data.degree?.map((degree: any, index: any) => ({
        edu_dgree: degree,
        group_department: data?.groupDepartment[index],
        passing_year: data?.passingYear[index],
        result_gpa: data.gpaCgpa[index]?.toString(),
        gpa_cgpa_outof: data.outOf[index]?.toString(),
      })),
      skill_info: editedSkillData?.map((skillGroup: any) => ({
        skill_group: skillGroup?.skill_group,
        skill_category: skillGroup?.skill_category, // You can modify this according to your data
      })),
      work_experience_info: editedJobData?.map(
        (experience: any, index: number) => ({
          experience_title: experience?.experience_title,
          experience_desc: experience?.experience_desc,
          institution_name: experience?.institution_name,
        })
      ),
      achievement_info: achievements, // Combined achievement data
    };

    try {
      const response = await axios.post(
        `${url}/api/job-seeker-update/${
          jobSeekEditData && jobSeekEditData?.profile_pid
        }`,
        jobSeekerData // Send the JSON object in the request body
      );
      if (response?.data?.meta?.status === true) {
        toast.success("Job seeker details updated successfully!", {
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
        setTimeout(() => {
          router.push(`/${locale}/career/profile/job-seeker`);
        }, 3000);
      } else {
        toast.error("Job seeker registration failed!", {
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
        // console.log("Job seeker registration failed", error);
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

    if (Object.keys(errors).length) {
      console.error(errors); // Log the validation errors
    }
  };

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
    // alert("Please correct the errors in the form.");
  };

  return (
    <main className="container p-4 mt-16">
      <section className="my-8 w-full">
        <p className="text-brandPrimary text-3xl">
          {t("Edit_Job_Seeker_Registration_Form")}
        </p>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="my-5 border border-brandLsPrimary rounded-lg w-full p-6">
              <div className="mt-4">
                <Title infoTitle="Personal Information" />
                <UserInformation />
              </div>
              <EducationEdit
                errors={errors}
                register={register}
                setValue={setValue}
                watch={watch}
                defaultValue={jobSeekEditData?.education_info}
                refetch={refetch}
              />
              <EditSkill
                // errors={errors}
                register={register}
                // setValue={setValue}
                watch={watch}
                defaultValue={jobSeekEditData?.skill_info}
                setEditedSkillData={setEditedSkillData}
                refetch={refetch}
              />
              <EditJob
                register={register}
                setValue={setValue}
                errors={errors}
                defaultValue={jobSeekEditData?.work_experience_info}
                setEditedJobData={setEditedJobData}
              />
              <Achievement
                control={control}
                register={register}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                errors={errors}
                defaultValue={jobSeekEditData?.achievement_info}
                setEditedAchievement={setEditedAchievement}
              />
              <div className="mt-16">
                <Title infoTitle="Profile Setup" />
                <div className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-4 mt-4">
                    <TextInput
                      inputType="text"
                      register={register}
                      errors={errors}
                      labelName="Portfolio"
                      inputName="portfolio"
                      placeholderText="Enter your portfolio here"
                      optionalLabel="(if you have any)"
                      defaultValue={jobSeekEditData?.portfolio}
                    />
                    <div className="w-full">
                      <FileInput
                        selectedFile={selectedCV}
                        setSelectedFile={setSelectedCV}
                        defaultValue={jobSeekEditData?.cv_path}
                      />
                      {!selectedCV && (
                        <span className="text-red-500">
                          * {t("RequiredField")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="flex gap-6">
                <button
                  type="submit"
                  className="bg-link hover:bg-linkHover rounded-full py-4 px-10 text-bgPrimary font-medium"
                >
                  {t("Submit")}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </section>
      <ToastContainer />
    </main>
  );
};

export default JobSeekerRegistrationEdit;
