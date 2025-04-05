"use client";
import { useState } from "react";
import InputField from "./inputFields/InputField";
import TextInput from "./inputFields/TextInput";
import styles from "@/styles/Events.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import CategorySchema from "./CategorySchema";
import { url } from "@/api/api";
import FileInput from "./inputFields/FileInput";
import { toast, ToastContainer } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";

interface IFormInput {
  category_name: string;
  category_desc?: string;
  active_status?: boolean;
  remarks?: string;
  attachments?: FileList;
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
  const [selectedImages, setSelectedImages] = useState<File | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  // ================ RESOLVER ====================
  const resolver = yupResolver(CategorySchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
  } = useForm<IFormInput>({ resolver });

  // ================== FORM SUBMIT ==================
  const onSubmit = async (data: IFormInput) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("category_name", data.category_name);
    if (data?.category_desc) {
      formData.append("category_desc", data.category_desc);
    }
    formData.append("active_status", isActive ? "1" : "0");

    if (selectedImages) {
      const fileList = createFileList([selectedImages]);
      formData.append("attachments", fileList[0]);
    }

    const printFormData = (formData: FormData) => {
      formData.forEach((value, key) => {
        // if (value instanceof File) {
        //   console.log(`${key}: File - ${value.name}`);
        // } else {
        //   console.log(`${key}: ${value}`);
        // }
      });
    };

    printFormData(formData);

    try {
      const response = await axios.post(
        `${url}/api/admin/ew-category/${category.category_pid}?_method=PUT`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);
      // alert("Category updated successfully");
      reset();
      refetch();
      modalClose();
      if (response?.data?.meta?.status === true) {
        // ? Add to cart toast notification
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
      setIsLoading(false);
    }
  };

  const createFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  };

  const handleImageChange = (file: File | null) => {
    setSelectedImages(file);
    const fileList = file ? createFileList([file]) : new DataTransfer().files;
    setValue("attachments", fileList);
    trigger("attachments");
  };

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <>
      <section className="w-full">
        <ToastContainer />
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
                      labelName="Category Name"
                      inputName="category_name"
                      isOptinal={true}
                    />
                    <TextInput
                      register={register}
                      errors={errors}
                      descriptionDefaultValue={category?.category_desc}
                    />
                  </div>
                  {/* ===================== RIGHT SIDE ========================== */}
                  <div className="basis-1/2 flex flex-col gap-4">
                    <div>
                      <FileInput
                        selectedImage={selectedImages}
                        setSelectedImage={handleImageChange}
                        divHeight="h-[290px]"
                        errors={errors}
                        // defaultImageUrl={category?.attachment[0]?.file_url}
                        defaultImageUrl={category?.category_file_url}
                        register={register}
                        // attachment={category?.attachment}
                        attachment={category?.category_file_url}
                      />
                    </div>
                    <InputField
                      register={register}
                      errors={errors}
                      // defaultValue={category?.remarks}
                      labelName="Remarks"
                      inputName="remarks"
                      isOptinal={true}
                    />
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
                    className={`bg-success text-bgPrimary text-sm font-medium px-8 py-3 rounded-sm`}
                  >
                    Edit Event Category
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
