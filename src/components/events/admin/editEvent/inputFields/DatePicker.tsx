import React, { useEffect } from "react";
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
  defaultValue?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  register,
  name,
  setValue,
  watch,
  errors,
  defaultValue,
}) => {
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!defaultValue) {
      setValue(name, today);
    }
  }, [defaultValue, name, setValue, today]);

  return (
    <div className="relative w-full">
      <div className="flex items-center border border-brandLsPrimary rounded-full px-2 py-[2px]">
        <CalendarIcon className="mr-2 h-4 w-4 text-brandPrimary" />
        <input
          type="date"
          {...register(name)}
          defaultValue={defaultValue || today}
          className="w-full border-none outline-none bg-transparent text-brandPrimary"
        />
      </div>
      {errors?.[name]?.message && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

export default DatePicker;
