import React from 'react';

interface FieldInfo {
  labelName: string;
  defaultData: any;
  fieldName: string;
  register: any;
  errors: any;
  type?: string;
}

const EditInputField: React.FC<FieldInfo> = ({
  labelName,
  defaultData,
  fieldName,
  register,
  errors,
  type
}) => {

  const handleNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and prevent negative values
    const value = event.target.value;

    if (value.startsWith('-')) {
      event.target.value = ''; // If negative sign is entered, reset the input
    }

    // Prevent any non-numeric characters other than decimal point
    if (type === "number" && isNaN(Number(value))) {
      event.target.value = value.replace(/[^0-9]/g, ''); // Replace anything that's not a number
    }
  };

  return (
    <div>
      <label className="text-brandPrimary text-sm pl-6">{labelName}</label>
      <input
        className="mt-1 block outline-none text-base py-2 px-6 border border-brandLsPrimary rounded-3xl w-full"
        type={type}
        defaultValue={defaultData}
        {...register(fieldName)}
        onInput={handleNumberInput} // Attach the custom handler for input
      />
      {errors[fieldName] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[fieldName]?.message}
        </p>
      )}
    </div>
  );
};

export default EditInputField;
