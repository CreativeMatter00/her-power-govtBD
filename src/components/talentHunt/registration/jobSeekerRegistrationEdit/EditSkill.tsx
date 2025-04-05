/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { GoPlus } from "react-icons/go";
import EditSkillFields from "./EditSkillFields";
import ScaleLoader from "react-spinners/ScaleLoader";
import { getSkillSet } from "../../../../api/api";
import { useQuery } from "@tanstack/react-query";

interface EditSkillProps {
  setEditedSkillData: any;
  register: any;
  watch: any;
  defaultValue?: Array<{
    skillmap_pid: string | null | undefined;
    skillmap_id: number;
    skill_group: string;
    skill_category: string;
  }>;
  refetch: Function;
}

const EditSkill: React.FC<EditSkillProps> = ({
  setEditedSkillData,
  register,
  watch,
  defaultValue = [],
  refetch
}) => {
  if (!defaultValue || defaultValue.length === 0) {
    return <ScaleLoader />;
  }

  const { data: allSkillSetData, isLoading } = useQuery({
    queryKey: ["allSkillSetData"],
    queryFn: getSkillSet,
  });

  // console.log(allSkillSetData);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skill_info:
        defaultValue?.map((skills) => {
          // console.log(skills);
          return {
            // skillmap_pid: skills.skillmap_pid,
            skill_group: skills.skill_group,
            skill_category: skills.skill_category,
          };
        }) || [],
    },
  });

  const skill_info = watch("skill_info");
  // console.log(skill_info);
  setEditedSkillData(skill_info)

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "skill_info",
  });

  const handleAddSkill = () => {
    append({ skill_group: "", skill_category: "" });
  };

  return (
    <div className="mt-16">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="p-2 rounded-full bg-link hover:bg-linkHover"
          onClick={handleAddSkill}
        >
          <GoPlus className="text-white" />
        </button>
        <h4 className="text-base font-bold">Add Skill</h4>
      </div>

      <div className="mt-4 space-y-6">
        {fields.map((field, index) => (
          <EditSkillFields
            key={field.id || index}
            index={index}
            errors={errors}
            register={register}
            watch={watch}
            remove={remove}
            allSkillSetData={allSkillSetData}
            defaultValue={field}
            refetch={refetch}
            skillPid={defaultValue[index]?.skillmap_pid }
          />
        ))}
      </div>
    </div>
  );
};

export default EditSkill;
