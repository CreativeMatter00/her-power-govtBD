"use client";
import { useFormContext, UseFormRegister } from "react-hook-form";

// ***************************************** CATEGORY TYPE DEFINITION ================================
type TVenue = {
  speaker_name: string;
  speaker_pid: string;
};

// **************************************** PROPS TYPE DEFINITION =================================
type TProps = {
  allData: TVenue[];
  labelName: string;
  placeholderText: string;
  filedWidth?: string;
  optionalField?: boolean;
  keyName?: string;
  valueName?: string;
  register: UseFormRegister<any>;
  name: string;
  errors?: any;
  defaultValue?: string;
};

const SelectInput: React.FC<TProps> = ({
  allData,
  labelName,
  placeholderText,
  filedWidth,
  optionalField,
  keyName,
  valueName,
  register,
  name,
  errors,
  defaultValue
}) => {
  return (
    <div className={`w-full ${filedWidth}`}>
      <div className="mb-1 flex gap-2 items-center">
        <label className="text-brandPrimary text-sm pl-6">{labelName}</label>
        {optionalField && <p className="text-[#A5A5A5]">(optional)</p>}
      </div>
      <select
        {...register(name)}
        className="border border-brandLsPrimary text-brandPrimary px-6 py-2 w-full rounded-3xl"
        defaultValue={defaultValue && defaultValue }
      >
        <option value="" disabled>
          {placeholderText}
        </option>
        {allData?.map((data, index) => (
          <option
            key={index}
            value={data.speaker_pid}
            className="text-sm text-brandPrimary"
          >
            {data.speaker_name}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1 ml-6">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
