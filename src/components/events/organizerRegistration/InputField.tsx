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
}

const InputField: React.FC<IFieldInfo> = ({
  errors,
  register,
  inputType,
  labelName,
  optionalLabel,
  placeholderText,
  defaultValue,
  inputName,
  mandatory = true,
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
          placeholder={placeholderText}
          // defaultValue={defaultValue}
          className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded-full w-full"
          {...register(inputName)}
        />
        {errors[inputName] && (
          <p className="text-red-500 text-sm mt-1 pl-6">
            {errors[inputName]?.message}
          </p>
        )}
      </div>
    </>
  );
};

export default InputField;
