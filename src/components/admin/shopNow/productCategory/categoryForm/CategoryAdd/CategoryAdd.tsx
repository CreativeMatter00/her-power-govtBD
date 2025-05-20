"use client";
import { useState } from "react";
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
import ScaleLoader from "react-spinners/ScaleLoader";

interface IFormInput {
  categoryName: string;
  categoryDescription: string;
  isActive?: boolean;
  refetch?: Function;
  modalClose?: any;
}

const CategoryAdd = ({ refetch, modalClose }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [categoryData, setCategoryData] = useState<IFormInput>({
    categoryName: "",
    categoryDescription: "",
    isActive: true,
  });

  // ================ RESOLVER ====================
  const resolver = yupResolver(CategorySchema);

  // ======================== USE FORM ========================
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ resolver });

  // ================== FORM SUBMIT ==================
  const onSubmit = async (data: IFormInput) => {
    if (selectedImages?.length === 0) {
      setImageError("Image is required");
      // setIsDisable(false);
      return;
    }
    setImageError(null);
    // setIsDisable(true);

    // console.log(data);
    const updatedData = { ...data, isActive, categoryImages: selectedImages };
    setCategoryData(updatedData);
    // console.log(updatedData);

    const formattedData = {
      ud_serialno: 1,
      category_name: updatedData.categoryName,
      short_name: updatedData.categoryName,
      category_desc: updatedData.categoryDescription,
    };

    try {
      const response = await api.post(
        `${url}/api/admin/category`,
        formattedData,
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("response from backend: ", response.data);
      // alert("Submitted successfully");
      refetch();
      reset();
      modalClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error: ", error.response?.data);
        // alert(
        //   `Error: ${error.response?.data.message || "Something went wrong"}`
        // );
      } else {
        console.error("Error during form submission", error);
        // alert("Unexpected error during submitting the form");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitDisabled = selectedImages?.length === 0;

  // console.log(categoryData);

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <>
      <section className="w-full">
        <main className={` ${styles.CategoryAddShadow} rounded-2xl`}>
          <div>
            {/* ========================== HEADING PART ======================= */}
            <div className="border-b border-[#989898]">
              <div className="mx-12 my-4 flex justify-between items-center">
                <h1 className="text-xl text-[#1C1C1C] font-bold">
                  Add new category
                </h1>
                {/* <RxCross2 className="h-8 w-8 cursor-pointer" /> */}
              </div>
            </div>
            {/* ===================== FORM PART ========================= */}
            <div className="mx-12 my-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <div className="flex items-start gap-6">
                  {/* =========================== LEFT SIDE ======================== */}
                  <div className="basis-1/2 flex flex-col gap-4">
                    <InputField register={register} errors={errors} />
                    <TextInput register={register} errors={errors} />
                  </div>
                  {/* ===================== RIGHT SIDE ========================== */}
                  <div className="basis-1/2 flex flex-col gap-4    ">
                    {" "}
                    <div>
                      <FileInput
                        selectedImages={selectedImages}
                        setSelectedImages={setSelectedImages}
                      />
                      {imageError && (
                        <p className="text-red-500 text-sm mt-1">
                          {imageError}
                        </p>
                      )}
                    </div>
                    {/* ========================= IS ACTIVE ========================== */}
                    {/* <div className="mt-4 w-full">
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
                    </div> */}
                  </div>
                </div>

                {/* ======================== SUBMIT FORM =================== */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className={`bg-success text-bgPrimary text-sm font-medium px-8 py-3 rounded-sm ${
                      isSubmitDisabled ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    Add Category
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

export default CategoryAdd;
