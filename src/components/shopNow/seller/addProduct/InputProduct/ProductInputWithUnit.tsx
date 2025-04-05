import React from "react";
import { UseFormRegister } from "react-hook-form";

interface FieldInfo {
	label: string;
	inputType: string;
	unitType: string;
	placeholderText: string;
	name: string;
	errors: any;
	register: UseFormRegister<any>;
}

const ProductInputWithUnit: React.FC<FieldInfo> = ({
	inputType,
	unitType,
	placeholderText,
	name,
	errors,
	label,
	register,
}) => {
	return (
		<>
			<div className="w-full">
				<label className="text-brandPrimary font-normal text-sm max-md:pl-5 pl-6">
					{label}
				</label>
				<div className="flex justify-between items-center mt-1 placeholder:text-[#CACACA] text-base py-2 px-4 border border-brandLsPrimary rounded-full bg-white">
					<input
						type={inputType}
						placeholder={placeholderText}
						{...register(name)}
						className="w-full outline-none"
					/>
					<span className="text-brandDs">{unitType}</span>
				</div>

				{errors[name] && (
					<p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
				)}
			</div>
		</>
	);
};

export default ProductInputWithUnit;
