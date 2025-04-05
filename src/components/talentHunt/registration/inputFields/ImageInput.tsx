"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { HiOutlineInformationCircle } from "react-icons/hi2";

// ========================= FILE INPUT TYPE DEFINITION ============================
interface IFiles {
  labelName: string;
  selectedImage: File | null; // Accept only one image
  setSelectedImage: (image: File | null) => void;
  defaultValue?: File; // Added defaultValue prop
  mandatory?: boolean;
  backendImage?: string;
  isBackendImageAvailable?: boolean;
}

const ImageInput: React.FC<IFiles> = ({
  labelName,
  selectedImage,
  setSelectedImage,
  mandatory = false,
}) => {
  // ============ STATE INITIALIZED TO STORE SINGLE FILE =============
  const [imageSrc, setImageSrc] = useState<string | null>();

  // ================= SELECT FILE FUNCTION ===================
  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0]; // Get only the first file
      // console.log(imageFile);
      setSelectedImage(imageFile);

      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  };

  // ===================== REMOVE FILE FUNCTION =======================
  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImageSrc(null);
  };

  return (
    <>
      <div className="md:mr-7">
        <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
          {labelName}{" "}
          <span className={`text-dangerPrimary ${mandatory ? "" : "hidden"}`}>
            *
          </span>
        </label>
        <div
          className={`mt-1 block  placeholder:text-[#cacaca] text-base border border-brandLsPrimary rounded w-full h-28`}
        >
          {!selectedImage ? (
            <div className="h-full flex items-center justify-center ">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 border border-brandPrimary rounded-full flex items-center justify-center">
                  <Image
                    src={"/assets/images/profile/inputImage.png"}
                    height={74}
                    width={44}
                    alt="upload image"
                    className="w-auto h-8"
                  />
                </div>

                {/* ====================== INPUT FIELD ================================ */}
                <div className="text-center">
                  <label className="text-link text-base font-normal hover:underline cursor-pointer">
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={selectFile} // Single file upload
                      className="outline-none"
                    />
                    Click here to select an image
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-evenly items-center h-full w-full p-2 gap-6">
              {/* ======================= EDIT SELECTED FILE ========================= */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <label htmlFor="editFile" className="cursor-pointer">
                      <MdEdit fontSize={24} />
                    </label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Change this file</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <input
                id="editFile"
                hidden
                accept="image/*"
                type="file"
                onChange={selectFile} // Single file upload
              />

              {/* ======================= DISPLAY SELECTED FILE ===================== */}
              {imageSrc && (
                <div className="flex justify-center items-center">
                  <Image
                    src={imageSrc}
                    alt={`Selected file ${labelName}`}
                    width={80}
                    height={80}
                    className="rounded"
                  />
                </div>
              )}

              {/* ===================== DELETE SELECTED FILE ======================= */}
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
                    <p>Delete this file</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>

        {/* ====================== FILE CRITERIA ======================= */}
        <div className="flex items-start lg:items-center gap-2 mt-3">
          <HiOutlineInformationCircle className="h-5 w-5 text-brandPrimary" />
          <div className="text-greyPrimary text-sm">
            Max image size:{" "}
            <span className="font-bold text-greyPrimary">5 MB</span>; Format:{" "}
            <span className="font-bold text-greyPrimary">PNG, JPG</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageInput;
