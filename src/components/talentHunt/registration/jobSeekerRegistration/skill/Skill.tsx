"use client";
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import Title from "../../Title";
import { GoPlus } from "react-icons/go";
import { HiOutlineInformationCircle } from "react-icons/hi";
import AddSkill from "./AddSkill";
import { useQuery } from "@tanstack/react-query";
import { getSkillSet } from "../../../../../api/api";

interface IProps {
  errors?: any;
  register: any;
}

const Skill: React.FC<IProps> = ({ register, errors }) => {
  const { data: allSkillSetData, isLoading } = useQuery({
    queryKey: ["allSkillSetData"],
    queryFn: getSkillSet,
  });

  // console.log(allSkillSetData);

  const [skillList, setSkillList] = useState<number[]>([0]);

  const handleAddSkill = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSkillList([...skillList, skillList.length]);
  };

  const handleRemoveSkill = (
    indexToRemove: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setSkillList(skillList.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <div className="mt-16">
        <Title infoTitle="Skill Section" />
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-link hover:bg-linkHover min-w-fit">
              <button className="p-2" onClick={handleAddSkill}>
                <GoPlus className="text-white" size={18} />
              </button>
            </div>
            <div className="flex gap-2">
              <HiOutlineInformationCircle className="h-5 w-5 text-brandPrimary" />
              <p>You can add more skills by clicking the ‘+’ icon</p>
            </div>
          </div>
        </div>
        {skillList.map((_, index) => (
          <AddSkill
            key={index}
            index={index}
            skillList={skillList}
            onRemove={(event) => handleRemoveSkill(index, event)}
            errors={errors}
            register={register}
            componentNo={index}
            allSkillSetData={allSkillSetData}
            defaultValue={undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default Skill;
