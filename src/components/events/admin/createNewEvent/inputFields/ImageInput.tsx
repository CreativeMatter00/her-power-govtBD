"use client";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdDelete, MdEdit } from "react-icons/md";
import { Control, Controller, FieldError } from "react-hook-form";

interface IImageInfo {
  selectedFile: File | null;
  setSelectedFile: (image: File | null) => void;
  title: string;
  control: Control<any>;
  inputName: string;
  required?: boolean;
  errors?: Record<string, FieldError>;
}

const ImageInput: React.FC<IImageInfo> = ({
  selectedFile,
  setSelectedFile,
  title,
  control,
  inputName,
  required,
  errors,
}) => {
  return (
    <div className="h-36 flex flex-col gap-2">
      {/* ====== TITLE ====== */}
      <label className="text-brandPrimary text-sm pl-6">
        {title} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="h-full border border-[#EEDDF5] rounded-lg bg-white">
        <Controller
          name={inputName}
          control={control}
          rules={{ required: required ? `${title} is required` : false }}
          render={({ field }) => (
            <>
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
                    <label className="text-link text-base font-normal hover:underline cursor-pointer">
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          setSelectedFile(file || null);
                          field.onChange(file || null);
                        }}
                      />
                      Click here to select images
                    </label>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center h-full w-full p-2 gap-6">
                  {/* ====== EDIT BUTTON ====== */}
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

                  {/* ====== FILE INPUT FOR EDITING IMAGE ====== */}
                  <input
                    id="editImage"
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setSelectedFile(file || null);
                      field.onChange(file || null);
                    }}
                  />

                  {/* ====== IMAGE PREVIEW ====== */}
                  {selectedFile && (
                    <Image
                      src={URL.createObjectURL(selectedFile)}
                      width={300}
                      height={300}
                      alt="Selected file"
                      className="w-auto h-24 max-w-56"
                    />
                  )}

                  {/* ====== DELETE IMAGE ====== */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => {
                            setSelectedFile(null);
                            field.onChange(null);
                          }}
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
            </>
          )}
        />
      </div>

      {/* ====== ERROR DISPLAY ====== */}
      {errors?.[inputName]?.message && (
        <p className="text-red-500 text-sm ml-6">
          {errors[inputName].message}
        </p>
      )}
    </div>
  );
};

export default ImageInput;
