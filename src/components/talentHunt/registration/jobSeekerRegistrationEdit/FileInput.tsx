"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { ChangeEvent, useState, useRef } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import { GrDocumentPdf } from "react-icons/gr";
import Link from "next/link";

interface IFiles {
  defaultValue: any;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
}

interface IFileInfo {
  fileName: string;
  fileSize: number;
}

const FileInput: React.FC<IFiles> = ({
  defaultValue,
  selectedFile,
  setSelectedFile,
}) => {
  const [fileSrc, setFileSrc] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<IFileInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ===================== SELECT FILE FUNCTION ===================
  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        // alert("Please select a PDF file.");
        return;
      }
      setSelectedFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFileSrc(reader.result as string);
        setFileInfo({
          fileName: file.name,
          fileSize: file.size / 1024,
        });
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setFileSrc(null);
    setFileInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input field value
    }
  };

  return (
    <div>
      <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
        Upload CV{" "}
        <span className="text-greyPrimary">(if you&apos;re a job seeker)</span>
      </label>
      <div
        className={`mt-1 block placeholder:text-[#cacaca] text-base border border-brandLsPrimary rounded w-full ${
          !selectedFile ? "h-fit" : "h-24"
        }`}
      >
        {!selectedFile ? (
          <div className="h-full">
            <div className="flex justify-evenly items-center gap-2">
              <div className="my-2">
                <div className="flex justify-center items-center">
                  <FaFilePdf className="w-10 h-12 text-dangerSecondary" />
                </div>

                <label className="text-link text-base font-normal hover:underline cursor-pointer">
                  <input
                    hidden
                    type="file"
                    accept="file/*"
                    onChange={selectFile}
                    ref={fileInputRef} // Attach ref to the input
                    className="outline-none"
                  />
                  Upload a file
                </label>
              </div>
              {defaultValue && (
                <div className="flex items-center flex-col">
                  <label className="font-semibold underline">Current CV</label>
                  <div className="text-brandDs">
                    <Link
                      href={`${defaultValue}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Click To View
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-evenly items-center h-12 w-full p-2 gap-6">
            {/* ======================= SELECT FILE EDIT OPTION ========================= */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <label htmlFor="editFile" className="cursor-pointer mt-16">
                    <MdEdit fontSize={24} />
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Change this file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <input
              id="editFile"
              hidden
              accept="file/*"
              type="file"
              onChange={selectFile}
              ref={fileInputRef}
            />

            {/* ======================= DISPLAY SELECTED FILE ===================== */}

            <div className="w-full mt-16">
              {fileInfo && (
                <div className="flex justify-center my-2 py-2">
                  <div className="flex gap-3">
                    <div>
                      <GrDocumentPdf className="text-dangerPrimary h-10 w-8" />
                    </div>
                    <div className="font-normal text-[#1C1C1C] text-sm">
                      <p className="font-medium">{fileInfo.fileName}</p>
                      <p className="text-sm">
                        <span className=" text-[#646464]">size:</span> &nbsp;
                        <span className="font-medium">
                          {fileInfo.fileSize.toFixed(1)} <span>Kb</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ===================== DELETE SELECT FILE ======================= */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={removeSelectedFile}
                    className="cursor-pointer mt-16"
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
      {/* =========================== SELECT FILE CRITERIA ======================= */}
      <div className="flex items-center gap-3 mt-3">
        <h1 className="text-[#444444] text-sm">
          Max file size: <span className="font-bold text-[#1C1C1C]">5 MB</span>
        </h1>
        <h1 className="text-[#444444] text-sm">
          File format:{" "}
          <span className="font-bold text-[#1C1C1C]">pdf, Doc</span>
        </h1>
      </div>
    </div>
  );
};

export default FileInput;
