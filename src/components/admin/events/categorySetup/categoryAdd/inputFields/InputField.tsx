import React from "react";
import { UseFormRegister } from "react-hook-form";

interface IFieldInfo {
	errors: any;
	register: UseFormRegister<any>;
	labelName: string;
	inputName: string;
	isOptinal: boolean;
}

const InputField: React.FC<IFieldInfo> = ({
	errors,
	register,
	labelName,
	inputName,
	isOptinal,
}) => {
	return (
		<>
			<div>
				<label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
					{labelName}{" "}
					{isOptinal && <span className="text-dangerPrimary">*</span>}
				</label>

				<input
					type="text"
					placeholder="Enter Category Name..."
					className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded w-full"
					{...register(inputName)}
				/>
				{errors[inputName] && (
					<p className="text-red-500 text-sm mt-1 ml-6">
						{errors[inputName]?.message}
					</p>
				)}
			</div>
		</>
	);
};

export default InputField;
