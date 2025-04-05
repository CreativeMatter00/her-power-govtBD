/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { LuMinus } from "react-icons/lu";
import { UseFormRegister, Controller } from "react-hook-form";
import DocumentInput from "../inputFields/DocumentInput";
import TextArrayInput from "./TextArrayInput";
import ScaleLoader from "react-spinners/ScaleLoader";

interface IProps {
  selectedFiles: any;
  setSelectedFiles: any;
  achievmentList?: any;
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  watch?: any;
  errors: any;
  register: UseFormRegister<any>;
  index?: any;
  control?: any;
  defaultValue?: any;
}

const EditAchievement: React.FC<IProps> = ({
  selectedFiles,
  setSelectedFiles,
  achievmentList,
  watch,
  onRemove,
  register,
  errors,
  index,
  defaultValue,
}) => {
  // console.log(defaultValue);

  const data = watch("achievement_info");
  // console.log(data);

  if (!defaultValue) {
    return <ScaleLoader />;
  }

  const [isDisable, setIsDisable] = useState<boolean>(true);

  useEffect(() => {
    if (achievmentList && achievmentList.length === 1) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [achievmentList]);


  return (
    <>
      <div className="border border-[#dddddd] rounded-md bg-brandLsSecondary mt-4">
        <div className="flex flex-col md:flex-row items-start gap-4 p-4">
          <div
            className={`rounded-full bg-[#dddddd] ${
              achievmentList && achievmentList.length === 1
                ? "hover:cursor-not-allowed"
                : "hover:bg-red-500"
            }`}
          >
            <button className="p-2" onClick={onRemove} disabled={isDisable}>
              <LuMinus className="text-white" size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-4 w-full">
            {/* <TextArrayInput
              inputType="text"
              register={register}
              errors={errors}
              labelName="Title"
              inputName={`achievement_info.${index}.achievment_title`}
              placeholderText="Enter your achievement title"
              arrayName="achievment_title"
              index={index}
            /> */}

            <TextArrayInput
              inputType="text"
              register={register}
              errors={errors}
              labelName="Title"
              inputName={`achievement_info.${index}.achievment_title`}
              placeholderText="Enter your achievement title"
              defaultValue={defaultValue?.achievment_title}
            />

            {/* <TextArrayInput
              inputType="text"
              register={register}
              errors={errors}
              labelName="Description"
              inputName={`achievement_info.${index}.achievment_desc`}
              placeholderText="Enter achievement description"
              arrayName="achievment_desc"
              index={index}
              defaultValue={defaultValue?.achievment_desc}
            />
            <TextArrayInput
              inputType="text"
              register={register}
              errors={errors}
              labelName="Institution Name"
              inputName={`achievement_info.${index}.institution_name`}
              placeholderText="Enter institution name"
              arrayName="institution_name"
              index={index}
              defaultValue={defaultValue?.institution_name}
            /> */}

            <DocumentInput
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              defaultValue={defaultValue.attached_doc}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAchievement;
