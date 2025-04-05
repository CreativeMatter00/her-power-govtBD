import { UseFormRegister } from "react-hook-form";
import React from "react";

interface IFieldInfo {
	errors: any;
	register: UseFormRegister<any>;
	descriptionDefaultValue: string;
}

const TextInput: React.FC<IFieldInfo> = ({
	errors,
	register,
	descriptionDefaultValue,
}) => {
	return (
		<>
			<div className={``}>
				<label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
					Category Description
				</label>

				<div className="border border-brandLsPrimary w-full rounded mt-1">
					<textarea
						rows={17}
						placeholder="Write Description"
						className=" block outline-none placeholder:text-[#cacaca] text-base py-2 px-4 w-full resize-none"
            defaultValue={descriptionDefaultValue}
						{...register("category_desc", {
							required: "Category description is required",
						})}
					></textarea>
				</div>
			</div>
		</>
	);
};

export default TextInput;
