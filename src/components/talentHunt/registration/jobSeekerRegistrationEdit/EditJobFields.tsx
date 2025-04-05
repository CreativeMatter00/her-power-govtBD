"use client";
import React, { useEffect, useState } from "react";
import { LuMinus } from "react-icons/lu";
import { UseFormRegister } from "react-hook-form";
import TextArrayInput from "./TextArrayInput";

interface IProps {
  jobList: any[];
  onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
  errors: any;
  register: UseFormRegister<any>;
  componentNo: number;
  defaultValue: any; // This corresponds to job fields
}

const EditJobFields: React.FC<IProps> = ({
  jobList,
  onRemove,
  register,
  errors,
  componentNo,
  defaultValue,
}) => {
  // console.log(defaultValue);

  const [isDisable, setIsDisable] = useState<boolean>(false);

  useEffect(() => {
    setIsDisable(jobList.length === 1);
  }, [jobList]);

  return (
    <div className="border border-[#dddddd] rounded-md bg-brandLsSecondary mt-4">
      <div className="flex flex-col md:flex-row items-start gap-4 p-4">
        <div
          className={`rounded-full bg-[#dddddd] ${
            isDisable ? "hover:cursor-not-allowed" : "hover:bg-red-500"
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
            inputName={`jobList.${componentNo}.experience_title`}
            placeholderText="Enter your job title"
            defaultValue={defaultValue?.experience_title}
          />
          <TextArrayInput
            inputType="text"
            register={register}
            errors={errors}
            labelName="Experience"
            inputName={`jobList.${componentNo}.experience_desc`}
            placeholderText="Enter your experience"
            defaultValue={defaultValue?.experience_desc}
          />
          <TextArrayInput
            inputType="text"
            register={register}
            errors={errors}
            labelName="Organization"
            inputName={`jobList.${componentNo}.institution_name`}
            placeholderText="Enter your organization"
            defaultValue={defaultValue?.institution_name}
          />
        </div>
      </div>
    </div>
  );
};

export default EditJobFields;
