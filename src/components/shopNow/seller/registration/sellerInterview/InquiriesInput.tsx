import React from "react";
import {
  Controller,
  UseFormRegister,
  UseFormGetValues,
  FieldValues,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// --------------- RADIO BUTTON ATTRIBUTES ---------------------
interface InputInfo {
  title: string;
  name: string; // Added this for form handling
  defaultValueInput: string;
  valueOne: string;
  valueTwo: string;
  idOne: string;
  idTwo: string;
  htmlForAttributeOne: string;
  htmlForAttributeTwo: string;
  labelNameOne: string;
  labelNameTwo: string;
  register?: UseFormRegister<FieldValues>; // Optional register prop
  control?: any; // Optional control prop
  errors?: any; // Optional errors prop
}

const InquiriesInput: React.FC<InputInfo> = ({
  title,
  name,
  defaultValueInput,
  valueOne,
  valueTwo,
  idOne,
  idTwo,
  htmlForAttributeOne,
  htmlForAttributeTwo,
  labelNameOne,
  labelNameTwo,
  register,
  control,
  errors,
}) => {
  if (register) {
    // If register is provided, use uncontrolled components
    return (
      <div className="md:px-6">
        <label className="text-brandDs text-base font-normal">{title}</label>
        <div className="my-2 text-brandPrimary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={idOne}
                value={valueOne}
                {...register(name)}
                className="border border-brandPrimary"
              />
              <Label htmlFor={htmlForAttributeOne}>{labelNameOne}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={idTwo}
                value={valueTwo}
                {...register(name)}
                className="border border-brandPrimary"
              />
              <Label htmlFor={htmlForAttributeTwo}>{labelNameTwo}</Label>
            </div>
          </div>
        </div>
        {errors && errors[name] && (
          <p className="text-red-500 text-sm mt-1 ml-6">
            {errors[name]?.message}
          </p>
        )}
      </div>
    );
  }

  if (control) {
    // If control is provided, use controlled components
    return (
      <div>
        <label className="text-brandDs text-base font-normal">{title}</label>
        <div className="ml-2 text-brandPrimary">
          <Controller
            name={name} // The name used to register the field
            control={control} // The control object from react-hook-form
            defaultValue={defaultValueInput}
            render={({ field }) => (
              <RadioGroup {...field} className="flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      className="border border-brandPrimary"
                      value={valueOne}
                      id={idOne}
                      checked={field.value === valueOne} // Manage the checked state
                      onChange={() => field.onChange(valueOne)} // Update value on change
                    />
                    <Label htmlFor={htmlForAttributeOne}>{labelNameOne}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      className="border border-brandPrimary"
                      value={valueTwo}
                      id={idTwo}
                      checked={field.value === valueTwo} // Manage the checked state
                      onChange={() => field.onChange(valueTwo)} // Update value on change
                    />
                    <Label htmlFor={htmlForAttributeTwo}>{labelNameTwo}</Label>
                  </div>
                </div>
              </RadioGroup>
            )}
          />
        </div>
      </div>
    );
  }

  return null; // Return null if neither register nor control is provided
};

export default InquiriesInput;
