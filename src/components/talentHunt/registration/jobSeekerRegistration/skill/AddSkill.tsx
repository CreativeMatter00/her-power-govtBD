"use client";
import React, { useEffect, useState } from "react";
import { LuMinus } from "react-icons/lu";
import { useForm, UseFormRegister } from "react-hook-form";
import SelectInput from "../../inputFields/SelectInput";
import { useQuery } from "@tanstack/react-query";
import { getSkillBySkillset } from "../../../../../api/api";

interface IProps {
	index: number;
	errors: any;
	skillList: number[];
	onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
	register: any;
	componentNo?: any;
	allSkillSetData: any[];
	defaultValue: any ;
}

const AddSkill: React.FC<IProps> = ({
	index,
	errors,
	skillList,
	onRemove,
	register,
	componentNo,
	allSkillSetData,
	defaultValue
}) => {

	// console.log(allSkillSetData);


	const { watch, getValues, handleSubmit } = useForm<any>();
	// console.log(getValues);
	const [selectedGroup, setSelectedGroup] = useState<any>();

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

	useEffect(() => {
		if (skillList.length === 1) {
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

	return (
		<div className="border border-[#dddddd] rounded-md bg-brandLsSecondary mt-4">
			<div className="flex flex-col md:flex-row items-start gap-4 p-4">
				<div
					className={`rounded-full bg-[#dddddd] ${
						skillList.length === 1
							? "hover:cursor-not-allowed"
							: "hover:bg-red-500"
					}`}
				>
					<button className="p-2" onClick={onRemove} disabled={isDisable}>
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
						defaultValue={defaultValue?.skill_pid}
					/>
				</div>
			</div>
		</div>
	);
};

export default AddSkill;
