/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";
import {
  UseFormRegister,
  useForm,
  Controller,
  useFieldArray,
} from "react-hook-form";
import Title from "../Title";
import { GoPlus } from "react-icons/go";
import { HiOutlineInformationCircle } from "react-icons/hi";
import EditAchievement from "./EditAchievement";
import ScaleLoader from "react-spinners/ScaleLoader";

interface IProps {
  control?: any;
  register?: any;
  errors: any;
  selectedFiles: any;
  setSelectedFiles: any;
  defaultValue: any;
  setEditedAchievement: any ;
}

const Achievement: React.FC<IProps> = ({
  errors,
  selectedFiles,
  setSelectedFiles,
  defaultValue,
  setEditedAchievement
}) => {
  // console.log(defaultValue);

  // Check if defaultValue is missing and show loader
  if (!defaultValue) {
    return <ScaleLoader />;
  }

  // Initialize the form with default values
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      achievement_info:
        defaultValue?.map((achievement: any) => ({
          achievment_title: achievement.achievment_title || "",
          achievment_desc: achievement.achievment_desc || "",
          institution_name: achievement.institution_name || "",
          attached_doc: achievement.attached_doc || null,
        })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievement_info",
  });

  const achievement_info = watch("achievement_info");
  // console.log(achievement_info);
  setEditedAchievement(achievement_info)

  const handleEditAchievement = () => {
    append({
      achievment_title: "",
      achievment_desc: "",
      institution_name: "",
      attached_doc: null,
    });
  };

  const handleRemoveAchievment = (index: number) => {
    remove(index);
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
              <button
                type="button"
                className="p-2"
                onClick={handleEditAchievement}
              >
                <GoPlus className="text-white" size={18} />
              </button>
            </div>
            <div className="flex gap-2">
              <HiOutlineInformationCircle className="h-5 w-5 text-brandPrimary" />
              <p>You can add more achievements by clicking the ‘+’ icon</p>
            </div>
          </div>
        </div>
        {fields.map((field, index) => (
          <EditAchievement
            key={field.id || index}
            selectedFiles={selectedFiles[index] || []}
            setSelectedFiles={(files: File[]) =>
              updateSelectedFiles(files, index)
            }
            errors={formErrors}
            register={register}
            index={index}
            watch={watch}
            achievmentList={fields}
            control={control}
            onRemove={() => handleRemoveAchievment(index)}
            defaultValue={field}
          />
        ))}
      </div>
    </>
  );
};

export default Achievement;
