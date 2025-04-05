/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Title from "../Title";
import { GoPlus } from "react-icons/go";
import { HiOutlineInformationCircle } from "react-icons/hi";
import EditJobFields from "./EditJobFields";
import ScaleLoader from "react-spinners/ScaleLoader";

interface JobField {
  experiencemap_pid:string | undefined | null;
  experience_title: string;
  experience_desc: string;
  institution_name: string;
}

interface IProps {
  setEditedJobData: any;
  errors?: any;
  register?: any;
  control?: any;
  setValue: any;
  defaultValue: JobField[]; // Expecting an array of job objects
}

const EditJob: React.FC<IProps> = ({
  defaultValue,
  setValue,
  setEditedJobData,
}) => {
  if (!defaultValue) {
    return <ScaleLoader />;
  }

  // console.log(defaultValue);
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobList:
        defaultValue?.map((job) => ({
          experience_title: job.experience_title || "",
          experience_desc: job.experience_desc || "",
          institution_name: job.institution_name || "",
        })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "jobList",
  });

  const jobListData = watch("jobList");
  // console.log(jobListData);
  setEditedJobData(jobListData);

  const handleAddJob = () => {
    append({ experience_title: "", experience_desc: "", institution_name: "" });
  };

  return (
    <>
      <div className="mt-16">
        <Title infoTitle="Work Experience" />
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-link hover:bg-linkHover min-w-fit">
              <button type="button" className="p-2" onClick={handleAddJob}>
                <GoPlus className="text-white" size={18} />
              </button>
            </div>
            <div className="flex gap-2">
              <HiOutlineInformationCircle className="h-5 w-5 text-brandPrimary" />
              <p>You can add more jobs by clicking the ‘+’ icon</p>
            </div>
          </div>
        </div>
        {fields &&
          fields.map((field, index) => (
            <EditJobFields
              key={field.id}
              jobList={fields}
              onRemove={() => remove(index)}
              register={register}
              errors={errors}
              componentNo={index}
              defaultValue={field}
              // job
            />
          ))}
      </div>
    </>
  );
};

export default EditJob;
