"use client";
import React, { useState } from "react";
import TextInput from "../inputFields/TextInput";
import Title from "../Title";
import Education from "./Education";
import { GoPlus } from "react-icons/go";
import { HiOutlineInformationCircle } from "react-icons/hi";
// import AccountSetup from "./AccountSetup";
import FileInput from "../inputFields/FileInput";
import { yupResolver } from "@hookform/resolvers/yup";
import JobSeekerSchema from "./JobSeekerSchema";
import { useForm } from "react-hook-form";
import Job from "./job/Job";
import Achievment from "./achievment/Achievment";
import Skill from "./skill/Skill";
import UserInformation from "../UserInformation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { url } from "@/api/api";
import { useCookies } from "next-client-cookies";
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

const JobSeekerRegistration = () => {
  const t = useTranslations("career");

  const [educationList, setEducationList] = useState([0]);
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [selectedCV, setSelectedCV] = useState<File | null>(null);
  const cookies = useCookies();
  const userId = cookies.get("user_pid");

  const resolver = yupResolver(JobSeekerSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<IFormInputs>({ resolver });

  // const employeeTypeValue = watch("employeeType");
  const degrees = watch("degree") || [];
  const groups = watch("groupDepartment") || [];
  const passingYears = watch("passingYear") || [];
  const gpaCgpas = watch("gpaCgpa") || [];
  const outOfs = watch("outOf") || [];
  // const skills = watch("skill") || [];
  // const experiences = watch("experience") || [];
  // const titles = watch("title") || [];
  // const jobExperiences = watch("jobExperience") || [];
 const router=useRouter();
 const locale = useLocale();
  const onSubmit = async (data: any) => {
    // console.log(data);
    // console.log(selectedCV);
    // console.log(selectedFiles);

    const achievements = (data.achievement_info || []).map(
      (achievement: any, index: number) => ({
        achievment_title: achievement?.title,
        attached_doc: selectedFiles[index] || null,
      })
    );

    // Create a JSON object to send in the request body
    const jobSeekerData = {
      user_pid: userId as string,
      // user_pid: "U241100000192",
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
      skill_info: data.skill_info?.map((skillGroup: any) => ({
        skill_group: skillGroup?.skill_group,
        skill_category: skillGroup?.skill_category, // You can modify this according to your data
      })),
      work_experience_info: data.jobExperience?.map(
        (experience: any, index: number) => ({
          experience_title: experience,
          experience_desc: data.title[index],
          institution_name: data.organization[index],
        })
      ),
      achievement_info: achievements, // Combined achievement data
    };

    // console.log("jobSeekerData:", jobSeekerData, selectedImage);

    try {
      const response = await axios.post(
        `${url}/api/job-seeker-register`,
        jobSeekerData // Send the JSON object in the request body
      );

      // console.log(response);

      if (response?.data?.meta?.status === true) {
        cookies.set("isJobSeeker", true as any);
        cookies.set("jobSeeker_pid", response?.data?.profile_pid);
        toast.success("Job Seeker registered successfully!", {
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
        setTimeout(()=>{
          router.push(`${locale}/career`)
        },3000)
      } else {
        toast.error("Job Seeker registration failed!", {
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
        // console.log("Job provider registration failed", error);
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

  const handleAddEducation = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEducationList([...educationList, educationList.length + 1]);
    setValue("degree", [...degrees, ""]);
    setValue("groupDepartment", [...groups, ""]);
    setValue("passingYear", [...passingYears, ""]);
    setValue("gpaCgpa", [...gpaCgpas, 0]);
    setValue("outOf", [...outOfs, 0]);
  };

  const handleRemoveEducation = (
    indexToRemove: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent form submission

    setEducationList(
      educationList.filter((_, index) => index !== indexToRemove)
    );
    setValue(
      "degree",
      degrees.filter((_, index) => index !== indexToRemove)
    );
    setValue(
      "groupDepartment",
      groups.filter((_, index) => index !== indexToRemove)
    );
    setValue(
      "passingYear",
      passingYears.filter((_, index) => index !== indexToRemove)
    );
    setValue(
      "gpaCgpa",
      gpaCgpas.filter((_, index) => index !== indexToRemove)
    );
    setValue(
      "outOf",
      outOfs.filter((_, index) => index !== indexToRemove)
    );
  };
  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
    // alert("Please correct the errors in the form.");
  };

  return (
    <main className="container p-4 mt-16">
      <section className="my-8 w-full">
        <p className="text-brandPrimary text-3xl">
          {t("JobSeekerRegistrationForm")}
        </p>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="my-5 border border-brandLsPrimary rounded-lg w-full p-6">
            <div className="mt-4">
              <Title infoTitle="Personal Information" />
              <UserInformation />
            </div>
            <div className="mt-16">
              <Title infoTitle="Education" />
              <div className="mt-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-link hover:bg-linkHover min-w-fit">
                    <button className="p-2" onClick={handleAddEducation}>
                      <GoPlus className="text-white" size={18} />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <HiOutlineInformationCircle className="h-5 w-5 text-brandPrimary" />
                    <p>{t("addMoreDegreeByClickPlus")}</p>
                  </div>
                </div>
              </div>
              {educationList.map((_, index) => (
                <Education
                  key={index}
                  educationList={educationList}
                  onRemove={(event) => handleRemoveEducation(index, event)}
                  errors={errors}
                  register={register}
                  componentNo={index}
                />
              ))}
            </div>
            <Skill errors={errors} register={register} />
            <Job errors={errors} register={register} />
            <Achievment
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              errors={errors}
              register={register}
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
                  />
                  <div className="w-full">
                    <FileInput
                      selectedFile={selectedCV}
                      setSelectedFile={setSelectedCV}
                    />
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
      </section>
      <ToastContainer />
    </main>
  );
};

export default JobSeekerRegistration;
