"use client";
import { useEffect, useState } from "react";
import FileInput from "./inputFields/FileInput";
import InputField from "./inputFields/InputField";
import TextInput from "./inputFields/TextInput";
import styles from "@/styles/Events.module.css";
import { RxCross2 } from "react-icons/rx";
import { yupResolver } from "@hookform/resolvers/yup";
import CategorySchema from "./CategorySchema";
import { useForm } from "react-hook-form";
import axios from "axios";
import { api, url } from "../../../../../../api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/Reducer/MainSlice";
import ScaleLoader from "react-spinners/ScaleLoader";

// interface for form inputs
interface IFormInput {
  category_name: string;
  short_name: string;
  category_desc: string;
  parent_category_pid: string | null;
  active_status: boolean;
  attachments: File[];
}

interface CategoryEditProps {
  category: any | string | null; // category ID prop
  refetch: () => void; // refetch function after editing
  modalClose: any;
}

const CategoryEdit: React.FC<CategoryEditProps> = ({
  refetch,
  category,
  modalClose,
}) => {
  // console.log(category);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [categoryData, setCategoryData] = useState<IFormInput | null>(null);

  // ================ RESOLVER ====================
  const resolver = yupResolver(CategorySchema);

  // ======================== USE FORM ========================
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  //   setValue,
  // } = useForm<IFormInput>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({});

  // console.log(categoryData);
  // console.log(category);

  // ================== FORM SUBMIT ==================
  const onSubmit = async (data: IFormInput) => {
    setImageError(null);
    setIsLoading(true);

    // Prepare form data
    const formData = new FormData();
    formData.append("category_name", data.category_name);
    formData.append("short_name", data.short_name);
    formData.append("category_desc", data.category_desc);
    formData.append("parent_category_pid", data.parent_category_pid || "");
    formData.append("active_status", isActive ? "1" : "0"); // Convert boolean to '1' or '0'

    // Append files
    selectedImages.forEach((file) => {
      formData.append("attachments", file);
    });

    try {
      const response = await api.post(
        `/api/admin/category/${category.category_pid}?_method=PUT`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Response from backend:", response.data);
      // alert("Category updated successfully");
      reset();
      refetch();
      modalClose(); /// close the modal
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
      setIsLoading(false);
    }
  };
  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  // const isSubmitDisabled = selectedImages.length === 0;

  return (
    <>
      <section className="w-full">
        <main className={` ${styles.CategoryEditShadow} rounded-2xl`}>
          <div className="">
            {/* ========================== HEADING PART ======================= */}
            <div className="border-b border-[#989898]">
              <div className="mx-12 my-4 flex justify-between items-center">
                <h1 className="text-xl text-[#1C1C1C] font-bold">
                  Edit Category
                </h1>
                {/* <RxCross2 className="h-8 w-8 cursor-pointer" /> */}
              </div>
            </div>
            {/* ===================== FORM PART ========================= */}
            <div className="mx-12 mt-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <div className="flex items-start gap-6">
                  {/* =========================== LEFT SIDE ======================== */}
                  <div className="basis-1/2 flex flex-col gap-4">
                    <InputField
                      register={register}
                      errors={errors}
                      defaultValue={category?.category_name}
                    />
                    <TextInput
                      register={register}
                      errors={errors}
                      defaultValue={category?.category_desc}
                    />
                  </div>
                  {/* ===================== RIGHT SIDE ========================== */}
                  <div className="basis-1/2 flex flex-col gap-4">
                    <div>
                      <FileInput
                        selectedImages={selectedImages}
                        setSelectedImages={setSelectedImages}
                        image_url={category?.file_url}
                      />
                      {imageError && (
                        <p className="text-red-500 text-sm mt-1">
                          {imageError}
                        </p>
                      )}
                      {
                        <p className="text-red-500 text-sm mt-1">
                          {imageError}
                        </p>
                      }
                    </div>
                    {/* ========================= IS ACTIVE ========================== */}
                    <div className="mt-4 w-full">
                      <div className="bg-[#F2F2F2]">
                        <div className="p-3 flex">
                          <button
                            type="button"
                            onClick={() => setIsActive(true)}
                            className={`${
                              isActive
                                ? "bg-link text-[#FFFFFF]"
                                : "text-[#646464]"
                            } text-base w-1/2 rounded py-3`}
                          >
                            Active
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsActive(false)}
                            className={`${
                              isActive === false
                                ? "bg-link text-[#FFFFFF]"
                                : "text-[#646464]"
                            } text-base w-1/2 rounded py-3`}
                          >
                            Inactive
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ======================== SUBMIT FORM =================== */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    // disabled={isSubmitDisabled}
                    className={`bg-success text-bgPrimary text-sm font-medium px-8 py-3 rounded-sm`}
                  >
                    Edit Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default CategoryEdit;
