"use client";
import { FC, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/Reducer/MainSlice";

import { api } from "@/api/api";
import ImageInput from "@/components/shared/input/ImageInput";
import InputField from "@/components/shared/input/InputField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SponsorSchema from "./SponsorSchema";
// import Image from "next/image";

interface IFormInput {
  sponsorName: string;
  contractPerson: string;
  address: string;
  contactEmail: string;
  sponsorDescription: string;
  contactPhone: number;
  imageFile?: string;
}

interface IEditProps {
  setEditModalOpen: Function;
  refetch: any;
  editData: any;
}

const EditSponsor: FC<IEditProps> = ({
  setEditModalOpen,
  refetch,
  editData,
}) => {
  // console.log("editData", editData);
  const [selectedImages, setSelectedImages] = useState<any>();
  // console.log("🚀 ~ selectedImages:", selectedImages);
  // const [imageError, setImageError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  // ================ RESOLVER ====================
  const resolver = yupResolver(SponsorSchema);

  // ======================== USE FORM ========================
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ resolver });

  // ================== FORM SUBMIT ==================
  const onSubmit = async (data: IFormInput) => {
    // console.log(data);
    // alert(JSON.stringify(data));

    const sponsorData = new FormData();
    sponsorData.append("sponsor_name", data.sponsorName);
    sponsorData.append("contract_persone", data.contractPerson);
    sponsorData.append("address_line", data.address);
    sponsorData.append("contact_email", data.contactEmail);
    sponsorData.append("description", data.sponsorDescription);
    sponsorData.append("contact_phone", data.contactPhone.toString()); // Convert to string if necessary

    // const sponsorData = {
    // 	sponsor_name: data.sponsorName,
    // 	// contract_person:data.contractPerson
    // 	description: data.sponsorDescription,
    // 	contact_phone: data.contactPhone,
    // 	sponsor_image: selectedImages,
    // };

    // if (selectedFiles && selectedFiles[0]) {
    // 	newsData.append("attachments", selectedFiles[0]); // Attach the file
    // }
    //  else {
    // 	console.warn("No files selected");
    // }
    if (selectedImages?.length > 0) {
      sponsorData.append(`sponsor_image`, selectedImages[0]);
    }

    // const printFormData = (formData: FormData) => {
    // 	formData.forEach((value, key) => {
    // 		if (value instanceof File) {
    // 			console.log(`${key}: File - ${value.name}`);
    // 		} else {
    // 			console.log(`${key}: ${value}`);
    // 		}
    // 	});
    // };

    // printFormData(sponsorData);

    try {
      const response = await api.post(
        `/api/admin/event/sponsor-update/${editData.sponsor_pid}`,
        sponsorData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("API Response:", response.data);

      if (response?.data?.meta?.status === true) {
        // ? Add to cart toast notification
        toast.success("Sponsor added successfully!", {
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
        reset();
        setEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong", {
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

    setEditModalOpen(false);
  };

  return (
    <>
      <section className="w-full">
        <main className={`rounded-2xl`}>
          <div className={`p-2`}>
            {/* ========================== HEADING PART ======================= */}
            <div className="border-b border-[#989898]">
              <div className="mx-12 my-4 flex justify-between items-center">
                <h1 className="text-xl text-[#1C1C1C] font-bold">
                  Edit Sponsor
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
                    <InputField
                      type="text"
                      register={register}
                      errors={errors}
                      labelName="Sponsor Name"
                      inputName="sponsorName"
                      defaultValue={editData.sponsor_name}
                      placeholderText="Enter Sponsor Name"
                      mandatory={true}
                    />
                    <InputField
                      type="text"
                      register={register}
                      errors={errors}
                      labelName="Contact Person Name"
                      inputName="contractPerson"
                      defaultValue={editData.contract_persone}
                      placeholderText="Enter Contract Person Name"
                      mandatory={true}
                    />
                    <InputField
                      type="tel"
                      register={register}
                      errors={errors}
                      labelName="Contact Number"
                      inputName="contactPhone"
                      defaultValue={editData.contact_phone}
                      placeholderText="Enter Contact number"
                      mandatory={true}
                    />
                    <div>
                      <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
                        Sponsor Description
                        <span
                          className={`text-dangerPrimary
                          }`}
                        >
                          *
                        </span>
                      </label>

                      <textarea
                        rows={13}
                        cols={10}
                        placeholder="News Descriptions"
                        defaultValue={editData.description}
                        className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded w-full"
                        {...register("sponsorDescription")}
                      />
                      {errors.sponsorDescription && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.sponsorDescription?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* ===================== RIGHT SIDE ========================== */}
                  <div className="basis-1/2 flex flex-col gap-4">
                    {" "}
                    <InputField
                      type="email"
                      register={register}
                      errors={errors}
                      labelName="Contact Email"
                      inputName="contactEmail"
                      defaultValue={editData.contact_email}
                      placeholderText="Enter Contact Email"
                      mandatory={true}
                    />
                    <InputField
                      type="text"
                      register={register}
                      errors={errors}
                      labelName="Address"
                      inputName="address"
                      defaultValue={editData.address_line}
                      placeholderText="Enter Address"
                      mandatory={true}
                    />
                    <div>
                      {/* <Image
                        src={editData?.sponsor_image}
                        height={74}
                        width={44}
                        alt="upload image"
                        className="w-auto h-11 z-50"
                      /> */}

                      <ImageInput
                        labelName="Sponsor Image"
                        selectedImages={selectedImages}
                        setSelectedImages={setSelectedImages}
                        isBackendImageAvailable={true}
                        backendImage={editData.sponsor_image}
                      />
                    </div>
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
                    className="bg-success text-bgPrimary text-sm font-medium px-8 py-3 rounded-sm"
                  >
                    Update Sponsor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
        <ToastContainer />
      </section>
    </>
  );
};

export default EditSponsor;
