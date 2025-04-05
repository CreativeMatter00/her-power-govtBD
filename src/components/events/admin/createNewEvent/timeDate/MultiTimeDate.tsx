import React, { useEffect, useState } from "react";
import DatePicker from "../inputFields/DatePicker";
import EventTimePicker from "../inputFields/EventTimePicker";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Checkbox } from "@radix-ui/react-checkbox";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useFormContext } from "react-hook-form";

const MultiTimeDate = () => {
  const [rows, setRows] = useState([{ id: Date.now() }]);

  // Function to add a new row
  const addRow = () => {
    setRows([...rows, { id: Date.now() }]);
  };

  // Function to remove a row
  const removeRow = (id: any) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useFormContext();

  const isMultiDate = watch("multiDateOrNot");

  return (
    <div>
      {/* ===================================== START / END INPUT =============================== */}

      {isMultiDate && (
        <div>
          {rows.map((row, index) => (
            <div key={row.id} className="flex flex-col gap-2 w-full mb-4">
              {/* ======================================== TITLE ============================ */}
              {index === 0 && (
                <label className="text-brandPrimary text-sm pl-6">
                  Start/End
                </label>
              )}

              {/* ===================================== INPUT FIELDS =============================== */}
              <div className="flex max-lg:flex-col items-center max-md:gap-3 gap-6">
                {/* ================================ START SCHEDULE ================================ */}
                <div className="w-full">
                  <DatePicker
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    name={`multiDates[${index}].startDate`}
                  />
                </div>
                <div className="w-full">
                  <EventTimePicker
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    name={`multiDates[${index}].startTime`}
                  />
                </div>

                {/* ================================== TO ================================== */}
                <p className="text-sm min-w-fit">-to-</p>

                {/* ================================ END SCHEDULE ================================ */}
                <div className="w-full">
                  <DatePicker
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    name={`multiDates[${index}].endDate`}
                  />
                </div>
                <div className="w-full">
                  <EventTimePicker
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    name={`multiDates[${index}].endTime`}
                  />
                </div>

                {/* =============================== REMOVE BUTTON =============================== */}
                {rows.length > 1 && (
                  <button
                    onClick={() => removeRow(row.id)}
                    className="rounded-full bg-dangerSecondary h-fit cursor-pointer"
                  >
                    <FaMinus className="text-bgPrimary p-2 w-10 h-10" />
                  </button>
                )}

                {/* =============================== ADD BUTTON =============================== */}
                {index === rows.length - 1 && (
                  <button
                    onClick={addRow}
                    className="rounded-full bg-link h-fit cursor-pointer"
                  >
                    <FaPlus className="text-bgPrimary p-2 w-10 h-10" />
                  </button>
                )}
              </div>
              {(errors.multiDates as any)?.[index] && (
                <p className="text-sm text-red-500">
                  {String((errors.multiDates as any)[index]?.message)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiTimeDate;
