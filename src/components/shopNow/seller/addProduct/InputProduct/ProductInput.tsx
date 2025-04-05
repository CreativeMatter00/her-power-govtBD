"use client";
import { UseFormRegister } from "react-hook-form";

interface FieldInfo {
  label: string;
  inputType: string;
  placeholderText: string;
  name: string;
  errors: any;
  register: UseFormRegister<any>;
  defaultValue?: any;
  required?: boolean;
}

const ProductInput: React.FC<FieldInfo> = ({
  inputType,
  placeholderText,
  name,
  errors,
  label,
  register,
  defaultValue,
  required,
}) => {
  
  // Preventing negative input (for number input types)
  const preventNegativeInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputType === "number" && e.key === "-") {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full">
      <label className="text-brandPrimary font-normal text-sm pl-6">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="mt-1 block outline-none placeholder:text-[#CACACA] text-base py-2 px-4 border border-brandLsPrimary rounded-full w-full bg-white"
        type={inputType}
        placeholder={placeholderText}
        {...register(name)}
        defaultValue={defaultValue}
        min={inputType === "number" ? 0 : undefined}
        onKeyDown={preventNegativeInput} // Prevent negative sign input
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
