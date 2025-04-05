"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BsInfoCircle } from "react-icons/bs";
import Image from "next/image";
import React, { ChangeEvent, useState, useEffect } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { useTranslations } from "next-intl";

interface IFiles {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  divHeight?: string;
  errors: FieldErrors<any>;
  register: UseFormRegister<any>;
}

const VideoInput: React.FC<IFiles> = ({
  selectedFile,
  setSelectedFile,
  divHeight = "h-[100px]",
  errors,
  register,
}) => {
  const t = useTranslations("resources_Library");
  const [fileSrc, setFileSrc] = useState<string | null>(null);
  const MAX_FILE_SIZE = 10 * 1024 * 1024 * 1024;

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file.size > MAX_FILE_SIZE) {
      alert(t("File size exceeds the maximum limit of 10 GB."));
      return;
    }
    setSelectedFile(file);
    const fileSrc = URL.createObjectURL(file);
    setFileSrc(fileSrc);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mkv"],
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert(t("File size exceeds the maximum limit of 10 GB."));
        return;
      }
      setSelectedFile(file);
      const fileSrc = URL.createObjectURL(file);
      setFileSrc(fileSrc);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileSrc) {
      URL.revokeObjectURL(fileSrc);
    }
    setFileSrc(null);
  };

  useEffect(() => {
    return () => {
      if (fileSrc) {
        URL.revokeObjectURL(fileSrc);
      }
    };
  }, [fileSrc]);

  return (
    <div>
      <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
        {t("Video File")} <span className="text-dangerPrimary">*</span>
      </label>
      <div
        className={`mt-1 block placeholder:text-[#cacaca] text-base border border-brandLsPrimary rounded w-full ${divHeight}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} {...register("video")} />
        {!selectedFile ? (
          <div className="flex justify-center items-center w-full h-full gap-4">
            <Image
              src="/assets/images/videoFile.png"
              width={74}
              height={45}
              alt="input file"
              className="w-auto h-11"
            />
            <div className="text-center text-brandPrimary text-sm">
              <p>{t("Drag your video here")}</p>
              <p>
                {t("or")} &nbsp;
                <label className="text-link text-base font-normal hover:underline cursor-pointer">
                  {t("Upload a video")}
                  <input
                    type="file"
                    accept="video/*"
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
                  <p>{t("Change this video")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <input
              id="editFile"
              hidden
              accept="video/*"
              type="file"
              onChange={handleFileChange}
            />

            {fileSrc && (
              <div>
                <video
                  src={fileSrc}
                  controls
                  width={300}
                  height={100}
                  className="rounded h-[80px]"
                />
              </div>
            )}

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
                  <p>{t("Delete this video")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        <div className="flex gap-2 items-center text-greyPrimary text-xs p-1">
          <BsInfoCircle className="text-black" size={15} />
          {t("Video resolution")}:
          <span className="font-medium">1920px X 1024px</span>; {t("Format")}:
          <span className="font-bold">{t("MP4,MKV")}</span>
        </div>
      </div>
      {errors.video && errors.video.message && (
        <p className="text-red-500 text-sm mt-6 px-6 block">
          {(errors.video as any).message}
        </p>
      )}
    </div>
  );
};

export default VideoInput;

// "use client";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { BsInfoCircle } from "react-icons/bs";
// import Image from "next/image";
// import React, { ChangeEvent, useState } from "react";
// import { UseFormRegister, FieldErrors } from "react-hook-form";
// import { MdDelete, MdEdit } from "react-icons/md";
// import { useDropzone } from "react-dropzone";
// import { useTranslations } from "next-intl";

// interface IFiles {
//   selectedFile: File | null;
//   setSelectedFile: (file: File | null) => void;
//   divHeight?: string;
//   errors: FieldErrors<any>;
//   register: UseFormRegister<any>;
// }

// const VideoInput: React.FC<IFiles> = ({
//   selectedFile,
//   setSelectedFile,
//   divHeight = "h-[100px]",
//   errors,
//   register,
// }) => {
//   const t = useTranslations("resources_Library");
//   const [fileSrc, setFileSrc] = useState<string | null>(null);

//   const onDrop = (acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     if (file) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         setFileSrc(reader.result as string);
//       };
//       reader.onerror = () => {
//         console.log(reader.error);
//       };
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: {
//       'video/*': ['.mp4', '.mkv'],
//     },
//   });

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         setFileSrc(reader.result as string);
//       };
//       reader.onerror = () => {
//         console.log(reader.error);
//       };
//     }
//   };

//   const removeSelectedFile = () => {
//     setSelectedFile(null);
//     setFileSrc(null);
//   };

//   return (
//     <div>
//       <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
//         {t("Video File")} <span className="text-dangerPrimary">*</span>
//       </label>
//       <div
//         className={`mt-1 block placeholder:text-[#cacaca] text-base border border-brandLsPrimary rounded w-full ${divHeight}`}
//         {...getRootProps()}
//       >
//         <input {...getInputProps()} {...register("video")} />
//         {!selectedFile ? (
//           <div className="flex justify-center items-center w-full h-full gap-4">
//             <Image
//               src="/assets/images/videoFile.png"
//               width={74}
//               height={45}
//               alt="input file"
//               className="w-auto h-11"
//             />
//             <div className="text-center text-brandPrimary text-sm">
//               <p>{t("Drag your video here")}</p>
//               <p>
//                 {t("or")} &nbsp;
//                 <label className="text-link text-base font-normal hover:underline cursor-pointer">
//                   {t("Upload a video")}
//                   <input
//                     type="file"
//                     accept="video/*"
//                     className="hidden"
//                     onChange={handleFileChange}
//                   />
//                 </label>
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="flex justify-evenly items-center h-full w-full p-2 gap-6">
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <label htmlFor="editFile" className="cursor-pointer">
//                     <MdEdit fontSize={24} />
//                   </label>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>{t("Change this video")}</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>

//             <input
//               id="editFile"
//               hidden
//               accept="video/*"
//               type="file"
//               onChange={handleFileChange}
//             />

//             {fileSrc && (
//               <div>
//                 <video
//                   src={fileSrc}
//                   controls
//                   width={300}
//                   height={100}
//                   className="rounded h-[80px]"
//                 />
//               </div>
//             )}

//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <button
//                     onClick={removeSelectedFile}
//                     className="cursor-pointer"
//                   >
//                     <MdDelete fontSize={24} />
//                   </button>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>{t("Delete this video")}</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           </div>
//         )}
//         <div className="flex gap-2 items-center text-greyPrimary text-xs p-1">
//           <BsInfoCircle className="text-black" size={15} />
//           {t("Video resolution")}:<span className="font-medium">1920px X 1024px</span>; {t("Format")}:<span className="font-bold">{t("MP4,MKV")}</span>
//         </div>
//       </div>
//       {errors.video && errors.video.message && (
//         <p className="text-red-500 text-sm mt-6 px-6 block">
//           {(errors.video as any).message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default VideoInput;
