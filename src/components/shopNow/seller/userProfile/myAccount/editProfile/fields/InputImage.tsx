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
import { useTranslations } from "next-intl";

// ****************************** IMAGE TYPE DEFINITION ==========================
interface IImageInfo {
  selectedFile: File | null;
  setSelectedFile: (image: File | null) => void;
  labelName: string;
  defaultImage: string;
}

const InputImage: React.FC<IImageInfo> = ({
  selectedFile,
  setSelectedFile,
  labelName,
  defaultImage,
}) => {
  const t = useTranslations("ImagePart");
  // ================================ IMAGE CHANGE FUNCTION =====================
  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // ================================ REMOVE IMAGE ===============================
  const removeSelectedFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="h-36 flex flex-col gap-2">
      {/* ======================================== labelName ================================== */}
      <label className="text-brandPrimary text-sm pl-6"> {labelName} </label>

      <div className="h-full border border-[#EEDDF5] rounded-lg bg-white">
        {/* =============================== IF NO FILE SELECTED ============================= */}
        {!selectedFile ? (
          <div className="flex justify-center items-center h-full w-full p-8 gap-4">
            <Image
              src={
                defaultImage
                  ? defaultImage
                  : "/assets/images/profile/inputImage.png"
              }
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
                  {/* ================================= IMAGE INPUT FIELD ============================= */}
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={imageChange}
                  />
                  {t("Upload an Image")}
                </label>
              </p>
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
                  <p>{t("Change this image")}</p>
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
            <Image
              src={URL.createObjectURL(selectedFile)}
              width={300}
              height={300}
              alt="Selected file"
              className="w-auto h-24 max-w-56"
            />

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
                  <p>{t("Delete this image")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputImage;