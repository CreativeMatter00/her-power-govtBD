import { Label } from "@/components/ui/label";
import React from "react";
import { Control, FieldValues, UseFormRegister } from "react-hook-form";

interface RadioValue {
	category_name: string;
	category_pid: string;
	// htmlFor: string;
	// label: string;
}

interface InputInfo {
	// title: string;
	// defaultValueInput: string;
	values: RadioValue[]; // Use an array for dynamic radio button values
	name: string;
	register?: UseFormRegister<FieldValues>;
	control?: Control<FieldValues>;
	errors?: any;
	isLoading: any;
}

const ProductCategoryInput: React.FC<InputInfo> = ({
	// title,
	// defaultValueInput,
	values,
	name,
	isLoading,
	register,
	control,
	errors,
}) => {
	// console.log(values);
	if (register) {
		return (
			<div className="my-2">
				{/* <label className="text-brandDs text-base font-normal">{title}</label> */}
				<label className="text-brandDs text-base font-normal">
					Select Product Category
				</label>
				<div className="ml-2 my-4 text-brandPrimary">
					<div className="grid grid-cols-1 gap-3">
						{isLoading ? (
							<p>Loading categories...</p>
						) : (
							<div className="grid grid-cols-1 gap-3">
								{values?.map(({ category_name, category_pid }) => (
									<div
										key={category_pid}
										className="flex items-center space-x-2"
									>
										<input
											type="radio"
											id={category_pid}
											value={category_pid} 
											{...register(name)} 
											className="border border-brandPrimary"
										/>
										<Label htmlFor={category_pid}>{category_name}</Label>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
				{errors && errors[name] && (
					<p className="text-red-500 text-xs mt-1 ml-6">
						{errors[name]?.message}
					</p>
				)}
			</div>
		);
	}

	// Optionally, handle cases where control is used (if needed)
	return null;
};

export default ProductCategoryInput;
