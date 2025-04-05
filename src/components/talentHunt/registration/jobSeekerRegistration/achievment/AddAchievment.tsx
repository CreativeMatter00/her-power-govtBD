"use client";
import React, { useEffect, useState } from "react";
import { LuMinus } from "react-icons/lu";
import { UseFormRegister } from "react-hook-form";
import TextArrayInput from "../../inputFields/TextArrayInput";
import DocumentInput from "../../inputFields/DocumentInput";

interface IProps {
  selectedFiles: any;
  setSelectedFiles: any;
  achievmentList: number[];
  onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
  errors: any;
  register: UseFormRegister<any>;
  index: number;
}

const AddAchievment: React.FC<IProps> = ({
  selectedFiles,
  setSelectedFiles,
  achievmentList,
  onRemove,
  register,
  errors,
  index,
}) => {
  const [isDisable, setIsDisable] = useState<boolean>(true);

  useEffect(() => {
    if (achievmentList.length === 1) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [achievmentList]);
  // console.log(isDisable);

  return (
    <>
      <div className="border border-[#dddddd] rounded-md bg-brandLsSecondary mt-4">
        <div className="flex flex-col md:flex-row items-start gap-4 p-4">
          <div
            className={`rounded-full bg-[#dddddd] ${
              achievmentList.length === 1
                ? "hover:cursor-not-allowed"
                : "hover:bg-red-500"
            }`}
          >
            <button className="p-2" onClick={onRemove} disabled={isDisable}>
              <LuMinus className="text-white" size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-4 w-full">
            <TextArrayInput
              inputType="text"
              register={register}
              errors={errors}
              labelName="Title"
              inputName={`achievement_info[${index}].title`}
              placeholderText="Enter your achievment title"
              arrayName="title"
              index={index}
            />
            <DocumentInput
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAchievment;
