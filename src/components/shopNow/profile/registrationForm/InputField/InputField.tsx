import React from "react";

interface InputFieldProps {
  inputType: string;
  labelName: string;
  placeholderText: string;
  name: string;
  errors?: any;
  register: any;
  extraContent?: React.ReactNode; // this will show the extra buttons or something like that
}

const InputField: React.FC<InputFieldProps> = ({
  inputType,
  labelName,
  placeholderText,
  name,
  errors,
  register,
  extraContent,
}) => {
  return (
    <div className="max-md:mb-3 mb-5">
      <label className="text-brandPrimary text-sm pl-6">{labelName}</label>
      <div className="border border-brandLsPrimary rounded-3xl w-full flex justify-between items-center px-6 mt-1">
        <input
          type={inputType}
          placeholder={placeholderText}
          className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 w-full"
          {...register(name)}
        />
        {errors && errors[name] && (
          <p className="text-red-500 text-xm mt-1 ml-6">
            {errors[name]?.message}
          </p>
        )}
        {extraContent}
      </div>
    </div>
  );
};

export default InputField;
