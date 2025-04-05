import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { UseFormRegister } from "react-hook-form";

interface IInput {
  inputLabel: string;
  inputName: string;
  errors: any;
  register: UseFormRegister<any>;
  defaultValue?: string;  // Optional prop for default value
  required?: boolean;
}

const RadioInput: React.FC<IInput> = ({
  inputLabel,
  inputName,
  register,
  errors,
  defaultValue,  // Destructure defaultValue from props
  required
}) => {
  const t = useTranslations("career");
  return (
    <div className="flex flex-col gap-2">
      <label className="text-base font-normal text-black">{inputLabel}{required && (<span className="text-dangerPrimary">*</span>)}</label>
      <div className="flex items-center gap-5">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            value="on-site"
            id="on-site"
            {...register(inputName)}
            defaultChecked={defaultValue === "on-site"}  // Set default checked
            className="border border-brandDs rounded"
          />
          <Label htmlFor="on-site" className="text-base font-normal">
            {t("On-site")}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            value="remote"
            id="remote"
            {...register(inputName)}
            defaultChecked={defaultValue === "remote"}  // Set default checked
            className="border border-brandDs rounded"
          />
          <Label htmlFor="remote" className="text-base font-normal">
            {t("Remote")}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            value="hybrid"
            id="hybrid"
            {...register(inputName)}
            defaultChecked={defaultValue === "hybrid"}  // Set default checked
            className="border border-brandDs rounded"
          />
          <Label htmlFor="hybrid" className="text-base font-normal">
            {t("Hybrid")}
          </Label>
        </div>
      </div>
      {/* Display error message */}
      {errors[inputName] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[inputName]?.message}
        </p>
      )}
    </div>
  );
};

export default RadioInput;

// import { Label } from "@/components/ui/label";
// import React from "react";
// import { UseFormRegister } from "react-hook-form";

// interface IInput {
//   inputLabel: string;
//   inputName: string;
//   errors: any;
//   register: UseFormRegister<any>;
// }

// const RadioInput: React.FC<IInput> = ({
//   inputLabel,
//   inputName,
//   register,
//   errors,
// }) => {
//   return (
//     <>
//       <div className="flex flex-col gap-2">
//         <label className="text-base font-normal text-black">{inputLabel}</label>
//         <div className="flex items-center gap-5">
//           <div className="flex items-center space-x-2">
//             <input
//               type="radio"
//               value="on-site"
//               id="on-site"
//               {...register(inputName)}
//               className="border border-brandDs rounded"
//             />
//             <Label htmlFor="on-site" className="text-base font-normal">
//               On-site
//             </Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <input
//               type="radio"
//               value="remote"
//               id="remote"
//               {...register(inputName)}
//               className="border border-brandDs rounded"
//             />
//             <Label htmlFor="remote" className="text-base font-normal">
//               Remote
//             </Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <input
//               type="radio"
//               value="hybrid"
//               id="hybrid"
//               {...register(inputName)}
//               className="border border-brandDs rounded"
//             />
//             <Label htmlFor="hybrid" className="text-base font-normal">
//               Hybrid
//             </Label>
//           </div>
//         </div>
//         {/* Display error message */}
//         {errors[inputName] && (
//           <p className="text-red-500 text-sm mt-1">
//             {errors[inputName]?.message}
//           </p>
//         )}
//       </div>
//     </>
//   );
// };

// export default RadioInput;
