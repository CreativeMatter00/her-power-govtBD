import { UseFormRegister } from "react-hook-form";
import ProductInput from "../InputProduct/ProductInput";

interface ValidationInfo {
	errors: any;
	register: UseFormRegister<any>;
}

const SeoSettings: React.FC<ValidationInfo> = ({ errors, register }) => {
	return (
		<div className="gap-8 grid grid-cols-1 lg:grid-cols-2 mb-6 mt-3">
			<div className="flex flex-col gap-4 w-full">
				<ProductInput
					inputType="text"
					placeholderText="Write meta title here..."
					name="metaTitle"
					label="Meta Title"
					errors={errors}
					register={register}
				/>

				<ProductInput
					inputType="text"
					placeholderText="Type keywords"
					name="keywords"
					label="keywords"
					errors={errors}
					register={register}
				/>
			</div>
			<div className="w-full">
				<label className=" text-brandPrimary text-sm pl-6">
					Meta Description
				</label>
				{/* <label className="text-[#A5A5A5]  text-sm pl-6">Meta Description</label> */}
				<textarea
					rows={8}
					className="mt-1 block outline-none placeholder:text-greyPrimary text-base py-2 px-4 border border-brandLsPrimary rounded-md w-full bg-white resize-none"
					placeholder="Write meta description here..."
					{...register("metaDescription")}
				/>
				{errors["metaDescription"] && (
					<p className="text-red-500 text-sm mt-1">
						{errors["metaDescription"]?.message}
					</p>
				)}
			</div>
		</div>
	);
};

export default SeoSettings;
