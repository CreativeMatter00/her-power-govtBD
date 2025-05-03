"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ImageInput from "../EditCourse/inputField/ImageInput";
import TextInput from "../EditCourse/inputField/TextInput";
import axios from "axios";
import { getBranchList, url } from "../../../../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

interface FormValues {
  courseName: string;
  courseCategory: string;
  courseDescription: string;
  coursePrice: string;
  selectedBranches: Option[];
}

const AddNewCourse = () => {
  const t = useTranslations("course");
  const local = useLocale();
  const router = useRouter();
  const [selectThumbnailImage, setSelectedThumbnailImage] =
    useState<File | null>(null);
  const [selectBannerImage, setSelectedBannerImage] = useState<File | null>(
    null
  );
  const [courseDescription, setCourseDescription] = useState<string>("");

  const loginDetails = JSON.parse(localStorage.getItem("loginDetails") as any);
  const providorPid = loginDetails?.providor_pid;

  if (!providorPid) {
    // alert("Provider ID Not found, Login as a Course Provider First");
  }

  const {
    isLoading,
    error,
    data: courseBranches,
  } = useQuery({
    queryKey: ["courseBranches"],
    queryFn: () => getBranchList(providorPid),
  });

  const filteredBranches =
    courseBranches?.data?.map((branch: any) => ({
      label: branch.branch_name || `Branch ${branch.branch_id}`,
      value: branch.branch_pid,
    })) || [];

  const {
    handleSubmit,
    control,
    watch,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      courseName: "",
      courseDescription: "",
      coursePrice: "",
      selectedBranches: [],
    },
  });
  const [value, setBranchValue] = useState<Option[]>([]);

  const courseCategory = watch("courseCategory");

  const onSubmit = async (data: FormValues) => {
    if (!selectThumbnailImage || !selectBannerImage) {
      toast.error(
        "Please add both thumbnail and banner images before submitting.",
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
      return;
    }

    const formData = {
      category_pid: "C241000000001",
      providor_pid: loginDetails?.providor_pid,
      course_type: courseCategory,
      course_title: data.courseName,
      description: data.courseDescription,
      thumbnail: selectThumbnailImage,
      image: selectBannerImage,
      activation_type: "Draft",
      course_price: data.coursePrice,
      branch_id: data.selectedBranches.map((branch) => branch.value),
    };

    try {
      const response = await axios.post(`${url}/api/admin/course`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.meta?.status === true) {
        toast.success("Course Added successfully!", {
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
        setSelectedThumbnailImage(null);
        setSelectedBannerImage(null);
        setTimeout(() => {
          router.push(`/${local}/course/course-provider/courses`);
        }, 2000);
      }
    } catch (error) {
      toast.error("Failed to add the course. Please try again.", {
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
    <section className="bg-brandLsSecondary">
      <ToastContainer />
      <div className="container p-4">
        <h1 className="text-2xl text-[#252525]">{t("Add New Course Video")}</h1>
        <main className="lg:ml-8 mt-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 text-base"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 w-full">
              <div className="basis-full md:basis-1/2">
                <label className="font-normal text-brandDs">
                  {t("Course Name")} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("courseName", {
                    required: "Course name is required",
                  })}
                  className="block w-full py-2 px-4 rounded-full border border-brandLsPrimary outline-none mt-1 placeholder:text-[#CACACA]"
                  placeholder={t("Type Course name here")}
                />
                {errors.courseName && (
                  <p className="text-red-600">{errors.courseName.message}</p>
                )}
              </div>

              <div className="basis-full lg:basis-1/2">
                <label className="font-normal text-brandDs mb-1">
                  {t("Course Category")} <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="courseCategory"
                  control={control}
                  rules={{ required: "Course category is required" }}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder={t("Select a category")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Online">
                          {t("Online Course")}
                        </SelectItem>
                        <SelectItem value="Physical">
                          {t("Physical Course")}
                        </SelectItem>
                        <SelectItem value="Blended">
                          {t("Blended Course")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.courseCategory && (
                  <p className="text-red-600">
                    {errors.courseCategory.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              {courseCategory !== "Online" && courseCategory !== undefined && (
                <div className="flex w-full flex-col gap-2">
                  <label className="font-normal text-brandDs">
                    {t("Select Branches for the course")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="selectedBranches"
                    control={control}
                    rules={{ required: "Please select at least one branch" }}
                    render={({ field }) => (
                      <MultipleSelector
                        value={field.value || []}
                        onChange={(val) => field.onChange(val)}
                        defaultOptions={filteredBranches}
                        placeholder={t("Select branches")}
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            {t("no results found")}
                          </p>
                        }
                      />
                    )}
                  />
                  {errors.selectedBranches && (
                    <p className="text-red-600">
                      {errors.selectedBranches.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col lg:flex-row w-full gap-8">
              <div className="w-full lg:w-1/2">
                <TextInput
                  inputName="courseDescription"
                  setTextDescription={setCourseDescription}
                  labelName={t("Course Description")}
                  control={control}
                  errors={errors}
                  required={true}
                />
                {errors.courseDescription && (
                  <p className="text-red-600">
                    {errors.courseDescription.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-8 w-full lg:w-1/2">
                <div>
                  <label className="font-normal text-brandDs">
                    {t("Course Price")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("coursePrice", {
                      required: "Course price is required",
                      validate: (value) =>
                        parseFloat(value) >= 0 ||
                        "Course price must be a positive number",
                    })}
                    className="block w-full py-2 px-4 rounded-full border border-brandLsPrimary outline-none mt-1 placeholder:text-[#CACACA]"
                    type="number"
                    min="0"
                    placeholder={t("Enter Course Price here")}
                  />
                  {errors.coursePrice && (
                    <p className="text-red-600">{errors.coursePrice.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 w-full">
              <ImageInput
                selectedFile={selectThumbnailImage}
                setSelectedFile={setSelectedThumbnailImage}
                title="Thumbnail Image"
                inputName="thumbnailImage"
                required={true}
              />
              <ImageInput
                selectedFile={selectBannerImage}
                setSelectedFile={setSelectedBannerImage}
                title="Banner Image"
                inputName="bannerImage"
                required={true}
              />
            </div>
            <button
              type="submit"
              className="py-2 px-4 rounded-full bg-blue-500 text-white"
            >
              {t("Submit")}
            </button>
          </form>
        </main>
      </div>
    </section>
  );
};

export default AddNewCourse;
