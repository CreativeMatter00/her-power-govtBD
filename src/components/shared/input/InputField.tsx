import React from "react";
import { UseFormRegister } from "react-hook-form";

interface IFieldInfo {
  type: string;
  labelName: string;
  placeholderText: string;
  inputName: string;
  errors: any;
  register: UseFormRegister<any>;
  mandatory: boolean;
  defaultValue?: any;
}

const InputField: React.FC<IFieldInfo> = ({
  errors,
  register,
  labelName,
  type,
  placeholderText,
  defaultValue,
  inputName,
  mandatory,
}) => {
  return (
    <>
      <div className="w-full">
        <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
          {labelName}{" "}
          <span className={`text-dangerPrimary ${mandatory ? "" : "hidden"}`}>
            *
          </span>
        </label>

        <input
          type={type}
          placeholder={placeholderText}
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
          defaultValue={defaultValue}
          className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 px-6 border border-brandLsPrimary rounded w-full"
          {...register(inputName)}
        />
        {errors[inputName] && (
          <p className="text-red-500 text-sm mt-1 pl-3">
            {errors[inputName]?.message}
          </p>
        )}
      </div>
    </>
  );
};

export default InputField;
