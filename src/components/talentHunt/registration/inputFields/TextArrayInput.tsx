import React from "react";
import { UseFormRegister } from "react-hook-form";

interface IFieldInfo {
  inputType: string;
  labelName?: string;
  optionalLabel?: string;
  placeholderText: string;
  inputName: string;
  errors: any;
  register: UseFormRegister<any>;
  mandatory?: boolean;
  defaultValue?: any;
  index?: number;
  arrayName?: string;
}

const TextArrayInput: React.FC<IFieldInfo> = ({
  errors,
  register,
  inputType,
  labelName,
  optionalLabel,
  placeholderText,
  defaultValue,
  inputName,
  mandatory = true,
  index,
  arrayName,
}) => {
  return (
    <>
      <div className="w-full">
        {mandatory && (
          <label className="text-sm font-normal pb-2 pl-6 text-brandPrimary">
            {labelName}{" "}
            <span className="text-greyPrimary">{optionalLabel}</span>
          </label>
        )}
        <input
          type={inputType}
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
          placeholder={placeholderText}
          className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 px-6 border border-brandLsPrimary rounded-full w-full"
          {...register(inputName)}
         />
        {errors[arrayName as any]?.[index as any] && (
          <p className="text-red-500 text-sm mt-1 pl-6">
            {errors[arrayName as any]?.[index as any].message}
          </p>
        )}

        {errors?.[inputName] && (
          <p className="text-red-500 text-sm mt-1 pl-6">
            {errors[inputName]?.message || "Invalid input"}
          </p>
        )}
      </div>
    </>
  );
};

export default TextArrayInput;
