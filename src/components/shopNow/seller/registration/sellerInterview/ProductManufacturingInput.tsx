import React from "react";
import {
  Controller,
  UseFormRegister,
  FieldValues,
  Control,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// ------------------------ RADIO BUTTON ATTRIBUTES -----------------------
interface InputInfo {
  title: string;
  defaultValueInput: string;
  valueOne: string;
  valueTwo: string;
  valueThree: string;
  idOne: string;
  idTwo: string;
  idThree: string;
  htmlForAttributeOne: string;
  htmlForAttributeTwo: string;
  htmlForAttributeThree: string;
  labelNameOne: string;
  labelNameTwo: string;
  labelNameThree: string;
  name: string; // Changed to string for form handling
  register?: UseFormRegister<FieldValues>; // Optional register prop
  control?: Control<FieldValues>; // Optional control prop
  errors?: any; // Optional errors prop
}

const ProductManufacturingInput: React.FC<InputInfo> = ({
  title,
  defaultValueInput,
  valueOne,
  valueTwo,
  valueThree,
  idOne,
  idTwo,
  idThree,
  htmlForAttributeOne,
  htmlForAttributeTwo,
  htmlForAttributeThree,
  labelNameOne,
  labelNameTwo,
  labelNameThree,
  name,
  register,
  control,
  errors,
}) => {
  if (register) {
    // If register is provided, use uncontrolled components
    return (
      <div>
        <label className="text-brandDs text-base font-normal">{title}</label>
        <div className="my-2 text-brandPrimary">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={idOne}
                value={valueOne}
                {...register(name)} // Register the input
                className="border border-brandPrimary"
              />
              <Label htmlFor={htmlForAttributeOne}>{labelNameOne}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={idTwo}
                value={valueTwo}
                {...register(name)} // Register the input
                className="border border-brandPrimary"
              />
              <Label htmlFor={htmlForAttributeTwo}>{labelNameTwo}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={idThree}
                value={valueThree}
                {...register(name)} // Register the input
                className="border border-brandPrimary"
              />
              <Label htmlFor={htmlForAttributeThree}>{labelNameThree}</Label>
            </div>
          </div>
        </div>
        {errors && errors[name] && (
          <p className="text-red-500 text-xs mt-1 ml-6">
            {errors[name]?.message}
          </p>
        )}
      </div>
    );
  }

  // Return null if neither register nor control is provided
};

export default ProductManufacturingInput;
