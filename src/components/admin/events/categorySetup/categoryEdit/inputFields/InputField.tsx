import React from "react";
import { UseFormRegister } from "react-hook-form";

interface IFieldInfo {
	errors: any;
	register: UseFormRegister<any>;
	labelName: string;
	inputName: string;
  defaultValue?: string;
	isOptinal?: boolean;
}

const InputField: React.FC<IFieldInfo> = ({
	errors,
	register,
	labelName,
	inputName,
  defaultValue,
	isOptinal = true,
}) => {
	return (
		<>
			<div>
				<label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
					{labelName}{" "}
					{!isOptinal && <span className="text-dangerPrimary">*</span>}
				</label>

				<input
					type="text"
					placeholder="Enter Category Name..."
					className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded w-full"
          defaultValue={defaultValue}
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

// import React from "react";
// import { UseFormRegister } from "react-hook-form";

// interface IFieldInfo {
//   errors: any;
//   register: UseFormRegister<any>;
//   defaultValue?: any;
// }

// const InputField: React.FC<IFieldInfo> = ({
//   errors,
//   register,
//   defaultValue,
// }) => {
//   return (
//     <>
//       <div>
//         <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
//           Category Name <span className="text-dangerPrimary">*</span>
//         </label>

//         <input
//           type="text"
//           placeholder="Enter Category Name..."
//           className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded w-full"
//           {...register("category_name", {
//             required: "Category name is required",
//           })}
//           defaultValue={defaultValue} // Set default value
//         />
//         {errors.categoryName && (
//           <p className="text-red-500 text-sm mt-1 ml-6">
//             {errors.category_name?.message}
//           </p>
//         )}
//       </div>
//     </>
//   );
// };

// export default InputField;
