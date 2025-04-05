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
  componentNo: number;
  arrayName: string;
  required?: boolean;
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
  componentNo,
  arrayName,
  required,
}) => {
  return (
    <>
      <div className="w-full">
        {mandatory && (
          <label className="text-sm font-normal pb-2 pl-6 text-brandPrimary">
            {labelName}
            {required && <span className="text-red-500">*</span>}
            <span className="text-greyPrimary">{optionalLabel}</span>
          </label>
        )}
        <input
          type={inputType}
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
          placeholder={placeholderText}
          className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 px-6 border border-brandLsPrimary rounded-full w-full"
          {...register(inputName)}
          min={inputType === "number" ? 0 : undefined}
        />
        {errors[arrayName]?.[componentNo] && (
          <p className="text-red-500 text-sm mt-1 pl-6">
            {errors[arrayName]?.[componentNo].message}
          </p>
        )}
      </div>
    </>
  );
};

export default TextArrayInput;
