"use client";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import CreateEventHeading from "../CreateEventHeading";
import CreateEventInputField from "../inputFields/CreateEventInputField";
import { useState } from "react";
import EventCategorySelect from "../inputFields/SelectInput";
import EventLocationSelect from "../inputFields/EventLocationSelect";
import SelectInput from "./SelectInput";
import { useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getAllVenue } from "../../../../../api/api";
import ScaleLoader from "react-spinners/ScaleLoader";

const Location = () => {
  // ========================================= STATES INITIALIZED ======================================
  const [desiredLocation, setDesiredLocation] = useState<boolean>(false);
  const [virtualEvent, setShowVirtualEvent] = useState<boolean>(true);

  // =============================== TYPE DEFINITION =================================

  type TEventLocation = {
    venue_pid: string;
    venue_name: string;
    venue_title: string;
  };

  const {
    isLoading,
    isError,
    data: allVenue,
    refetch,
  } = useQuery({
    queryKey: ["allVenue"],
    queryFn: () => getAllVenue(),
  });

  // console.log(allVenue);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useFormContext();

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <section className="my-8">
      <section className="flex flex-col gap-4">
        <CreateEventHeading heading="Location" />

        {!virtualEvent && (
          <main className="flex flex-col gap-4">
            <div className="mr-6">
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
            </div>
            {errors?.locationVenue && (
        <p className="text-red-500 text-sm mt-1">
          {String(errors?.locationVenue?.message || "")}
        </p>
      )}
          </main>
        )}
        <button
          onClick={() => {
            setValue("virtualEvent", !virtualEvent);
            return setShowVirtualEvent(!virtualEvent);
          }}
          className="flex items-center gap-2 pl-6"
        >
          {virtualEvent ? (
            <MdCheckBox className="text-brandPrimary w-5 h-5" />
          ) : (
            <MdCheckBoxOutlineBlank className="text-brandPrimary w-5 h-5" />
          )}
          <p className="text-brandPrimary text-sm">Virtual event</p>
        </button>
      </section>
   
    </section>
  );
};

export default Location;
