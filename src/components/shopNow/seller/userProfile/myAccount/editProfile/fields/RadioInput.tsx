import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { Controller } from "react-hook-form";

interface IInfo {
  title: string;
  defaultValueInput: string | null;
  labelNameOne: string;
  labelNameTwo: string;
  labelNameThree?: string;
  idOne: string;
  idTwo: string;
  idThree?: string;
  valueOne: string;
  valueTwo: string;
  valueThree?: string;
  htmlForAttributeOne: string;
  htmlForAttributeTwo: string;
  htmlForAttributeThree?: string;
  buttonStyle: string;
  topMargin: string;
  control: any; // Control from react-hook-form
  fieldName: string;
  errors: any;
}

const RadioInput: React.FC<IInfo> = ({
  title,
  defaultValueInput,
  labelNameOne,
  labelNameTwo,
  labelNameThree = "",
  idOne,
  idTwo,
  idThree,
  valueOne,
  valueTwo,
  valueThree = "",
  htmlForAttributeOne,
  htmlForAttributeTwo,
  htmlForAttributeThree = "",
  buttonStyle,
  topMargin,
  control, // Receive control here
  fieldName, // Field name for the Controller
  errors,
}) => {
  return (
    <div className={`px-6 ${topMargin}`}>
      <label className="text-brandDs text-base font-normal">{title}</label>
      <div className="my-2">
        {/* Use Controller directly inside RadioInput */}
        <Controller
          name={fieldName}
          control={control}
          defaultValue={defaultValueInput} // Default value for the radio group
          render={({ field: { value, onChange } }) => (
            <RadioGroup
              className={`${buttonStyle}`}
              value={value}
              onValueChange={onChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={valueOne} id={idOne} />
                <Label htmlFor={htmlForAttributeOne}>{labelNameOne}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={valueTwo} id={idTwo} />
                <Label htmlFor={htmlForAttributeTwo}>{labelNameTwo}</Label>
              </div>
              {idThree && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={valueThree} id={idThree} />
                  <Label htmlFor={htmlForAttributeThree}>
                    {labelNameThree}
                  </Label>
                </div>
              )}
            </RadioGroup>
          )}
        />
        {/* Display error message */}
        {errors[fieldName] && (
          <p className="text-danger text-sm mt-1">
            {errors[fieldName]?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default RadioInput;
