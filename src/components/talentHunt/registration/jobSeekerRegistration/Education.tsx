import { LuMinus } from "react-icons/lu";
import TextArrayInput from "../inputFields/TextArrayInput";
import React, { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface IProps {
	educationList: number[];
	onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
	errors: any;
	register: UseFormRegister<any>;
	componentNo: number;
}
const Education: React.FC<IProps> = ({
	educationList,
	onRemove,
	errors,
	register,
	componentNo,
}) => {
	const [isDisable, setIsDisable] = useState(true);

	useEffect(() => {
		if (educationList.length === 1) {
			setIsDisable(true);
		} else {
			setIsDisable(false);
		}
	}, [educationList]);
	// console.log(isDisable);

	return (
		<>
			<div className="border border-[#dddddd] rounded-md bg-brandLsSecondary mt-4">
				<div className="flex flex-col lg:flex-row items-start gap-4 p-4">
					<div
						className={`rounded-full bg-[#dddddd] ${
							educationList.length === 1
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
							labelName="Degree"
							inputName={`degree[${componentNo}]`}
							placeholderText="Enter your degree name"
							arrayName="degree"
							index={componentNo}
						/>
						<TextArrayInput
							inputType="text"
							register={register}
							errors={errors}
							labelName="Group/Department"
							inputName={`groupDepartment[${componentNo}]`}
							placeholderText="Enter your group/department"
							arrayName="groupDepartment"
							index={componentNo}
						/>
						<TextArrayInput
							inputType="text"
							register={register}
							errors={errors}
							labelName="Passing Year"
							inputName={`passingYear[${componentNo}]`}
							placeholderText="Enter passing year"
							arrayName="passingYear"
							index={componentNo}
						/>
						<div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
							<div className="w-full md:w-4/6 lg:w-5/6">
								<TextArrayInput
									inputType="number"
									register={register}
									errors={errors}
									labelName="GPA/CGPA"
									inputName={`gpaCgpa[${componentNo}]`}
									placeholderText="GPA/CGPA"
									arrayName="gpaCgpa"
									index={componentNo}
								/>
							</div>
							<div className="flex items-center gap-3 md:mt-4 w-2/6 max-lg:w-full">
								<p className="mt-2 md:mt-3 min-w-fit">out of</p>{" "}
								<div className="w-full max-md:w-2/6">
									<TextArrayInput
										inputType="number"
										register={register}
										errors={errors}
										inputName={`outOf[${componentNo}]`}
										placeholderText="4/5"
										mandatory={false}
										arrayName="outOf"
										index={componentNo}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Education;
