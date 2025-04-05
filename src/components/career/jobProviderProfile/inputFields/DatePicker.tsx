"use client";
import React, { useEffect } from "react";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface IProps {
  name: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch?: UseFormWatch<any>;
  errors?: any;
  defaultDate?: string; // New prop for conditional default date
  required?: boolean; // New prop for required field validation
}

const DatePicker: React.FC<IProps> = ({
  register,
  name,
  setValue,
  watch,
  errors,
  defaultDate,
  required,
}) => {
  const today = new Date().toISOString().split("T")[0]; // Default to today's date

  // Format defaultDate if it's in the "YYYY-MM-DD HH:MM:SS" format
  const formattedDefaultDate = defaultDate ? defaultDate.split(" ")[0] : today;
  const currentDate = watch ? watch(name) : formattedDefaultDate;

  // Set the date based on formattedDefaultDate or fallback to today if no value is selected
  useEffect(() => {
    if (!currentDate) {
      setValue(name, formattedDefaultDate);
    }
  }, [currentDate, setValue, name, formattedDefaultDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    const todayDate = new Date().toISOString().split("T")[0];

    if (selectedDate < todayDate) {
      // Set an error if the selected date is earlier than today
      setValue(name, selectedDate, { shouldValidate: true });
      errors[name] = {
        type: "manual",
        message: "Selected date cannot be earlier than today.",
      };
    } else {
      // Clear the error if the date is valid
      setValue(name, selectedDate, { shouldValidate: true });
      errors[name] = undefined;
    }
  };

  return (
    <div className="flex flex-col gap-[5px]">
      <label className="text-base font-normal text-black">
        Deadline {required && <span className="text-dangerPrimary">*</span>}
      </label>

      <button className="w-full flex justify-start items-center text-left font-normal rounded px-2 py-[2px] border border-brandLsPrimary">
        <input
          type="date"
          value={currentDate || today} // Set to formattedDefaultDate or today's date
          onChange={handleDateChange}
          placeholder="dd/mm/yyyy"
          className="w-full outline-none rounded px-2 py-1"
          min={today} // Set the minimum date to today
        />
        {errors && errors[name] && (
          <p className="text-red-500 text-sm mt-1 ml-6">
            {errors[name]?.message}
          </p>
        )}
      </button>
    </div>
  );
};

export default DatePicker; 