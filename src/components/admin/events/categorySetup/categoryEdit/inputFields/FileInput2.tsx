"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { MdDelete, MdEdit } from "react-icons/md";

interface IFiles {
  selectedImage: File | null;
  setSelectedImage: (image: File | null) => void;
  divHeight?: string;
  errors: FieldErrors<any>;
  register: UseFormRegister<any>;
  defaultImageUrl: string;
  attachment: any;
}

const FileInput: React.FC<IFiles> = ({
  selectedImage,
  setSelectedImage,
  divHeight = "h-[290px]",
  errors,
  register,
  attachment,
  defaultImageUrl,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  };

  const removeSelectedImage = () => {
    // console.log("delete");
    setSelectedImage(null);
    setImageSrc(null);
  };

  // console.log(attachment);
  // console.log(defaultImageUrl);
  return (
    <div>
      <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
        Category Image <span className="text-dangerPrimary">*</span>
      </label>
      <div
        className={`mt-1 block placeholder:text-[#cacaca] text-base border border-brandLsPrimary rounded w-full ${divHeight}`}
      >
        {attachment ? (
          //! =============== IF BACKEND IMAGE AVAILABLE ====================
          <div className="flex justify-evenly items-center h-full w-full p-2 gap-6">
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
              {...register("attachments")}
              onChange={selectFile}
            />

            {imageSrc ? (
              <div>
                <Image
                  src={imageSrc}
                  alt="Selected file"
                  width={300}
                  height={300}
                  className="rounded h-[200px]"
                />
              </div>
            ) : (
              <>
                <Image
                  src={defaultImageUrl}
                  alt="Selected file"
                  width={300}
                  height={300}
                  className="rounded h-[200px]"
                />
              </>
            )}

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
        ) : (
          <>
            {/* //! ===================== IF BACKEND IMAGE IS NULL ======================= */}
            <div className="flex justify-evenly items-center h-full w-full p-2 gap-6">
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
                {...register("attachments")}
                onChange={selectFile}
              />
              {imageSrc ? (
                <div>
                  {/* //! ============ IF DEFAULT IMAGE IS NULL, AND NEW IMAGE SELECTED =========== */}
                  <Image
                    src={imageSrc}
                    alt="Selected file"
                    width={300}
                    height={300}
                    className="rounded h-[200px]"
                  />
                </div>
              ) : (
                <>
                  {/* //! ======= IF DEFAULT IMAGE IS NULL, AND NO NEW IMAGE SELECTED ======== */}
                  <p>There is no image</p>
                </>
              )}

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
          </>
        )}
      </div>

      <div className="flex items-center gap-3 mt-3">
        <h1 className="text-[#444444] text-sm">
          Max image size: <span className="font-bold text-[#1C1C1C]">2 MB</span>
        </h1>
      </div>

      {errors.attachments && errors.attachments.message && (
        <p className="text-red-500 text-sm mt-1 px-6 block">
          {(errors.attachments as any).message}
        </p>
      )}
    </div>
  );
};

export default FileInput;
