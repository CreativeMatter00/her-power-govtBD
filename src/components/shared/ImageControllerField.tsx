import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
const ImageFileInput = ({ name, title, required = false }: { name: string; title?: string; required?: boolean }) => {
  const { control, getValues, setValue, trigger } = useFormContext();
  const initialValue = getValues(name);
  const [preview, setPreview] = useState<string | null>(
    initialValue instanceof File
      ? URL.createObjectURL(initialValue)
      : initialValue || null
  );

  useEffect(() => {
    if (initialValue instanceof File) {
      const fileUrl = URL.createObjectURL(initialValue);
      setPreview(fileUrl);
    } else if (typeof initialValue === "string") {
      setPreview(initialValue);
    }
  }, [initialValue]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image")) {
        const fileUrl = URL.createObjectURL(file);
        setPreview(fileUrl);
      }
      field.onChange(file);
    }
  };

  const handleDelete = (field: any) => {
    setPreview("");
    setValue(field.name, null);
    trigger(field.name)
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState }) => {
        return (
          <div>
            {title &&<label className="text-brandPrimary text-sm pl-6">  {title} {required && <span className="text-red-500">*</span>}</label>}
            <div className="h-32  border-[1px] border-brandLsPrimary rounded-lg cursor-pointer block mx-auto ">
              {preview ? (
                <div className="flex justify-evenly items-center h-full w-full p-2 gap-6">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <label className="cursor-pointer">
                          <MdEdit fontSize={24} />
                          <input
                            id="file"
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, field)}
                          />
                        </label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Change this image</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Image
                    width={300}
                    height={100}
                    src={preview}
                    alt="File Preview"
                    className="rounded-lg object-contain bg-cover h-20"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleDelete(field)}
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
              ) : (
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center h-full"
                >
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
                        <label className="text-link text-base font-normal hover:underline cursor-pointer">
                          Upload an Image
                          <input
                            id="file"
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, field)}
                          />
                        </label>
                      </p>
                    </div>
                  </div>
                </label>
              )}
            </div>
            {/* Validation Error */}
            {fieldState.error && (
              <p className="text-rose-500 text-xs mt-1 pl-2">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default ImageFileInput;
