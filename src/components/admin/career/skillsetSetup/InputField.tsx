import { placeholderImage } from "@/api/api";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface IFieldInfo {
	errors: any;
	register: UseFormRegister<any>;
	labelName: string;
	inputName: string;
	placeholderText?: string;
	defaultSkill?: string;
}

const InputField: React.FC<IFieldInfo> = ({
	errors,
	register,
	labelName,
	inputName,
	placeholderText,
	defaultSkill,
}) => {
	return (
		<>
			<div>
				<label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
					{labelName} <span className="text-dangerPrimary">*</span>
				</label>

				<input
					type="text"
					placeholder={placeholderText}
					defaultValue={defaultSkill}
					className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 px-6 border border-brandLsPrimary rounded w-full"
					{...register(inputName)}
				/>
				{errors[inputName] && (
					<p className="text-red-500 text-sm mt-1 ml-3">
						{errors[inputName]?.message}
					</p>
				)}
			</div>
		</>
	);
};

export default InputField;
