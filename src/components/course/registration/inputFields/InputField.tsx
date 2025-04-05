import React from "react";
import { UseFormRegister } from "react-hook-form";
import get from "lodash/get";

interface IInputInfo {
  inputType?: string;
  labelName: string;
  placeholderText: string;
  inputName: string;
  errors: any;
  register: UseFormRegister<any>;
  required?: boolean;
  defaultValue?: any;
  disabled?: any;
}
const InputField: React.FC<IInputInfo> = ({
  inputType = "text",
  labelName,
  placeholderText,
  inputName,
  errors,
  register,
  defaultValue,
  required,
  disabled,
}) => {
  const errorMessage = get(errors, inputName)?.message;
  // console.log(errorMessage);

  // Function to prevent negative sign input
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    // Prevent the negative sign input
    if (input.value.includes("-")) {
      input.value = input.value.replace("-", "");
    }
  };

  return (
    <div className="w-full">
      <label className="text-sm font-normal pb-2 pl-6 text-brandPrimary">
        {labelName} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={inputType}
        placeholder={placeholderText}
        step={inputType === "number" ? 0.01 : undefined}  // For decimals
        min={inputType === "number" ? 0 : undefined}  // Prevent negative numbers
        className={`mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded-full w-full`}
        {...register(inputName, {
          min: inputType === "number" ? 0 : undefined, // Additional validation for react-hook-form
        })}
        disabled={disabled}
        defaultValue={defaultValue}
        onInput={handleInput}  // Attach the input handler
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
