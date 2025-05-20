"use client";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdDelete, MdEdit } from "react-icons/md";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { BsInfoCircle } from "react-icons/bs";
import { useDropzone } from "react-dropzone";

// ****************************** IMAGE TYPE DEFINITION ==========================
interface IImageInfo {
  id?: string;
  selectedImage: File | string | null | undefined;
  setSelectedImage: (image: File | null) => void;
  title: string;
  register: UseFormRegister<any>; // Make register optional
  required?: boolean;
  name: string;
  divHeight?: string;
  errors: FieldErrors<any>;
}

const ImageInput: React.FC<IImageInfo> = ({
  id,
  selectedImage,
  setSelectedImage,
  title,
  register,
  required,
  name,
  divHeight = "h-[100px]",
  errors
}) => {
  
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  
    useEffect(() => {
      if (selectedImage) {
        if (typeof selectedImage === "string") {
          setImageSrc(selectedImage);
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(selectedImage);
          reader.onload = () => {
            setImageSrc(reader.result as string);
          };
          reader.onerror = () => {
            console.log(reader.error);
          };
        }
      }
    }, [selectedImage]);
  
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
      setSelectedImage(null);
      setImageSrc(null);
    };

  return (
    <div className="h-36 flex flex-col gap-2">
      {/* ======================================== TITLE ================================== */}
      <label className="text-brandPrimary text-sm pl-6">  {title} {required && <span className="text-red-500">*</span>}</label>
      <div
              className={`mt-1 block placeholder:text-[#cacaca] text-base border border-brandLsPrimary rounded w-full ${divHeight}`}
              {...getRootProps()}
            >
              <input {...getInputProps()} {...register(name?.toLowerCase())} />
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
                    <p>Drag your image here</p>
                    <p>
                    or &nbsp;
                      <label htmlFor={"uploadImage"} className="text-link text-base font-normal hover:underline cursor-pointer">
                      Upload an Image
                        <input
                          hidden
                          id="uploadImage"
                          accept="image/*"
                          type="file"
                          {...register(name?.toLowerCase())}
                          onChange={selectFile}
                          className="outline-none"
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
                        <label htmlFor={`editFile-${id}`} className="cursor-pointer">
                          <MdEdit fontSize={24} />
                        </label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Change this image</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
      
                  <input
                    id={`editFile-${id}`}
                    hidden
                    accept="image/*"
                    type="file"
                    {...register(name.toLowerCase())}
                    onChange={selectFile}
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
                        <p>Delete this image</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
              <div className="flex gap-2 items-center text-greyPrimary text-sm p-1">
                <BsInfoCircle className="text-black" size={15} />
                size:
                <span className="font-medium">
                  {name === "Banner" ? "1024px X 350px" : "400px X 350px"}
                </span>
                ; Format:<span className="font-bold">JPG,PNG</span>
              </div>
            </div>
            {errors[name.toLowerCase()] && errors?.[name.toLowerCase()]?.message && (
        <p className="text-red-500 text-sm mt-6 px-3 block">
          {(errors[name.toLowerCase()] as any).message}
        </p>
      )}
    </div>
  );
};

export default ImageInput;
