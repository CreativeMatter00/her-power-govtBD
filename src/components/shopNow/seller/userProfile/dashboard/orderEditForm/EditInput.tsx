import React from "react";

interface IFieldInfo {
  labelName: string;
  inputName: string;
  statusOptions: { [key: number]: string }; // Prop for order statuses
  statusValue?: number;
  errors: any;
  optional: boolean;
  onChange: (value: string) => void; // Function to handle status change
}

const EditInput: React.FC<IFieldInfo> = ({
  errors,
  labelName,
  inputName,
  statusOptions,
  statusValue,
  optional,
  onChange,
}) => {
  return (
    <div>
      <select
        className="mt-1 block outline-none text-base py-2 pl-6 border border-brandLsPrimary rounded w-full"
        onChange={(e) => onChange(e.target.value)} // Call onChange with the new value
        defaultValue={statusValue}
      >
        {Object.entries(statusOptions).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {errors[inputName] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[inputName]?.message}
        </p>
      )}
    </div>
  );
};

export default EditInput;
