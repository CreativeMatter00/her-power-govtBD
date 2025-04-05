"use client";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";
import { ChangeEvent, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

//  ==================== INTERFACE FOR MULTIPLE IMAGES ===========================
interface IImageInfo {
  selectedImages: File[] | null;
  // selectedImages: any;
  // setSelectedImages: Function;
  setSelectedImages: (image: File[] | null) => void;
  imageSrc: any;
  setImageSrc: any;
}

const ProductImage: React.FC<IImageInfo> = ({
  selectedImages,
  setSelectedImages,
  imageSrc,
  setImageSrc,
}) => {
  const t = useTranslations("ShopNowHome");

  // =============== STATE INITIALIZED TO STORE MULTIPLE IMAGES =======================
  // const [imageSrc, setImageSrc] = useState<string[]>();
  //   const [imageSrc, setImageSrc] = useState<string[] | null | undefined>(
  //     undefined
  //   );

  const imageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = event.target.files;
    // console.log(selectedFiles[0]);
    if (selectedFiles) {
      const fileList = Array.from(selectedFiles);
      const filesObject = fileList.slice(0, 6);
      // console.log(filesObject)
      setSelectedImages(filesObject); //! modified

      const images: string[] = [];
      for (const imageFile of filesObject) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
          images.push(reader.result as string);
          if (images.length === filesObject.length) {
            setImageSrc([...images]);
          }
        };
        reader.onerror = () => {
          console.log(reader.error);
        };
      }
    }
  };
  // console.log(selectedImages);
  // ====================== TO REMOVE MULTIPLE IMAGES AT A TIME =====================
  const removeSelectedImage = () => {
    setSelectedImages(null);
    setImageSrc(null);
  };

  return (
    <div className="h-full flex flex-col gap-2">
      <label className="text-brandPrimary text-sm pl-6">
        {t("Upload_Image")} <span className="text-red-500">*</span>
      </label>
      <div className="h-full border border-brandLsPrimary rounded-lg bg-white">
        {!imageSrc ? (
          <div className="flex justify-center items-center h-full w-full p-8 gap-4">
            <Image
              src="/assets/images/profile/inputImage.png"
              width={74}
              height={45}
              alt="input file"
              className="w-auto h-auto"
            />
            <div className="text-center text-brandPrimary text-sm">
              <p>{t("Drag_your_profile_images_here")}</p>
              <p>
                {t("or")}
                <label className="text-link text-base font-normal hover:underline cursor-pointer">
                  {/* ======================== INPUT FIELD IMAGE ========================== */}
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    multiple
                    onChange={imageChange}
                  />
                  &nbsp;{t("Upload_a_file")}
                </label>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-evenly items-center h-full w-full p-2 gap-6">
            {/* ======================= IMAGE EDIT OPTION ========================= */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <label htmlFor="editImage" className="cursor-pointer">
                    <MdEdit fontSize={24} />
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("Change_this_image")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* ======================== EDIT INPUT IMAGES ========================= */}
            <input
              id="editImage"
              hidden
              accept="image/*"
              type="file"
              multiple
              onChange={imageChange}
            />

            {/* ======================= DISPLAY INPUT IMAGES ===================== */}
            <div className="flex flex-wrap justify-around gap-1">
              {imageSrc?.map((src: any, index: number) => (
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

            {/* ===================== DELETE INPUT IMAGES ======================= */}
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
                  <p>{t("Delete_this_image")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
