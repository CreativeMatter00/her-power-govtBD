import React, { useEffect, useState } from "react";
import DatePicker from "../inputFields/DatePicker";
import EventTimePicker from "../inputFields/EventTimePicker";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Checkbox } from "@radix-ui/react-checkbox";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useFormContext } from "react-hook-form";
import CreateEventInputField from "../inputFields/CreateEventInputField";

const MultiTimeDate = ({ multiSchedule }: { multiSchedule?: any }) => {
  const [rows, setRows] = useState([{ id: Date.now() }]);

  // Function to add a new row
  // const addRow = () => {
  //   setRows([...rows, { id: Date.now() }]);
  // };

  // // Function to remove a row
  // const removeRow = (id: any) => {
  //   setRows(rows.filter((row) => row.id !== id));
  // };

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
      {/* // ! Check */}
      {isMultiDate && (
        <div>
          {multiSchedule?.map((row: any, index: any) => (
            <div key={row.id} className="flex flex-col gap-2 w-full mb-4">
              {/* ======================================== TITLE ============================ */}
              {index === 0 && (
                <label className="text-brandPrimary text-sm pl-6">
                  Start/End
                </label>
              )}
                <input
                  type="hidden"
                  {...register(`multiDates[${index}].schedule_pid`)}
                  defaultValue={row.schedule_pid}
                />
              {/* ===================================== INPUT FIELDS =============================== */}
              <div className="flex max-lg:flex-col items-center max-md:gap-3 gap-6">
                {/* ================================ START SCHEDULE ================================ */}

                <CreateEventInputField
                  inputType="hidden"
                  placeholderText=""
                  label=""
                  name="multiDate.schedule_pid"
                  errors={errors}
                  register={register}
                  required={true}
                  defaultValue={row?.schedule_pid}
                />

                <div className="w-full">
                  <DatePicker
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    name={`multiDates[${index}].startDate`}
                    defaultValue={row?.start_datetime && row?.start_datetime}
                  />
                </div>
                <div className="w-full">
                  <EventTimePicker
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    name={`multiDates[${index}].startTime`}
                    defaultValue={row?.from_time && row?.from_time}
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
                    defaultValue={row?.end_datetime && row?.end_datetime}
                  />
                </div>
                <div className="w-full">
                  <EventTimePicker
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    name={`multiDates[${index}].endTime`}
                    defaultValue={row?.to_time && row?.to_time}
                  />
                </div>

                {/* =============================== REMOVE BUTTON =============================== */}
                {/* {multiSchedule.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    className="rounded-full bg-dangerSecondary h-fit cursor-pointer"
                  >
                    <FaMinus className="text-bgPrimary p-2 w-10 h-10" />
                  </button>
                )} */}

                {/* =============================== ADD BUTTON =============================== */}
                {/* {index === multiSchedule.length - 1 && (
                  <button
                    type="button"
                    onClick={addRow}
                    className="rounded-full bg-link h-fit cursor-pointer"
                  >
                    <FaPlus className="text-bgPrimary p-2 w-10 h-10" />
                  </button>
                )} */}
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
