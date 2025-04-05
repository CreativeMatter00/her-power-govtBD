"use client";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface FieldInfo {
	label: string;
	inputType: string;
	placeholderText: string;
	name: string;
	errors: any;
	register: UseFormRegister<any>;
}

const CheckOutInput: React.FC<FieldInfo> = ({
	inputType,
	placeholderText,
	name,
	errors,
	label,
	register,
}) => {
	return (
		<div className="w-full">
			<label className="text-brandPrimary font-normal text-sm pl-6">
				{label}
			</label>
			<input
				className="mt-1 block outline-none placeholder:text-[#CACACA] text-base py-2 px-4 border border-brandLsPrimary rounded-full w-full bg-white"
				type={inputType}
				placeholder={placeholderText}
				{...register(name)}
			/>
			{errors[name] && (
				<p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
			)}
		</div>
	);
};

export default CheckOutInput;
