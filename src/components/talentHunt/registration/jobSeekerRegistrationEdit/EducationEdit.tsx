import React, { useEffect, useState } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { GoPlus } from "react-icons/go";
import Title from "../Title";
import { HiOutlineInformationCircle } from "react-icons/hi";
 import ScaleLoader from "react-spinners/ScaleLoader";
import EducationFields from "./EducationFields";

interface IProps {
  errors: any;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  defaultValue: Array<any>;
  refetch:Function;
}

const EducationEdit: React.FC<IProps> = ({
  errors,
  register,
  setValue,
  watch,
  defaultValue,
  refetch
}) => {
  if (!defaultValue) {
    <ScaleLoader />;
  }

  const [educationList, setEducationList] = useState<number[]>([]);

  useEffect(() => {
    // Initialize with indices based on default values
    setEducationList(defaultValue && defaultValue.map((_, index) => index));

    // Set default form values
    defaultValue &&
      defaultValue.forEach((edu, index) => {
        setValue(`degree[${index}]`, edu.edu_dgree);
        setValue(`groupDepartment[${index}]`, edu.group_department);
        setValue(`passingYear[${index}]`, edu.passing_year);
        setValue(`gpaCgpa[${index}]`, edu.result_gpa);
        setValue(`outOf[${index}]`, edu.gpa_cgpa_outof);
      });
  }, [defaultValue, setValue]);

  const degrees = watch("degree") || [];
  const groups = watch("groupDepartment") || [];
  const passingYears = watch("passingYear") || [];
  const gpaCgpas = watch("gpaCgpa") || [];
  const outOfs = watch("outOf") || [];

  const handleAddEducation = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEducationList((prev) => [...prev, prev.length]);
    setValue("degree", [...degrees, ""]);
    setValue("groupDepartment", [...groups, ""]);
    setValue("passingYear", [...passingYears, ""]);
    setValue("gpaCgpa", [...gpaCgpas, 0]);
    setValue("outOf", [...outOfs, 0]);
  };

  const handleRemoveEducation = (
    indexToRemove: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setEducationList((prev) => prev.filter((_, idx) => idx !== indexToRemove));

    // Remove specific values from form state
    setValue(
      "degree",
      degrees.filter((_: any, idx: number) => idx !== indexToRemove)
    );
    setValue(
      "groupDepartment",
      groups.filter((_: any, idx: number) => idx !== indexToRemove)
    );
    setValue(
      "passingYear",
      passingYears.filter((_: any, idx: number) => idx !== indexToRemove)
    );
    setValue(
      "gpaCgpa",
      gpaCgpas.filter((_: any, idx: number) => idx !== indexToRemove)
    );
    setValue(
      "outOf",
      outOfs.filter((_: any, idx: number) => idx !== indexToRemove)
    );
  };

  return (
    <div className="rounded-md mt-8">
      <div className="">
        <Title infoTitle="Education" />
        <div className="flex items-center gap-3 mt-4">
          <button
            className="p-2 bg-link hover:bg-linkHover rounded-full"
            onClick={handleAddEducation}
          >
            <GoPlus className="text-white" size={18} />
          </button>
          <div className="flex gap-2 items-center">
            <HiOutlineInformationCircle className="h-5 w-5 text-brandPrimary" />
            <p>You can add more degrees by clicking the ‘+’ icon</p>
          </div>
        </div>
        <div className="mt-4  ">
          {educationList &&
            educationList.map((index) => (
              <div key={index}>
                <EducationFields
                  jobList={educationList}
                  onRemove={(event) => handleRemoveEducation(index, event)}
                  errors={errors}
                  register={register}
                  componentNo={index}
                  educationPid={defaultValue[index]?.educatmap_pid}
                  refetch={refetch}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EducationEdit;
