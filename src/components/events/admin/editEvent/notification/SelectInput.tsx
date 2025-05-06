"use client";
import { UseFormRegister } from "react-hook-form";

// ***************************************** CATEGORY TYPE DEFINITION ================================
type TVenue = {
  data_id: string;
  data_name: string;
  data_value: string;
};

// **************************************** PROPS TYPE DEFINITION ====================================
type TProps = {
  allData: TVenue[];
  labelName: string;
  inputName: string;
  placeholderText?: string;
  filedWidth?: string;
  optionalField?: boolean;
  register: UseFormRegister<any>;
  required?: boolean;
  defaultValue?: string;
};

const SelectInput: React.FC<TProps> = ({
  allData,
  labelName,
  inputName,
  register,
  placeholderText,
  filedWidth,
  optionalField,
  required,
  defaultValue,
}) => {
  // console.log("Notification media id--------->", defaultValue);
  // console.log("Add Data--------->", allData);

  return (
    <div className="w-full">
      {/* ======================================= LABEL ======================================== */}
      <div className="mb-1 flex gap-2 items-center">
        <label className="text-brandPrimary text-sm pl-6">
          {labelName} {required && <span className="text-red-500">*</span>}
        </label>
        {optionalField && <p className="text-[#A5A5A5]">(optional)</p>}
      </div>
      <select
        {...register(inputName)} // Register the select input
        className={`${filedWidth} border border-brandLsPrimary text-brandPrimary px-6 h-10 rounded-md focus:outline-none`}
        defaultValue={defaultValue || ""}
      >
        <option value="" disabled className="text-black ">
          {placeholderText}
        </option>
        {allData?.map((data) => (
          <option
            key={data.data_id}
            value={data?.data_value}
            selected={defaultValue === data?.data_id}
          >
            {data.data_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
