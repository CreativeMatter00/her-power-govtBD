"use client";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdDelete, MdEdit } from "react-icons/md";
import { ChangeEvent } from "react";
import { UseFormRegister } from "react-hook-form";

// ****************************** IMAGE TYPE DEFINITION ==========================
interface IImageInfo {
  selectedFile: File | null;
  setSelectedFile: (image: File | null) => void;
  title: string;
  register?: UseFormRegister<any>; // Make register optional
  setValue: any;
  inputName: string;
  required?: boolean;
}

const ImageInput: React.FC<IImageInfo> = ({
  selectedFile,
  setSelectedFile,
  title,
  register,
  setValue,
  inputName,
  required
}) => {
  // ================================ IMAGE CHANGE FUNCTION =====================
  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setValue(inputName, file);
      // console.log("Selected file:", file);
    }
  };

  // ================================ REMOVE IMAGE ===============================
  const removeSelectedFile = () => {
    setSelectedFile(null);
    setValue(inputName, null); // Clear the file in the form state
  };

  // console.log(selectedFile);

  return (
    <div className="h-36 flex flex-col gap-2">
      {/* ======================================== TITLE ================================== */}
      <label className="text-brandPrimary text-sm pl-6">  {title} {required && <span className="text-red-500">*</span>}</label>

      <div className="h-full border border-[#EEDDF5] rounded-lg bg-white">
        {/* =============================== IF NO FILE SELECTED ============================= */}
        {!selectedFile ? (
          <div className="flex justify-center items-center h-full w-full p-8 gap-4">
            <Image
              src="/assets/images/profile/inputImage.png"
              width={74}
              height={45}
              alt="input file"
              className="w-auto h-11"
            />
            <div className="text-center text-brandPrimary text-sm">
              <div>
                <label className="text-link text-base font-normal hover:underline cursor-pointer">
                  {/* ================================= IMAGE INPUT FIELD ============================= */}
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    {...(register
                      ? register(inputName, {
                        onChange: (e) => {
                          imageChange(e);
                        },
                      })
                      : { onChange: imageChange })}
                  />
                  Click here to select images
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full w-full p-2 gap-6">
            {/* =============================== EDIT UPLOADED FILE EDIT ============================= */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <label htmlFor="editImage" className="cursor-pointer">
                    <MdEdit fontSize={24} />
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Change this image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* =================================== EDIT IMAGE INPUT FIELD ========================== */}
            <input
              id="editImage"
              hidden
              accept="image/*"
              type="file"
              onChange={imageChange}
            />

            {/* ============================ SELECTED IMAGE FILE SHOW ================================= */}
            {selectedFile && (
              <Image
                src={URL.createObjectURL(selectedFile)}
                width={300}
                height={300}
                alt="Selected file"
                className="w-auto h-24 max-w-56"
              />
            )}

            {/* ================================== DELETE UPLOADED FILE ================================ */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={removeSelectedFile}
                    className="cursor-pointer"
                  >
                    <MdDelete fontSize={24} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete this image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageInput;
