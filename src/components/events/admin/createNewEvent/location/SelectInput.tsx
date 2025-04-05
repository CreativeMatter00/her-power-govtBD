"use client";
import { UseFormRegister } from "react-hook-form";

// ***************************************** CATEGORY TYPE DEFINITION ================================
type TVenue = {
  venue_pid: string;
  venue_name: string;
};

// **************************************** PROPS TYPE DEFINITION ====================================
type TProps = {
  allData: TVenue[];
  labelName: string;
  inputName: string;
  placeholderText: string;
  filedWidth?: string;
  optionalField?: boolean;
  register: UseFormRegister<any>;
  required?: boolean;
};

const SelectInput: React.FC<TProps> = ({
  allData,
  labelName,
  inputName,
  register,
  placeholderText,
  filedWidth,
  optionalField,
  required
}) => {
  // console.log("allData", labelName, allData);

  return (
    <div className="w-full">
      {/* ======================================= LABEL ======================================== */}
      <div className="mb-1 flex gap-2 items-center">
        <label className="text-brandPrimary text-sm pl-6">{labelName} {required && <span className="text-red-500">*</span>}</label>
        {optionalField && <p className="text-[#A5A5A5]">(optional)</p>}
      </div>
      <select
        {...register(inputName)} // Register the select input
        className={`${filedWidth} border border-brandLsPrimary text-brandPrimary px-6 h-10 rounded-md focus:outline-none`}
        defaultValue=""
      >
        <option value="" disabled className="text-gray-400">
          {placeholderText}
        </option>
        {allData?.map((data) => (
          <option key={data.venue_pid} value={data.venue_pid}>
            {data.venue_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
