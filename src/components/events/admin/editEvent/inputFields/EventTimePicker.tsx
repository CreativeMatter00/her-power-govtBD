"use client";
import React, { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "./EventTimePicker.css";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface EventTimePickerProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  name: string;
  errors?: any;
  defaultValue?: string;
}

const EventTimePicker: React.FC<EventTimePickerProps> = ({
  register,
  setValue,
  watch,
  name,
  errors,
  defaultValue
}) => {
  const currentValue = watch(name);

  // Set default time to the current hour and minute
  const defaultTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  useEffect(() => {
    if (!watch(name) && defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue, watch]);


  const handleTimeChange = (newTime: string | null) => {
    setValue(name, newTime || defaultValue);
    console.log("Selected Time:", newTime);
  };

  return (
    <div>
      <TimePicker
        onChange={handleTimeChange}
        value={currentValue || defaultTime}
        format="h:mm a"
        amPmAriaLabel="Toggle AM/PM"
        clearIcon={null}
        clockIcon={null}
        disableClock={true}        
        className="w-full text-brandPrimary border border-brandLsPrimary rounded-full px-4 py-1.5"
      />
      {errors && (
        <p className="text-red-500 text-sm mt-1 ml-6">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default EventTimePicker;
