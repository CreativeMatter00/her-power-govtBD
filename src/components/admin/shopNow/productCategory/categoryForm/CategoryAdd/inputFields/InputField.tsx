import React from "react";
import { UseFormRegister } from "react-hook-form";

interface IFieldInfo {
	errors: any;
	register: UseFormRegister<any>;
}

const InputField: React.FC<IFieldInfo> = ({ errors, register }) => {
	return (
		<>
			<div>
				<label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
					Category Name <span className="text-dangerPrimary">*</span>
				</label>

				<input
					type="text"
					placeholder="Enter Category Name..."
					className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded w-full"
					{...register("categoryName")}
				/>
				{errors.categoryName && (
					<p className="text-red-500 text-sm mt-1 ml-6">
						{errors.categoryName?.message}
					</p>
				)}
			</div>
		</>
	);
};

export default InputField;
