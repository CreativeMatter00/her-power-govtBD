import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useForm, Controller } from "react-hook-form"; // If using react-hook-form
import { MdDelete, MdEdit } from "react-icons/md";

interface ImageInfo {
  fileObjects: any;
  setFileObjects: Function;
  // fileObjects: File[] | null;
  // setFileObjects: (files: File[] | null) => void;
}

const InputImage: React.FC<ImageInfo> = ({ fileObjects, setFileObjects }) => {
  const [imageSrc, setImageSrc] = useState<string[] | null>(null);

  const imageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const fileList = Array.from(selectedFiles);
      const filesObject = fileList.slice(0, 6); // Limit to 6 files
      setFileObjects(filesObject); 

      const images: string[] = [];
      for (const imageFile of filesObject) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
          images.push(reader.result as string);
          if (images.length === filesObject.length) {
            setImageSrc(images);
          }
        };
        reader.onerror = () => {
          console.log(reader.error);
        };
      }
    }
  };

  const removeSelectedImage = () => {
    setFileObjects(null);
    setImageSrc(null);
  };

  return (
    <div className="h-full flex flex-col gap-2">
      <label className="text-brandPrimary text-sm pl-6">Upload Image</label>
      <div className="h-full border border-brandLsPrimary rounded-lg bg-white">
        {!imageSrc ? (
          <div className="flex justify-center items-center h-full w-full p-8 gap-4">
            <Image
              src="/assets/images/profile/inputImage.png"
              width={74}
              height={45}
              alt="input file"
              className="w-auto h-11"
            />
            <div className="text-center text-brandPrimary text-sm">
              <p>Drag your profile images here</p>
              <p>
                or
                <label className="text-link text-base font-normal hover:underline cursor-pointer">
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    multiple
                    onChange={imageChange}
                  />
                  &nbsp;Upload a file
                </label>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-evenly items-center h-full w-full p-2 gap-6">
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

            <input
              id="editImage"
              hidden
              accept="image/*"
              type="file"
              multiple
              onChange={imageChange}
            />

            <div className="grid grid-cols-3 gap-3">
              {imageSrc?.map((src, index) => (
                <div key={index}>
                  <Image
                    src={src}
                    alt={`Selected image ${index}`}
                    width={100}
                    height={10}
                    className="h-full"
                  />
                </div>
              ))}
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={removeSelectedImage} className="cursor-pointer">
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

export default InputImage;
