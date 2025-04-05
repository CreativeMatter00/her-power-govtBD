"use client";

import Link from "next/link";
import React, { ChangeEvent, useState } from "react";

// ========================= FILE INPUT TYPE DEFINITION ============================
interface IFiles {
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  defaultValue?: any; // Added defaultValue prop
}

const DocumentInput: React.FC<IFiles> = ({
  selectedFiles,
  setSelectedFiles,
  defaultValue,
}) => {
  // ============ STATE INITIALIZED TO STORE MULTIPLE FILES =============
  const [filesSrc, setFilesSrc] = useState<string[]>([]);

  // ================= SELECT FILES FUNCTION ===================
  const selectFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const allFiles = Array.from(e.target.files); // CONVERTING OBJECT TO ARRAY
      const selectedAllFiles = allFiles.slice(0, 6); // Limit to 6 files

      setSelectedFiles(selectedAllFiles);

      const newFilesSrc: string[] = [];
      selectedAllFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          newFilesSrc.push(reader.result as string);
          if (newFilesSrc.length === selectedAllFiles.length) {
            setFilesSrc(newFilesSrc);
          }
        };
        reader.onerror = () => {
          console.log(reader.error);
        };
      });
    }
  };

  return (
    <>
      <div>
        <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
          Upload Document
          <span className="text-dangerPrimary">*</span>
        </label>
        <div
          className={`mt-1 block placeholder:text-[#cacaca] text-base

					w-full `}
        >
          <div className="h-full">
            <div className="w-full">
              {/* ================================= INPUT FIELD ================================ */}
              <div className=" bg-white flex items-center justify-between p-0.5 rounded-lg">
                <label className="text-brandPrimary text-base font-normal cursor-pointer bg-[#dddddd] px-12 py-2 rounded-lg">
                  Choose file
                  <input
                    hidden
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    multiple
                    onChange={selectFiles}
                    className="outline-none"
                  />
                </label>
                {selectedFiles.length === 0 ? (
                  <>
                    <span>
                      {defaultValue && (
                        <Link
                          href={`${defaultValue}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          View Current Attachment
                        </Link>
                      )}
                    </span>
                    <span className="text-greyPrimary pl-6">
                      No attachment yet
                    </span>
                  </>
                ) : (
                  <div className="px-3 flex ">
                    <span className="text-sm overflow-hidden whitespace-nowrap text-ellipsis  max-w-xs">
                      {selectedFiles.map((file) => file.name).join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentInput;
