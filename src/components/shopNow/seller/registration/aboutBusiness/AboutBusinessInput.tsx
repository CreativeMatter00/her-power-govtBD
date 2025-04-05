import React from "react";
import { UseFormRegister } from "react-hook-form";

//  ABOUT BUSINESS INPUT INFO --------------------
interface InputInfo {
  labelName: string;
  inputType: string;
  placeholderText: string;
  inputName: string;
  errors: any;
  register: UseFormRegister<any>;
  required?:boolean;
}

const AboutBusinessInput: React.FC<InputInfo> = ({
  labelName,
  inputType,
  placeholderText,
  inputName,
  errors,
  register,
  required
}) => {
  return (
    <>
      <div className="">
        <label className="text-brandDs text-base font-normal">
          {labelName} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={inputType}
          placeholder={placeholderText}
          className="block border-b border-brandPrimary outline-none text-base font-normal p-2 placeholder:text-[##CACACA] w-full"
          {...register(inputName)}
        />
        {errors[inputName] && (
          <p className="text-dangerSecondary text-sm">
            {errors[inputName]?.message}
          </p>
        )}
      </div>
    </>
  );
};

export default AboutBusinessInput;
