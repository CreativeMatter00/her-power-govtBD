"use client";
import { UseFormRegister } from "react-hook-form";

type OptionType = {
  value: string | number;  // Or the type of the value
  label: string;
};

type TProps = {
  allData: OptionType[];  // More specific type for allData
  labelName: string;
  inputName: string;
  placeholderText: string;
  optionalField?: boolean;
  register: UseFormRegister<any>;
  defaultValue?: string | number;  // Or whatever type your value can be
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Optional change handler
};

const SelectInput: React.FC<TProps> = ({
  allData,
  labelName,
  inputName,
  register,
  placeholderText,
  optionalField,
  defaultValue,
  onChange,  // Using onChange if needed
}) => {
  return (
    <div className="w-full">
      <div className="mb-1 flex gap-2 items-center">
        <label className="text-brandPrimary text-sm pl-6">{labelName}</label>
        {optionalField && <p className="text-[#A5A5A5]">(optional)</p>}
      </div>
      <select
        {...register(inputName)}
        className="w-full border border-brandLsPrimary text-brandPrimary px-6 h-10 rounded-full focus:outline-none"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        <option value="" disabled className="text-gray-400">
          {placeholderText}
        </option>
        {allData?.map((data, index) => (
          <option key={index} value={data.value}>
            {data.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
