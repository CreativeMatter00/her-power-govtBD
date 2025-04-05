"use client";

import Image from "next/image";

import { MdDelete, MdEdit } from "react-icons/md";
import React, { ChangeEvent } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

// ----------------------- FOR INPUT IMAGE INFO ------------------
interface ImageInfo {
  id: string;
  labelName: string;
  selectedImage: File | null;
  setSelectedImage: (image: File | null) => void;
  required?: boolean;
}
const DocImageInput: React.FC<ImageInfo> = ({
  id,
  labelName,
  selectedImage,
  setSelectedImage,
  required,
}) => {
  const t = useTranslations("talentHunt");

  // ------------------- FOR TAKING INPUT IMAGE ---------------
  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // ------------------------ FOR REMOVING IMAGE --------------------
  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  // console.log("image", selectedImage);

  return (
    <>
      <div className="h-full flex flex-col gap-2">
        <label className="text-brandPrimary font-normal text-sm pl-6">
          {labelName}  {required && <span className="text-red-500">*</span>}
        </label>
        <div className="h-full border border-[#EEDDF5] rounded-lg bg-white">
          {!selectedImage ? (
            <div className="flex justify-center items-center h-full w-full p-8 gap-4">
              <Image
                src="/assets/images/profile/inputImage.png"
                width={74}
                height={45}
                alt="input file"
                className="w-auto h-11"
              />
              <div className="text-center text-brandPrimary text-sm">
                {/* <p>Drag your profile images here</p> */}
                <div>
                  {/* or &nbsp; */}
                  <label className="text-link text-base font-normal hover:underline cursor-pointer">
                    {/* ---------------- FOR TAKING IMAGE INPUT ---------------- */}
                    <input
                      id={id}
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={imageChange}
                    />
                    {t("Click_here_to_select_images")}
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full w-full p-2 gap-6">
              {/* ---------------------- IMAGE EDIT BUTTON -------------------- */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <label
                      htmlFor={`editImage-${id}`}
                      className="cursor-pointer"
                    >
                      <MdEdit fontSize={24} />
                    </label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("Change_this_image")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* ----------------- FOR TAKING INPUT IMAGE ---------------------- */}
              <input
                id={`editImage-${id}`}
                hidden
                accept="image/*"
                type="file"
                onChange={imageChange}
              />

              <Image
                src={URL.createObjectURL(selectedImage)}
                width={300}
                height={300}
                alt="Selected file"
                className="w-auto h-28 max-w-56"
              />

              {/* ----------------- IMAGE REMOVING BUTTON ---------------------- */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={removeSelectedImage}
                      className="cursor-pointer"
                    >
                      <MdDelete fontSize={24} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("Delete_this_image")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DocImageInput;
