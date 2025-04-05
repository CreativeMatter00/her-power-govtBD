"use client";
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import Title from "../../Title";
import { GoPlus } from "react-icons/go";
import { HiOutlineInformationCircle } from "react-icons/hi";
import AddAchievment from "./AddAchievment";

interface IProps {
  errors: any;
  selectedFiles: any;
  setSelectedFiles: any;
  register: UseFormRegister<any>;
}

const Achievment: React.FC<IProps> = ({
  register,
  errors,
  selectedFiles,
  setSelectedFiles,
}) => {
  const [achievmentList, setAchievmentList] = useState([0]);
  const handleAddAchievment = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAchievmentList([...achievmentList, achievmentList.length + 1]);
    // setValue("Achievment", [...Achievments, ""]); // Add an empty Achievment
    // setValue("experience", [...experiences, ""]); // Add an empty experience
  };

  const handleRemoveAchievment = (
    indexToRemove: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setAchievmentList(
      achievmentList.filter((_, index) => index !== indexToRemove)
    );
    // setValue(
    // 	"Achievment",
    // 	Achievments.filter((_, index) => index !== indexToRemove)
    // );
    // setValue(
    // 	"experience",
    // 	experiences.filter((_, index) => index !== indexToRemove)
    // );
  };

  const updateSelectedFiles = (files: File[], index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index] = files;
    setSelectedFiles(updatedFiles);
  };

  return (
    <>
      <div className="mt-16">
        <Title infoTitle="Achievment" />
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-link hover:bg-linkHover min-w-fit">
              <button className="p-2" onClick={handleAddAchievment}>
                <GoPlus className="text-white" size={18} />
              </button>
            </div>
            <div className="flex gap-2">
              <HiOutlineInformationCircle className="h-5 w-5 text-brandPrimary" />
              <p>You can add more achievments by clicking the ‘+’ icon</p>
            </div>
          </div>
        </div>
        {achievmentList.map((_, index) => (
          <AddAchievment
            key={index}
            selectedFiles={selectedFiles[index] || []}
            setSelectedFiles={(files: File[]) =>
              updateSelectedFiles(files, index)
            }
            achievmentList={achievmentList}
            onRemove={(event) => handleRemoveAchievment(index, event)}
            errors={errors}
            register={register}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default Achievment;
