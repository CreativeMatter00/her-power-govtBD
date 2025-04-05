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
  selectedImages: File[];
  setSelectedImages: (images: File[]) => void;
  divHeight?: string;
  errors: FieldErrors<any>;
  register: UseFormRegister<any>;
}

const FileInput: React.FC<IFiles> = ({
  selectedImages,
  setSelectedImages,
  divHeight = "h-[100px]",
  errors,
  register,
}) => {
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
const t = useTranslations("resources_Library");
  const onDrop = (acceptedFiles: File[]) => {
    setSelectedImages(acceptedFiles);
    const newImageSrcs: string[] = [];
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        newImageSrcs.push(reader.result as string);
        if (newImageSrcs.length === acceptedFiles.length) {
          setImageSrcs(newImageSrcs);
        }
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: true,
  });

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages(files);
    const newImageSrcs: string[] = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        newImageSrcs.push(reader.result as string);
        if (newImageSrcs.length === files.length) {
          setImageSrcs(newImageSrcs);
        }
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    });
  };

  const removeSelectedImage = (index: number) => {
    const newSelectedImages = selectedImages.filter((_, i) => i !== index);
    const newImageSrcs = imageSrcs.filter((_, i) => i !== index);
    setSelectedImages(newSelectedImages);
    setImageSrcs(newImageSrcs);
  };

  const truncateFileName = (name: string, maxLength: number) => {
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
  };

  return (
    <div>
      <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
        {t("Files")} <span className="text-dangerPrimary">*</span>
      </label>
      <div
        className={`my-1 block placeholder:text-[#cacaca] text-base border border-brandLsPrimary rounded w-full min-h-[120px]`}
        {...getRootProps()}
      >
        <input {...getInputProps()} {...register("doc")} />
        {!selectedImages.length ? (
          <div className="flex justify-center items-center w-full min-h-[120px] gap-4">
            <Image
              src="/assets/images/resource/Images/pdfImg.png"
              width={80}
              height={100}
              className="w-auto h-11"
              alt="input file"
            />
            <div className="text-center text-brandPrimary text-sm">
              <p>{t("Drag your files here")}</p>
              <p>
                {t("or")} &nbsp;
                <label htmlFor="uploadFile" className="text-link text-base font-normal hover:underline cursor-pointer">
                  {t("Upload files")}
                  <input
                    hidden
                    id="uploadFile"
                    accept="application/pdf"
                    type="file"
                    multiple
                    {...register("doc")}
                    onChange={selectFile}
                    className="outline-none"
                  />
                </label>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 justify-evenly items-center flex-wrap min-h-[120px]">
            {selectedImages.map((file, index) => (
              <div key={index} className="flex justify-between gap-3 items-center py-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <label htmlFor={`editFile-${index}`} className="cursor-pointer">
                        <MdEdit fontSize={24} />
                      </label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("Change this file")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <input
                  id={`editFile-${index}`}
                  hidden
                  accept="application/pdf"
                  type="file"
                  {...register("doc")}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const newSelectedImages = [...selectedImages];
                      newSelectedImages[index] = file;
                      setSelectedImages(newSelectedImages);
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = () => {
                        const newImageSrcs = [...imageSrcs];
                        newImageSrcs[index] = reader.result as string;
                        setImageSrcs(newImageSrcs);
                      };
                      reader.onerror = () => {
                        console.log(reader.error);
                      };
                    }
                  }}
                />

                <div>
                  <Image
                    src={"/assets/images/resource/Images/pdfImg.png"}
                    alt="Selected file"
                    width={300}
                    height={100}
                    className="rounded h-20 w-auto"
                  />
                  <p className="text-center">{truncateFileName(file.name, 10)}</p>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => removeSelectedImage(index)}
                        className="cursor-pointer"
                      >
                        <MdDelete fontSize={24} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("Delete this file")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-2 items-center text-greyPrimary text-sm">
        <BsInfoCircle className="text-black" size={15} />
        {t("Document size")}:<span className="font-semibold">{t("Up to 5MB")}</span>;
        {t("Format")}:<span className="font-bold">{t("PDF")}</span>
      </div>

      {errors.doc && errors.doc.message && (
        <p className="text-red-500 text-sm mt-6 px-3 block">
          {(errors.doc as any).message}
        </p>
      )}
    </div>
  );
};

export default FileInput;