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

interface IFiles {
  selectedImages: File[];
  setSelectedImages: (images: File[]) => void;
  image_url?: string;
}

const FileInput: React.FC<IFiles> = ({
  selectedImages,
  setSelectedImages,
  image_url,
}) => {
  // ============ STATE INITIALIZED TO STORE MULTIPLE FILES =============
  const [imagesSrc, setImagesSrc] = useState<string[]>([]);

  // ================= SELECT FILES FUNCTION ===================
  const selectFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length > 0) {
      // console.log(e.target.files);

      const imageFiles = Array.from(e.target.files); // CONVERTING OBJECT TO ARRAY
      const selectedAllImages = imageFiles.slice(0, 6);
      // console.log(selectedAllImages);

      setSelectedImages(selectedAllImages);

      const newImagesSrc: string[] = [];
      selectedAllImages.forEach((imageFile) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
          newImagesSrc.push(reader.result as string);
          if (newImagesSrc?.length === selectedAllImages?.length) {
            setImagesSrc(newImagesSrc);
          }
        };
        reader.onerror = () => {
          console.log(reader.error);
        };
      });
    }
  };

  const removeSelectedImages = () => {
    setSelectedImages([]);
    setImagesSrc([]);
  };
  // console.log(selectedImages);
  // console.log(imagesSrc);
  return (
    <>
      <div>
        <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
          Category Image <span className="text-dangerPrimary">*</span>
        </label>
        <div className="mt-1 block  placeholder:text-[#cacaca] text-base border border-brandLsPrimary rounded w-full h-72">
          {selectedImages?.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-6">
                <div className="w-full h-40  border-brandPrimary flex items-center justify-center">
                  {image_url ? (
                    <Image
                      src={image_url}
                      height={77}
                      width={77}
                      alt="upload image"
                      className="w-full h-full"
                    />
                  ) : (
                    <Image
                      src={"/assets/images/profile/inputImage.png"}
                      height={77}
                      width={77}
                      alt="upload image"
                      className="w-full h-full"
                    />
                  )}
                </div>

                {/* ================================= INPUT FIELD ================================ */}
                <div className="text-center">
                  <p>Drag category images here</p>
                  <div>
                    or
                    <label className="text-link text-base font-normal hover:underline cursor-pointer">
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={selectFiles}
                        className="outline-none"
                      />
                      &nbsp;Upload images
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-evenly items-center h-full w-full p-2 gap-6">
              {/* ======================= SELECT FILE EDIT OPTOIN ========================= */}
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

              {/* ======================== EDIT SELECT FILES ========================= */}
              <input
                id="editFile"
                hidden
                accept="image/*"
                type="file"
                multiple
                onChange={selectFiles}
              />

              {/* ======================= DISPLAY SELECT FILES ===================== */}

              <div className=" w-full">
                {imagesSrc.map((imageSrc, index) => (
                  <div key={index} className="flex justify-center items-center">
                    <Image
                      src={imageSrc}
                      alt={`Selected file ${index + 1}`}
                      width={300}
                      height={300}
                      className=" h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* ===================== DELETE SELECT FILES ======================= */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={removeSelectedImages}
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
        {/* ====================== SELECT FILE CRITERIA ======================= */}
        <div className="flex items-center gap-3 mt-3">
          <h1 className="text-[#444444] text-sm">
            Max image size:{" "}
            <span className="font-bold text-[#1C1C1C]">2 MB</span>
          </h1>
          {/* <h1 className="text-[#444444] text-sm">
            Image format: <span className="font-bold text-[#1C1C1C]">png</span>
          </h1> */}
        </div>
      </div>
    </>
  );
};

export default FileInput;
