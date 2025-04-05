import React from "react";
import { UseFormRegister } from "react-hook-form";

interface IInput {
  inputLabel: string;
  inputType?:string;
  inputName: string;
  placeHolderText: string;
  errors: any;
  register: UseFormRegister<any>;
  defaultValue?: string;
  required?: boolean;
}

const InputField: React.FC<IInput> = ({
  inputLabel,
  inputName,
  placeHolderText,
  errors,
  register,
  defaultValue,
  inputType,
  required
}) => {
  return (
    <>
      <div className="flex flex-col gap-[5px]">
        <label className="text-base font-normal text-black">
          {inputLabel}{" "}
          {required && <span className="text-dangerPrimary">*</span>}
        </label>

        <input
          type={inputType||"text"}
          placeholder={placeHolderText}
          className="block outline-none placeholder:text-[#cacaca] border border-brandLsPrimary text-base font-normal py-2 px-6 rounded w-full"
          defaultValue={defaultValue}
          {...register(inputName)}
        />
        {errors[inputName] && (
          <p className="text-red-500 text-sm mt-1 ml-1">
            {errors[inputName]?.message}
          </p>
        )}
      </div>
    </>
  );
};

export default InputField;
