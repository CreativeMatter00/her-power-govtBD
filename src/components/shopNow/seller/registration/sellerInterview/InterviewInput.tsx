import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface InputInfo {
  labelName: string;
  inputType: string;
  placeholderText: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: any;
}

const InterviewInput: React.FC<InputInfo> = ({
  labelName,
  inputType,
  placeholderText,
  name,
  register,
  errors,
}) => {
  
  // Function to handle the input and block negative values
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Block the minus sign ('-') for numbers
    if (event.key === "-" || event.key === "e") {
      event.preventDefault();
    }
  };

  return (
    <div>
      <label className="text-brandDs text-base">{labelName}</label>
      <input
        type={inputType}
        placeholder={placeholderText}
        {...register(name)}
        onKeyDown={handleKeyDown} // Prevent typing negative signs or 'e' for scientific notation
        min={inputType === "number" ? "0" : undefined} // Prevent negative numbers for numeric input
        className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 border-b border-brandPrimary w-full"
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1 ml-6">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default InterviewInput;
