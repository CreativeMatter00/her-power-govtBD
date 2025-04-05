import React from "react";
import { UseFormRegister } from "react-hook-form";

interface IFieldInfo {
  labelName: string;
  placeholderText: string;
  inputName: string;
  errors: any;
  register: UseFormRegister<any>;
  optional: boolean;
}

const InputField: React.FC<IFieldInfo> = ({
  errors,
  register,
  labelName,
  placeholderText,
  inputName,
  optional,
}) => {
  return (
    <>
      <div>
        <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
          {labelName}{" "}
          <span className={`text-dangerPrimary ${optional ? "" : "hidden"}`}>
            *
          </span>
        </label>

        <input
          type="text"
          placeholder={placeholderText}
          className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded w-full"
          {...register(inputName)}
        />
        {errors[inputName] && (
          <p className="text-red-500 text-sm mt-1">
            {errors[inputName]?.message}
          </p>
        )}
      </div>
    </>
  );
};

export default InputField;
