"use client";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface FieldInfo {
  label: string;
  inputType: string;
  placeholderText: string;
  name: string;
  defaultValue?: any;
  errors: any;
  register: UseFormRegister<any>;
  required?:boolean;
}

const ProductInput: React.FC<FieldInfo> = ({
  inputType,
  placeholderText,
  name,
  defaultValue,
  errors,
  label,
  required,
  register,
}) => {
  // Handler to ensure no negative values are entered
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputType === 'number') {
      const value = event.target.value;
      if (parseFloat(value) < 0) {
        // Prevent setting a negative value
        event.target.value = '0';
      }
    }
  };

  return (
    <div className="w-full">
      <label className="text-brandPrimary font-normal text-sm pl-6">
        {label} {required && <span className="text-red-500">*</span> } 
      </label>
      <input
        className="mt-1 block outline-none placeholder:text-[#CACACA] text-base py-2 px-4 border border-brandLsPrimary rounded-full w-full bg-white"
        type={inputType}
        placeholder={placeholderText}
        {...register(name)}
        defaultValue={defaultValue ?? ""}
        onChange={handleChange} // Add the onChange handler
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-2 ml-6">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default ProductInput;
