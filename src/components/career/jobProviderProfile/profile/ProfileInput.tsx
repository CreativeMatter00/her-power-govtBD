"use client";
// import { UseFormRegister } from "react-hook-form";

interface FieldInfo {
	labelName: string;
	inputType: string;
	inputName: string;
  defaultValueInfo: string;
	// errors: any;
	// register: UseFormRegister<any>;
}

const ProfileInput: React.FC<FieldInfo> = ({
	inputType,
	
	inputName,
	// errors,
	labelName,
  defaultValueInfo,
	// register,
}) => {
	return (
		<div className="w-full my-3">
			<label className="text-brandPrimary font-normal text-sm pl-6">
				{labelName}
			</label>
			<input
				className="mt-1 block outline-none placeholder:text-[#CACACA] text-base py-2 px-4 border border-brandLsPrimary rounded-full w-full bg-white"
				type={inputType}
        name={inputName}
        defaultValue={defaultValueInfo}
				// {...register(name)}
			/>
			{/* {errors[name] && (
				<p className="text-red-500 text-sm mt-2 ml-6">
					{errors[name]?.message}
				</p>
			)} */}
		</div>
	);
};

export default ProfileInput;
