"use client";
import { getSkillSet } from "@/api/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Controller } from "react-hook-form";

interface IProps {
  errors: any;
  control: any;
  name: string;
  defaultSkillsetValue?: string;
}

const SelectInputField: React.FC<IProps> = ({ errors, control, name, defaultSkillsetValue }) => {
  // =========== DATA FETCHING =========
  const {
    isLoading: isSkillsetLoading,
    data: skillset,
    error: skillsetError,
  } = useQuery({
    queryKey: ["getSkillSet"],
    queryFn: () => getSkillSet(),
  });

  if (skillsetError) {
    return <p>{skillsetError.message}</p>;
  }

  return (
    <>
      <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
        Select Skillset <span className="text-dangerPrimary">*</span>
      </label>

      <div className="border border-brandLsPrimary rounded w-full -mt-6">
        {isSkillsetLoading ? (
          <Skeleton className="w-full h-11 bg-gray-300" />
        ) : (
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <Select
                {...field}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger className="border-0 text-brandPrimary ">
                  <SelectValue placeholder="Select a Skillset" />
                </SelectTrigger>

                <SelectContent className="min-w-fit text-brandPrimary">
                  <SelectGroup>
                    {skillset.map((skill: any, index: number) => (
                      <SelectItem
                        key={index}
                        className="hover:bg-brandLsSecondary"
                        value={skill.skill_pid}
                        defaultValue={defaultSkillsetValue}
                      >
                        {skill.skill_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        )}
      </div>

      {errors[name] && (
        <p className="text-red-500 text-sm -mt-3 ml-3">
          {errors[name]?.message}
        </p>
      )}
    </>
  );
};

export default SelectInputField;
