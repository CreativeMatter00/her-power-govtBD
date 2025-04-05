"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BsInfoCircle } from "react-icons/bs";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { useTranslations } from "next-intl";

interface IFiles {
  selectedImage: File | null;
  setSelectedImage: (image: File | null) => void;
  divHeight?: string;
  errors: FieldErrors<any>;
  register: UseFormRegister<any>;
}

const FileInput: React.FC<IFiles> = ({
  selectedImage,
  setSelectedImage,
  divHeight = "h-[100px]",
  errors,
  register,
}) => {
  const t = useTranslations("ImagePart");
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    setSelectedImage(null);
    setImageSrc(null);
  };

  return (
    <div>
      <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
        {t("Thumbnail")} {t("Image")} <span className="text-dangerPrimary">*</span>
      </label>
      <div
        className={`mt-1 block placeholder:text-[#cacaca] text-base border border-brandLsPrimary rounded w-full ${divHeight}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} {...register("thumbnail")} />
        {!selectedImage ? (
          <div className="flex justify-center items-center w-full h-full gap-4">
            <Image
              src="/assets/images/profile/inputImage.png"
              width={74}
              height={45}
              alt="input file"
              className="w-auto h-11"
            />
            <div className="text-center text-brandPrimary text-sm">
              <p>{t("Drag your image here")}</p>
              <p>
                {t("or")} &nbsp;
                <label className="text-link text-base font-normal hover:underline cursor-pointer">
                  {t("Upload an Image")}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-evenly items-center h-full w-full p-2 gap-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <label htmlFor="editFile" className="cursor-pointer">
                    <MdEdit fontSize={24} />
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("Change this image")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <input
              id="editFile"
              hidden
              accept="image/*"
              type="file"
              onChange={handleFileChange}
            />

            {imageSrc && (
              <div>
                <Image
                  src={imageSrc}
                  alt="Selected file"
                  width={300}
                  height={100}
                  className="rounded h-20 w-auto"
                />
              </div>
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
                  <p>{t("Delete this image")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        <div className="flex gap-2 items-center text-greyPrimary text-xs p-1">
          <BsInfoCircle className="text-black" size={15} />
          {t("Thumbnail")} {t("size")}:<span className="font-medium">1024px X 350px</span>; {t("Format:")}<span className="font-bold">{t("JPG,PNG")}</span>
        </div>
      </div>
      {errors.thumbnail && errors.thumbnail.message && (
        <p className="text-red-500 text-sm mt-6 px-3 block">
          {(errors.thumbnail as any).message}
        </p>
      )}
    </div>
  );
};

export default FileInput;