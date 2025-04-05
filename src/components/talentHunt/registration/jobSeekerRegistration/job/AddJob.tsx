"use client";
import React, { useEffect, useState } from "react";
import { LuMinus } from "react-icons/lu";
import { UseFormRegister } from "react-hook-form";
import TextArrayInput from "../../inputFields/TextArrayInput";

interface IProps {
	jobList: number[];
	onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
	errors: any;
	register: UseFormRegister<any>;
	componentNo: number;
}

const AddJob: React.FC<IProps> = ({
	jobList,
	onRemove,
	register,
	errors,
	componentNo,
}) => {
	const [isDisable, setIsDisable] = useState<boolean>(true);

	useEffect(() => {
		if (jobList.length === 1) {
			setIsDisable(true);
		} else {
			setIsDisable(false);
		}
	}, [jobList]);
	// console.log(isDisable);

	return (
		<>
			<div className="border border-[#dddddd] rounded-md bg-brandLsSecondary mt-4">
				<div className="flex flex-col md:flex-row items-start gap-4 p-4">
					<div
						className={`rounded-full bg-[#dddddd] ${
							jobList.length === 1
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
							labelName="Title"
							inputName={`title[${componentNo}]`}
							placeholderText="Enter your job title"
							arrayName="title"
							index={componentNo}
						/>
						<TextArrayInput
							inputType="text"
							register={register}
							errors={errors}
							labelName="Experience"
							inputName={`jobExperience[${componentNo}]`}
							placeholderText="Enter your experience"
							arrayName="jobExperience"
							index={componentNo}
						/>
						<TextArrayInput
							inputType="text"
							register={register}
							errors={errors}
							labelName="Organization"
							inputName={`organization[${componentNo}]`}
							placeholderText="Enter your organization"
							arrayName="organization"
							index={componentNo}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddJob;
