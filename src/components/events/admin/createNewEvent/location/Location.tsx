"use client";

import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import CreateEventHeading from "../CreateEventHeading";
import CreateEventInputField from "../inputFields/CreateEventInputField";
import SelectInput from "./SelectInput";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getAllVenue } from "../../../../../api/api";
import ScaleLoader from "react-spinners/ScaleLoader";

const Location = () => {
  const [showVirtual, setShowVirtual] = useState(false);

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const virtualEvent = watch("virtualEvent");

  const {
    isLoading,
    data: allVenue,
  } = useQuery({
    queryKey: ["allVenue"],
    queryFn: () => getAllVenue(),
  });

  useEffect(() => {
    if (virtualEvent) {
      setValue("locationVenue", ""); // Clear venue if virtual is true
    }
  }, [virtualEvent, setValue]);

  if (isLoading)
    return (
      <div className="w-full h-64 flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <section className="my-8">
      <CreateEventHeading heading="Location" />

      {!virtualEvent && (
        <div className="flex flex-col gap-4">
          <SelectInput
            allData={allVenue}
            labelName="Select Venue"
            inputName="locationVenue"
            placeholderText="Select Venue"
            filedWidth="w-1/2 max-lg:w-full"
            optionalField={false}
            register={register}
            required={true}
          />
          {errors?.locationVenue && (
            <p className="text-red-500 text-sm">
              {String(errors?.locationVenue?.message || "")}
            </p>
          )}
        </div>
      )}

      {/* Hidden input for form tracking */}
      <input type="hidden" {...register("virtualEvent")} />

      <button
        type="button"
        onClick={() => {
          const newValue = !virtualEvent;
          setValue("virtualEvent", newValue, { shouldDirty: true, shouldValidate: true });
          setShowVirtual(newValue);
        }}
        className="flex items-center gap-2 pl-6 mt-4"
      >
        {virtualEvent ? (
          <MdCheckBox className="text-brandPrimary w-5 h-5" />
        ) : (
          <MdCheckBoxOutlineBlank className="text-brandPrimary w-5 h-5" />
        )}
        <p className="text-brandPrimary text-sm">Virtual event</p>
      </button>
    </section>
  );
};

export default Location;
