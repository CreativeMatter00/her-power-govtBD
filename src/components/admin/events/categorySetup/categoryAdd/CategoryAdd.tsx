"use client";
import { api } from "@/api/api";
import styles from "@/styles/Events.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ScaleLoader from "react-spinners/ScaleLoader";
import CategorySchema from "./CategorySchema";
import FileInput from "./inputFields/FileInput";
import InputField from "./inputFields/InputField";
import TextInput from "./inputFields/TextInput";

interface IFormInput {
  category_name: string;
  category_desc?: string;
  remarks?: string;
  attachments?: FileList;
}

const CategoryAdd = ({ refetch, modalClose }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const resolver = yupResolver(CategorySchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
  } = useForm<IFormInput>({ resolver });

  const onSubmit = async (data: IFormInput) => {
    // console.log(data);

    const formData = new FormData();
    formData.append("category_name", data.category_name);
    if (data.category_desc) {
      formData.append("category_desc", data.category_desc);
    }
    if (data.remarks) {
      formData.append("remarks", data?.remarks);
    }

    if (selectedImage) {
      const fileList = createFileList([selectedImage]);
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
      await api.post(`/api/admin/ew-category`, formData);
      // alert("Submitted successfully");
      refetch();

      reset({
        category_name: "",
        category_desc: "",
        remarks: "",
        attachments: undefined,
      });
      modalClose();
      setSelectedImage(null);
    } catch (error) {
      console.log("error", error);
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
    setSelectedImage(file);
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
        <main className={` ${styles.CategoryAddShadow} rounded-2xl`}>
          <div>
            <div className="border-b border-[#989898]">
              <div className="mx-12 my-4 flex justify-between items-center">
                <h1 className="text-xl text-[#1C1C1C] font-bold">
                  Add new category
                </h1>
              </div>
            </div>
            <div className="mx-12 my-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <div className="flex items-start gap-6">
                  <div className="basis-1/2 flex flex-col gap-4">
                    <InputField
                      register={register}
                      errors={errors}
                      labelName="Category Name"
                      inputName="category_name"
                      isOptinal={true}
                    />
                    <TextInput register={register} errors={errors} />
                  </div>
                  <div className="basis-1/2 flex flex-col gap-4">
                    <FileInput
                      selectedImage={selectedImage}
                      setSelectedImage={handleImageChange}
                      divHeight="h-[290px]"
                      errors={errors}
                      register={register}
                    />
                    <InputField
                      register={register}
                      errors={errors}
                      labelName="Remarks"
                      isOptinal={false}
                      inputName="remarks"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-success text-bgPrimary text-sm font-medium px-8 py-3 rounded-sm"
                  >
                    Add Event Category
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
