"use client";
import React, { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface DatePickerProps {
  register: UseFormRegister<any>;
  name: string;
  setValue: UseFormSetValue<any>;
  watch?: UseFormWatch<any>;
  errors?: any;
}

const DatePicker: React.FC<DatePickerProps> = ({
  register,
  name,
  setValue,
  watch,
  errors,
}) => {
  const today = new Date().toISOString().split("T")[0]; // Default today's date
  const currentDate = watch ? watch(name) : today;

  // Set today's date if no value is selected
  useEffect(() => {
    if (!currentDate) {
      setValue(name, today);
    }
  }, [currentDate, setValue, name, today]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setValue(name, selectedDate);
    // console.log("Selected Date:", selectedDate);
  };

  return (
    <div className="relative">
      <button className="w-full flex justify-start items-center text-left text-brandPrimary font-normal border  border-brandLsPrimary rounded-full px-2 py-[2px]">
        <CalendarIcon className="mr-2 h-4 w-4" />
        <input
          type="date"
          value={currentDate || today} // Default to today
          onChange={handleDateChange}
          className="w-full   border-brandLsPrimary rounded px-2 py-1"
        />
        {errors && (
          <p className="text-red-500 text-sm mt-1 ml-6">
            {errors[name]?.message}
          </p>
        )}
      </button>

      <div className="absolute mt-2 bg-white shadow-md p-2 rounded"></div>
    </div>
  );
};

export default DatePicker;
