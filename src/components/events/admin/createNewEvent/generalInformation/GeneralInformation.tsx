"use client";

import { useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

import CreateEventHeading from "../CreateEventHeading";
import CreateEventInputField from "../inputFields/CreateEventInputField";
import SelectInput from "./SelectInput";
import ImageInput from "../inputFields/ImageInput";
import {  useFormContext } from "react-hook-form";
import TextInput from "../inputFields/TextInput";
import { useQuery } from "@tanstack/react-query";
import { getAllEventCategories } from "../../../../../api/api";
import ScaleLoader from "react-spinners/ScaleLoader";

interface IGeneralInfoProps {
  onUpdate: any;
}

const GeneralInformation = () => {
  const [selectedBanner, setSelectedBanner] = useState<any>();
  const [textDescription, setTextDescription] = useState<string>("");
  const [selectedThumbnail, setSelectedThumbnail] = useState<any>();
  const [isFeaturedEvent, setIsFeaturedEvent] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    control,
  } = useFormContext();

  const {
    isLoading,
    error,
    data: allEventCategories,
  } = useQuery({
    queryKey: ["allEventCategories"],
    queryFn: () => getAllEventCategories(),
  });
  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <>
      <section className="mt-2 mb-6">
        <CreateEventHeading heading="General Information" />
        <main className="mt-4 w-full">
          <div className="flex flex-col gap-6 w-full">
            <CreateEventInputField
              inputType="text"
              placeholderText="Enter title here..."
              label="Event Title"
              name="eventTitle"
              errors={errors}
              register={register}
              required={true}
            />

            <div className="grid grid-cols-2 gap-6">
              <div>
                <SelectInput
                  allData={allEventCategories}
                  labelName="Category"
                  inputName="eventCategory"
                  register={register}
                  placeholderText="Select Category"
                  filedWidth="w-1/2 max-lg:w-full"
                  required={true}
                />
                {errors?.eventCategory && (
                  <p className="text-sm text-red-500">
                    {String(errors.eventCategory?.message)}
                  </p>
                )}
              </div>

              <div className="h-full flex items-end pb-1">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsFeaturedEvent(!isFeaturedEvent);
                      setValue("featuredOrNot", !isFeaturedEvent);
                    }}
                    className="flex items-center gap-2"
                  >
                    {isFeaturedEvent ? (
                      <MdCheckBox className="text-brandPrimary w-5 h-5" />
                    ) : (
                      <MdCheckBoxOutlineBlank className="text-brandPrimary w-5 h-5" />
                    )}
                    <p className="text-brandPrimary text-sm">Featured Event</p>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex max-lg:flex-col justify-between items-start gap-6">
              <div className="w-full flex flex-col gap-2">
                <ImageInput
                  title="Event Banner"
                  selectedFile={selectedBanner}
                  setSelectedFile={setSelectedBanner}
                 control={control} // Pass the register function
                  inputName="eventBanner"
                  required={true} // The name to register the file input
                />

                <div className="flex items-center max-md:items-start gap-2">
                  <HiOutlineInformationCircle className="text-brandPrimary w-4 h-4" />
                  <p className="text-sm text-greyPrimary">
                    Banner size:
                    <span className="font-bold">&nbsp;1024px X 350px</span>;
                    Format:
                    <span className="font-bold">&nbsp;JPG</span>,
                    <span className="font-bold">&nbsp;PNG</span>
                  </p>
                </div>
                {errors?.eventBanner && (
              <p className="text-sm text-red-500">
                {String(errors.eventBanner?.message)}
              </p>
            )}
              </div>

              <div className="w-full flex flex-col gap-2">
                <ImageInput
                  title="Event Thumbnail"
                  selectedFile={selectedThumbnail}
                  setSelectedFile={setSelectedThumbnail}
                 control={control} // Add this line if needed
                  inputName="thumbnail"
                  required={true} // Set the appropriate input name for your form
                />

                <div className="flex items-center max-md:items-start gap-2">
                  <HiOutlineInformationCircle className="text-brandPrimary w-4 h-4" />
                  <p className="text-sm text-greyPrimary">
                    Banner size:
                    <span className="font-bold">&nbsp;1024px X 350px</span>;
                    Format:
                    <span className="font-bold">&nbsp;JPG</span>,
                    <span className="font-bold">&nbsp;PNG</span>
                  </p>
                </div>
                {errors?.thumbnail && (
              <p className="text-sm text-red-500">
                {String(errors.thumbnail?.message)}
              </p>
            )}
              </div>
            </div>
            <TextInput
              setTextDescription={setTextDescription}
              errors={errors}
              control={control}
              labelName="Description/ Event Summary"
              inputName="description"
              required={true}
            />
          </div>
        </main>
      </section>
    </>
  );
};

export default GeneralInformation;
