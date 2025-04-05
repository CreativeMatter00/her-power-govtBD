"use client";

import { useFieldArray, useForm } from "react-hook-form";

function TestMahfuz() {
  const { control, register } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "test", // unique name for your Field Array
    }
  );

  return (
    <div className="border-4 border-red-600">
      {fields.map((field, index) => (
        <input
          className="p-10 border-2 border-green-700"
          key={field.id} // important to include key with field's id
          {...register(`test.${index}.value`)}
        />
      ))}
    </div>
  );
}

export default TestMahfuz;
