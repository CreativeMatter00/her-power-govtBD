"use client";
import React, { useEffect } from "react";
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors, Controller } from "react-hook-form";

interface IProps {
  name: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch?: UseFormWatch<any>;
  errors?: FieldErrors<any>;
  defaultDate?: string;
  required?: boolean;
}

const DatePicker: React.FC<IProps> = ({
  name,
  register,
  setValue,
  watch,
  errors,
  defaultDate,
  required,
}) => {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  const formattedDefaultDate = defaultDate ? defaultDate.split(" ")[0] : today;
  const currentDate = watch ? watch(name) : formattedDefaultDate;

  useEffect(() => {
    if (!currentDate) {
      setValue(name, formattedDefaultDate);
    }
  }, [currentDate, setValue, name, formattedDefaultDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setValue(name, selectedDate, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col gap-[5px]">
      <label className="text-base font-normal text-black">
        Deadline {required && <span className="text-dangerPrimary">*</span>}
      </label>

      <div className="w-full">
        <input
          type="date"
          {...register(name, {
            required: required ? "This field is required." : false,
            validate: (value) => {
              const todayDate = new Date().toISOString().split("T")[0];
              return value > todayDate || "Please select a future date.";
            },
          })}
          value={currentDate || today}
          onChange={handleDateChange}
          min={today}
          placeholder="dd/mm/yyyy"
          className="w-full outline-none rounded px-2 py-1 border border-brandLsPrimary"
        />
        {errors?.[name] && (
          <p className="text-red-500 text-sm mt-1">
            {errors[name]?.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default DatePicker;