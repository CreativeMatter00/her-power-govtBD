import React from "react";
import { UseFormRegister } from "react-hook-form";
import get from "lodash/get";

interface IInputInfo {
  labelName: string;
  placeholderText: string;
  inputName: string;
  errors: any;
  register: UseFormRegister<any>;
  required?: any;
}

const DateField: React.FC<IInputInfo> = ({
  labelName,
  placeholderText,
  inputName,
  errors,
  register,
  required,
}) => {
  const errorMessage = get(errors, inputName)?.message;
  console.log(errorMessage);

  return (
    <div className="w-full">
      <label className="text-sm font-normal pb-2 pl-6 text-brandPrimary">
        {labelName} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type="date"
        placeholder={placeholderText}
        className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 px-6 border border-brandLsPrimary rounded-full w-full"
        {...register(inputName)}
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default DateField;
