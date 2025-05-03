"use client";
import { useForm, UseFormRegister } from "react-hook-form";

interface FieldInfoType {
  inputType?: string;
  placeholderText?: string;
  label?: string;
  name: string;
  errors?: any;
  register: UseFormRegister<any>;
  widthSize?: string;
  required?: boolean;
  defaultValue?: string | number;

}

const CreateEventInputField = ({
  inputType,
  placeholderText,
  label,
  name,
  errors,
  register,
  widthSize,
  required,
  defaultValue
}: FieldInfoType) => {
  return (
    <div className={` ${widthSize} || w-full`}>
      <label className="text-brandPrimary text-sm pl-6"> {label} {required && <span className="text-red-500">*</span>}</label>

      <input
        className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 px-6 border border-brandLsPrimary rounded-3xl w-full"
        type={inputType || "text"}
        placeholder={placeholderText}
        {...register(name)}
        name={name!}
        defaultValue={defaultValue}
      />
      {errors?.[name!] && (
        <p className="text-red-500 text-sm mt-1">
          {String(errors?.[name!]?.message || "")}
        </p>
      )}
    </div>
  );
};

export default CreateEventInputField;
