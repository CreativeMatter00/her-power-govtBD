"use client";
import { useFormContext, UseFormRegister } from "react-hook-form";

// ****************** CATEGORY TYPE DEFINITION =====================
type TVenue = Record<string, number | string | null>;

// ****************** PROPS TYPE DEFINITION =================
type TProps = {
	allData: TVenue[];
	labelName: string;
	placeholderText: string;
	filedWidth?: string;
	optionalField?: boolean;
	keyName?: string;
	valueName?: string;
	register: UseFormRegister<any>;
	errors: any;
	inputName: string;
};

const SelectInput: React.FC<TProps> = ({
	allData,
	labelName,
	placeholderText,
	filedWidth,
	optionalField,
	keyName,
	valueName,
	register,
	errors,
	inputName,
}) => {
	// console.log(allData);
	return (
		<div className={`w-full ${filedWidth}`}>
			<div className="mb-1 flex gap-1 items-center">
				<label className="text-brandPrimary text-sm pl-3">{labelName}</label>
				{optionalField && <p className="text-red-500">*</p>}
			</div>
			<select
				{...register(inputName)}
				className="border border-brandLsPrimary text-brandPrimary px-4 py-2 w-full"
				defaultValue=""
			>
				<option value="" disabled>
					{placeholderText}
				</option>
				{allData?.map((data, index) => (
					<option
						key={index}
						value={data.division_code as string}
						className="text-sm text-brandPrimary"
					>
						{data.division_name}
					</option>
				))}
			</select>
			{errors[inputName] && (
				<p className="text-red-500 text-sm mt-1 pl-6">
					{errors[inputName]?.message}
				</p>
			)}
		</div>
	);
};

export default SelectInput;
