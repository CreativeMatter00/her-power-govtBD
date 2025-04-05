import { Label } from "@/components/ui/label";
import React from "react";
// import { Control, FieldValues, UseFormRegister } from "react-hook-form";

interface RadioValue {
	category_name: string;
	category_pid: string;
}

interface InputInfo {
	values: RadioValue[]; // Use an array for dynamic radio button values
	name: string;

	isLoading: any;
}

const ProductCategoryInput: React.FC<InputInfo> = ({
	values,
	// name,
	isLoading,
}) => {
	// console.log(values);

	

	return (
		<div className="my-2">
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
								<div key={category_pid} className="flex items-center space-x-2">
									<input
										type="radio"
										id={category_pid}
										value={category_pid}
										// {...register(name)}
										className="border border-brandPrimary"
									/>
									<Label htmlFor={category_pid}>{category_name}</Label>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductCategoryInput;
