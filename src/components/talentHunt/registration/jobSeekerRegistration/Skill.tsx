"use client";
import React, { useEffect, useState } from "react";
import { LuMinus } from "react-icons/lu";
import { UseFormRegister } from "react-hook-form";
import TextArrayInput from "../inputFields/TextArrayInput";

interface IProps {
	skillList: number[];
	onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
	errors: any;
	register: UseFormRegister<any>;
	componentNo: number;
}

const Skill: React.FC<IProps> = ({
	skillList,
	onRemove,
	register,
	errors,
	componentNo,
}) => {
	const [isDisable, setIsDisable] = useState<boolean>(true);

	useEffect(() => {
		if (skillList.length === 1) {
			setIsDisable(true);
		} else {
			setIsDisable(false);
		}
	}, [skillList]);
	// console.log(isDisable);

	return (
		<>
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
						<TextArrayInput
							inputType="text"
							register={register}
							errors={errors}
							labelName="Skills"
							inputName={`skill[${componentNo}]`}
							placeholderText="Type skills you have"
							arrayName="skill"
							index={componentNo}
						/>
						<TextArrayInput
							inputType="text"
							register={register}
							errors={errors}
							labelName="Experience"
							inputName={`experience[${componentNo}]`}
							placeholderText="Enter your experience"
							arrayName="experience"
							index={componentNo}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Skill;
