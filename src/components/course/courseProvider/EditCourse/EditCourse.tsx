"use client";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput from "./inputField/TextInput";
import ImageInput from "./inputField/ImageInput";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBranchList, getCourseDetail, url } from "@/api/api";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/shared/input/Input";
import SelectField from "@/components/shared/input/SelectField";
import { useTranslations } from "next-intl";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";


interface FormValues {
  course_title: string;
  course_type: string;
  description?: string;
  selectedBranches?:Option[];
  course_price: number;
}

const EditCourse = () => {
  const t=useTranslations("course")
  const [selectThumbnailImage, setSelectedThumbnailImage] =
    useState<File | null>(null);
  const [selectBannerImage, setSelectedBannerImage] = useState<File | null>(
    null
  );
  const cookies = useCookies();
  const providerPid = cookies.get('providor_pid');
  const [description, setCourseDescription] = useState<string>("");
  const param = useParams();
  const id = param.id as string;
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  // =========== DATA FETCHING =========
  const { isLoading, data: courseDetails, error } = useQuery({
    queryKey: ["getCourseDetail", id],
    queryFn: () => getCourseDetail(id),
  });

const {
    isLoading:courseBranchesLoading,
    error:courseBranchesError,
    data: courseBranches,
  } = useQuery({
    queryKey: ["courseBranches"],
    queryFn: () => getBranchList(`${providerPid}`),
  });

  const filteredBranches =
    courseBranches?.data?.map((branch: any) => ({
      label: branch.branch_name || `Branch ${branch.branch_id}`,
      value: branch.branch_pid,
    })) || [];

    const schema = Yup.object().shape({
      course_type: Yup.string().required('Course type is required'),
      course_title: Yup.string().required('Course title is required'),
      selectedBranches: Yup.array().when("course_type", {
        is: (type: string) => type === 'Physical' || type === 'Blended',
        then: () => Yup.array().min(1, "At least one branch is required for non-online courses"),
        otherwise: (schema) => schema.nullable().notRequired(),
      }),
      description: Yup.string().required('Course description is required'),
      thumbnail: Yup.mixed().required('Thumbnail is required'),
      image: Yup.mixed().required('Banner image is required'),
      course_price: Yup.number().required('Course price is required'),
    });

  const { control, handleSubmit, register, reset, formState: { errors }, watch } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const courseCategory = watch("course_type");
  useEffect(() => {
    if (courseDetails) {
      const filterData = {
        course_title: courseDetails.data.course_title,
        course_type: courseDetails.data.course_type,
        description: courseDetails?.data?.description,
        course_price: courseDetails?.data?.course_price,
        thumbnail: courseDetails?.data?.thumbnail,
        image: courseDetails?.data?.banner,
        selectedBranches: courseDetails?.data?.branch_id ||[]
      }
      reset(filterData);
    }
  }, [courseDetails, reset])


  const onSubmit = async (data: any) => {
    const formData = new FormData();
    const bId=data?.selectedBranches?.map((branch:any) => branch.value);
    formData.append("category_pid", "C241000000001");
    formData.append("providor_pid", providerPid as string);
    formData.append("course_title", data.course_title);
    formData.append("course_type", data.course_type);
    formData.append("course_price", String(data.course_price));
    formData.append("description", description);
    if(bId){
      formData.append("branch_id", bId);
    }
    if (selectThumbnailImage) {
      formData.append("thumbnail", selectThumbnailImage);
    }

    if (selectBannerImage) {
      formData.append("image", selectBannerImage);
    }

    try {
      const response = await axios.post(`${url}/api/admin/course/${id}?_method=put`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(response);

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
        setSelectedThumbnailImage(null); 
        setSelectedBannerImage(null);
        router.push(redirect as string)
      }
      else {
        toast.error("Form submit failed!", {
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
    }
  };


  const onError = (err: any) => {
    console.log(err)
  }

  return (
    <section className="bg-brandLsSecondary">
      <div className="container p-4">
        <h1 className="text-2xl text-[#252525]">{t("Edit Course")}</h1>
        <main className="lg:ml-8 mt-4">
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col gap-8 text-base"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <Input
                inputType="text"
                labelName={t("Course Name")}
                placeholderText={t("Type Course name here")}
                inputName="course_title"
                register={register}
                errors={errors}
                required={true}
              />

              <SelectField
                label={t("Course Category")}
                name="course_type"
                control={control}
                options={[
                  { value: 'Online', label: t(`Online Course`) },
                  { value: 'Physical', label: t('Physical Course') },
                  { value: 'Blended', label: t('Blended Course') },
                ]}
                rules={{ required: 'Course category is required' }}
                errorMessage={errors.course_type?.message}
                placeholder={t("Select a category")}
              />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <TextInput
                inputName="description"
                setTextDescription={setCourseDescription}
                labelName={t("Course Description")}
                control={control}
                errors={errors}
                required={true}
              />
              <Input
                inputType="number"
                labelName={t("Course Price")}
                placeholderText={t("Enter Course Price here")}
                inputName="course_price"
                register={register}
                errors={errors}
                required={true}
              />
            </div>
            <div className="flex items-center justify-center gap-6 w-full">
              <ImageInput
                selectedFile={selectThumbnailImage}
                setSelectedFile={setSelectedThumbnailImage}
                title={"Thumbnail Image"}
                inputName="thumbnail"
                imageUrl={courseDetails?.data?.thumbnail}
                required={true}
              />
              <ImageInput
                selectedFile={selectBannerImage}
                setSelectedFile={setSelectedBannerImage}
                title={"Banner Image"}
                inputName="image"
                imageUrl={courseDetails?.data?.banner}
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
      <ToastContainer />
    </section>
  );
};

export default EditCourse;




