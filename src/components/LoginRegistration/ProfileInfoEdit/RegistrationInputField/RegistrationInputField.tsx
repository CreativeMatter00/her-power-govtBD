// 'use client'
import React from "react";

interface FieldInfo {
  inputType: string;
  placeholderText: string;
  labelName: string;
}

const RegistrationInputField: React.FC<FieldInfo> = ({
  inputType,
  placeholderText,
  labelName,
}) => {
  // console.log(inputType, placeholderText)
  return (
    <div className="mb-5">
      <label className="text-brandPrimary text-sm pl-6">{labelName}</label>
      <input
        className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded-3xl w-full"
        type={inputType}
        placeholder={placeholderText}
      />
    </div>
  );
};

export default RegistrationInputField;

// 'use client'
// import React from "react";
// import { useForm } from "react-hook-form";

// interface FieldInfo {
//   inputType: string;
//   placeholderText: string;
//   labelName: string;
//   fieldName: string;

//   errors: any;
// }

// const RegistrationInputField: React.FC<FieldInfo> = ({
//   inputType,
//   placeholderText,
//   labelName,
//   fieldName,
//   errors,
// }) => {
//   // console.log(inputType, placeholderText)
//   const { register } = useForm();
//   return (
//     <div className="mb-5">
//       <label className="text-brandPrimary text-sm pl-6">{labelName}</label>
//       <input
//         className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded-3xl w-full"
//         type={inputType}
//         placeholder={placeholderText}
//         {...register("fieldName")}
//       />

//       <p className="text-sm text-red-800">{errors?.[fieldName]?.message}</p>
//     </div>
//   );
// };

// export default RegistrationInputField;
