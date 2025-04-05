"use client";
import React, { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { LuMinus } from "react-icons/lu";
import TextArrayInput from "../inputFields/TextArrayInput";
import axios from "axios";
import { url } from "@/api/api";

interface IProps {
  jobList: number[];
  onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
  errors: any;
  register: UseFormRegister<any>;
  componentNo: number;
  educationPid?: string | null | undefined;
  refetch:Function
}

const EducationFields: React.FC<IProps> = ({
  jobList,
  onRemove,
  register,
  errors,
  componentNo,
  educationPid,
  refetch
}) => {
  const [isDisable, setIsDisable] = useState<boolean>(true);

  useEffect(() => {
    setIsDisable(jobList.length === 1);
  }, [jobList]);

  // console.log("educationPid ", educationPid)

  const handleDeleteEducation = async () => {
    if (educationPid) {
      try {
        const response = await axios.delete(`${url}/api/admin/job-edu-delete/${educationPid}`);
        // console.log("Response Data:", response);
        if (response?.data?.meta?.status) {
          onRemove;
          refetch();
        }
      }
      catch (err: any) {
        console.error("Error deleting education", err);
      }
    }
    else{
      onRemove
    }
  }

  return (
    <div className="border border-[#dddddd] rounded-md bg-brandLsSecondary mt-4 p-4">
      <div className="flex items-start gap-4">
        <button
          type="button"
          className={`p-2 rounded-full ${isDisable ? "hover:cursor-not-allowed" : "hover:bg-red-500"
            }`}
          onClick={handleDeleteEducation}
          disabled={isDisable}
        >
          <LuMinus className="text-white" size={18} />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <TextArrayInput
            inputType="text"
            register={register}
            errors={errors}
            labelName="Degree"
            inputName={`degree[${componentNo}]`}
            placeholderText="Enter your degree name"
            arrayName="degree"
            index={componentNo}
          />
          <TextArrayInput
            inputType="text"
            register={register}
            errors={errors}
            labelName="Group/Department"
            inputName={`groupDepartment[${componentNo}]`}
            placeholderText="Enter your group/department"
            arrayName="groupDepartment"
            index={componentNo}
          />
          <TextArrayInput
            inputType="text"
            register={register}
            errors={errors}
            labelName="Passing Year"
            inputName={`passingYear[${componentNo}]`}
            placeholderText="Enter passing year"
            arrayName="passingYear"
            index={componentNo}
          />
          <div className="flex gap-2 items-center">
            <TextArrayInput
              inputType="number"
              register={register}
              errors={errors}
              labelName="GPA/CGPA"
              inputName={`gpaCgpa[${componentNo}]`}
              placeholderText="Enter GPA/CGPA"
              arrayName="gpaCgpa"
              index={componentNo}
            />
            <span>out of</span>
            <TextArrayInput
              inputType="number"
              register={register}
              errors={errors}
              inputName={`outOf[${componentNo}]`}
              placeholderText="4/5"
              arrayName="outOf"
              index={componentNo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationFields;
