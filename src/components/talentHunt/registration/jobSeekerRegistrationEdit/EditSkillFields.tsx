/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import React, { useEffect, useState } from "react";
import { LuMinus } from "react-icons/lu";
import { useForm } from "react-hook-form";
import SelectInput from "../inputFields/SelectInput";
import { useQuery } from "@tanstack/react-query";
import { getSkillBySkillset, url } from "../../../../api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";

interface IProps {
  index: number;
  errors: any;
  skillList?: number[];
  register: any;
  watch?: any;
  remove?: any;
  componentNo?: any;
  allSkillSetData?: any[];
  defaultValue?: any;
  refetch: Function;
  skillPid?: string | undefined | null;
}

const EditSkillFields: React.FC<IProps> = ({
  index,
  errors,
  skillList,
  // onRemove,
  remove,
  register,
  componentNo,
  allSkillSetData,
  defaultValue,
  refetch,
  skillPid
}) => {
  if (!defaultValue || !allSkillSetData) {
    return <ScaleLoader />;
  }

  const { watch, getValues, handleSubmit } = useForm<any>();
  const [selectedGroup, setSelectedGroup] = useState<any>(
    defaultValue?.skill_group || ""
  );

  const [isDisable, setIsDisable] = useState<boolean>(true);

  const {
    isLoading,
    error,
    data: skillBySetData,
  } = useQuery({
    queryKey: ["skillBySetData", selectedGroup],
    queryFn: () => getSkillBySkillset(selectedGroup),
    enabled: !!selectedGroup,
  });

  // console.log(skillBySetData);

  useEffect(() => {
    if (skillList && skillList.length === 1) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [skillList]);

  const skillSetOptions =
    allSkillSetData?.map((skill) => ({
      value: skill.skill_pid,
      label: skill.skill_name,
    })) || [];


  const skillOptions =
    skillBySetData?.map((skill: any) => ({
      value: skill.skill_pid,
      label: skill.skill_name,
    })) || [];

  const handleSkillGroupChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedSkillGroup = event.target.value;
    setSelectedGroup(selectedSkillGroup);
  };

  const handleDeleteSkill = async () => {
    if (skillPid) {
      try {
        const response = await axios.delete(`${url}/api/admin/job-skill-delete/${skillPid}`);
        // console.log("Response Data:", response);
        if (response?.data?.meta?.status) {
          remove(index);
          refetch();
        }
      }
      catch (err: any) {
        console.error("Error deleting education", err);
      }
    }
    else {
      remove(index);
    }
  }

  return (
    <div className="border border-[#dddddd] rounded-md bg-brandLsSecondary mt-4">
      <div className="flex flex-col md:flex-row items-start gap-4 p-4">
        <div
          className={`rounded-full bg-[#dddddd] ${skillList && skillList.length === 1
            ? "hover:cursor-not-allowed"
            : "hover:bg-red-500"
            }`}
        >
          <button
            type="button"
            className="p-2"
            onClick={handleDeleteSkill}
            disabled={isDisable}
          >
            <LuMinus className="text-white" size={18} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-4 w-full">
          <SelectInput
            register={register}
            labelName="Select Skill Set"
            inputName={`skill_info[${index}].skill_group`}
            placeholderText="Select a set"
            allData={skillSetOptions}
            onChange={handleSkillGroupChange}
            defaultValue={defaultValue?.skill_group}
          />

          <SelectInput
            register={register}
            labelName="Select Skill"
            inputName={`skill_info[${index}].skill_category`}
            placeholderText="Select relevant skill"
            allData={skillOptions}
            defaultValue={defaultValue?.skill_category}
          />
        </div>
      </div>
    </div>
  );
};

export default EditSkillFields;
