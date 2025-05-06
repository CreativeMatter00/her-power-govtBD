"use client";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from "react-icons/io";
import CreateEventHeading from "../CreateEventHeading";
import { FaPlus } from "react-icons/fa6";
import DatePicker from "../inputFields/DatePicker";
import EventTimePicker from "../inputFields/EventTimePicker";
import { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import CreateEventInputField from "../inputFields/CreateEventInputField";
import { AiOutlineDelete } from "react-icons/ai";
import MultiTimeDate from "./MultiTimeDate";
import SelectInput from "./SelectInput";
import { useQuery } from "@tanstack/react-query";
import { getAllSpeakers } from "@/api/api";
import { useFormContext } from "react-hook-form";
import ScaleLoader from "react-spinners/ScaleLoader";

interface Segment {
  schedule_pid: string;
  id: number;
  start_datetime: string;
  from_time: string;
  end_datetime: string;
  to_time: string;
}

const TimeDate = ({ eventData }: { eventData?: any }) => {

  const [selectedOption, setSelectedOption] = useState<
    "singleDate" | "multiDate" | "breakDown"
  >("singleDate");

  const [segments, setSegments] = useState<Segment[]>([]);


  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const { isLoading, data: allSpeakers } = useQuery({
    queryKey: ["allSpeakers"],
    queryFn: () => getAllSpeakers(),
  });

  const handleOptionChange = (
    option: "singleDate" | "multiDate" | "breakDown"
  ) => {
    setSelectedOption(option);
    setValue("multiDateOrNot", option === "multiDate");
    setValue("singleDateOrNot", option === "singleDate");
    setValue("breakDownOrNot", option === "breakDown");
  };

  useEffect(() => {
    if (eventData?.event_schedule?.length === 1) {
      setSelectedOption("singleDate");
    } else if (
      eventData?.event_schedule?.length > 1 &&
      eventData?.event_schedule?.[0]?.segment_name === null
    ) {
      // console.log("Segment Name ----------------===>",eventData?.event_schedule?.[0]?.segment_name)
      setSelectedOption("multiDate");
    } else {
      // console.log("Segment Name ----------------===>",eventData?.event_schedule?.[0]?.segment_name)
      setSelectedOption("breakDown");
    }
  }, [
    setSelectedOption,
    eventData?.event_schedule?.length,
    eventData?.event_schedule?.[0]?.segment_name,
  ]);

  useEffect(() => {
    // Update form values when the selected option changes
    setValue("multiDateOrNot", selectedOption === "multiDate");
    setValue("singleDateOrNot", selectedOption === "singleDate");
    setValue("breakDownOrNot", selectedOption === "breakDown");
  }, [selectedOption, setValue]);

  useEffect(() => {
    if (eventData?.event_schedule) {
      setSegments(eventData.event_schedule);
    }
  }, [eventData]);

  // const addSegment = () => {
  //   setSegments([
  //     ...segments,
  //     {
  //       schedule_pid: "",
  //       id: segments.length + 1,
  //       start_datetime: "",
  //       from_time: "",
  //       end_datetime: "",
  //       to_time: "",
  //     },
  //   ]);
  // };

  // const deleteSegment = (id: number) => {
  //   if (segments.length > 1) {
  //     setSegments(segments.filter((segment) => segment.id !== id));
  //   }
  // };
  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );
    
  return (
    <section className="my-8">
      <CreateEventHeading heading="Time & Date" />

      <main className="flex flex-col gap-4">
        <div className="flex items-start gap-8 my-4">
          {/* Single Date Toggle */}
          {selectedOption === "singleDate" && (
            <button
              type="button"
              onClick={() => handleOptionChange("singleDate")}
              className="flex items-center gap-2"
            >
              {selectedOption === "singleDate" ? (
                <IoIosRadioButtonOn className="text-brandPrimary w-5 h-5" />
              ) : (
                <IoIosRadioButtonOff className="text-brandPrimary w-5 h-5" />
              )}
              <p className="text-brandPrimary text-sm">Single Day Event</p>
            </button>
          )}
          {/* Multi Date Toggle */}
          {selectedOption === "multiDate" && (
            <button
              type="button"
              onClick={() => handleOptionChange("multiDate")}
              className="flex items-center gap-2"
            >
              {selectedOption === "multiDate" ? (
                <IoIosRadioButtonOn className="text-brandPrimary w-5 h-5" />
              ) : (
                <IoIosRadioButtonOff className="text-brandPrimary w-5 h-5" />
              )}
              <p className="text-brandPrimary text-sm">Multiple Day Event</p>
            </button>
          )}
          {/* Breakdown Toggle */}
          {selectedOption === "breakDown" && (
            <button
              type="button"
              onClick={() => handleOptionChange("breakDown")}
              className="flex items-center gap-2"
            >
              {selectedOption === "breakDown" ? (
                <IoIosRadioButtonOn className="text-brandPrimary w-5 h-5" />
              ) : (
                <IoIosRadioButtonOff className="text-brandPrimary w-5 h-5" />
              )}
              <div className="text-brandPrimary text-sm flex items-center gap-2">
                Breakdown:
                <span className="text-sm text-greyPrimary">
                  Specify the timing of every segment
                </span>
              </div>
            </button>
          )}
        </div>

        {/* Conditional Rendering for Single Date */}
        {selectedOption === "singleDate" &&
          eventData &&
          segments?.map(
            (
              schedule: {
                schedule_pid: string;
                start_datetime: string;
                from_time: string;
                end_datetime: string;
                to_time: string;
              },
              index: number
            ) => (
              <div key={index} className="flex flex-col gap-2 w-full">
                <input
                  type="hidden"
                  {...register("singleDate.schedule_pid")}
                  defaultValue={schedule.schedule_pid}
                />

                <label className="text-brandPrimary text-sm pl-6">
                  Start/End <span className="text-red-500">*</span>
                </label>
                <div className="flex max-lg:flex-col items-center max-md:gap-3 gap-6">
                  <div className="w-full">
                    <DatePicker
                      register={register}
                      watch={watch}
                      setValue={setValue}
                      name="singleDate.eventStartDate"
                      errors={errors}
                      defaultValue={schedule.start_datetime}
                    />
                  </div>
                  <div className="w-full">
                    <EventTimePicker
                      register={register}
                      watch={watch}
                      setValue={setValue}
                      name="singleDate.eventStartTime"
                      errors={errors}
                      defaultValue={schedule.from_time}
                    />
                  </div>
                  <p className="text-sm min-w-fit">-to-</p>
                  <div className="w-full">
                    <DatePicker
                      register={register}
                      watch={watch}
                      setValue={setValue}
                      name="singleDate.eventEndDate"
                      errors={errors}
                      defaultValue={schedule.end_datetime}
                    />
                  </div>
                  <div className="w-full">
                    <EventTimePicker
                      register={register}
                      watch={watch}
                      setValue={setValue}
                      name="singleDate.eventEndTime"
                      errors={errors}
                      defaultValue={schedule.to_time}
                    />
                  </div>
                  <CreateEventInputField
                    inputType="hidden"
                    placeholderText=""
                    label=""
                    name="singleDate.schedule_pid"
                    errors={errors}
                    register={register}
                    required={true}
                    defaultValue={schedule?.schedule_pid}
                  />
                </div>
                {errors?.singleDate && (
                  <p className="text-sm text-red-500">
                    {String(errors.singleDate?.message)}
                  </p>
                )}
              </div>
            )
          )}

        {/* Conditional Rendering for Multi Date */}
        {selectedOption === "multiDate" && (
          <MultiTimeDate multiSchedule={eventData?.event_schedule} />
        )}

        {/* Breakdown Handling */}
        {selectedOption === "breakDown" && (
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>Current Segments</div>
              {/* <button
                type="button"
                className="rounded-full bg-link h-fit cursor-pointer"
                onClick={addSegment}
              >
                <FaPlus className="text-bgPrimary p-2 w-10 h-10" />
              </button> */}
            </div>
            {eventData?.event_schedule?.map((segment: any, index: number) => (
              <div key={index} className="relative border p-4 rounded-md mb-4">
                <div className="flex max-lg:flex-col items-center gap-6 w-full">
                  <div className="max-lg:w-full basis-1/2">
                    <input
                      type="hidden"
                      {...register(`segments[${index}]..schedule_pid`)}
                      defaultValue={segment.schedule_pid}
                    />
                    <CreateEventInputField
                      label={`Segment ${index + 1}`}
                      placeholderText="Enter segment name here..."
                      register={register}
                      name={`segments[${index}].segmentName`}
                      errors={errors}
                      defaultValue={segment?.segment_name}
                    />
                    {(errors.segments as any)?.[index]?.segmentName && (
                      <p className="text-sm text-red-500">
                        {(errors.segments as any)[index].segmentName.message}
                      </p>
                    )}
                  </div>
                  <div className="max-lg:w-full basis-1/2">
                    <SelectInput
                      allData={allSpeakers}
                      labelName="Speaker Name"
                      placeholderText="Enter speaker name here..."
                      filedWidth="w-full"
                      optionalField={true}
                      keyName="speaker_name"
                      valueName="speaker_pid"
                      register={register}
                      name={`segments[${index}].speaker`}
                      errors={errors}
                      defaultValue={segment?.speaker_pid}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full mt-2">
                  <label className="text-brandPrimary text-sm pl-6">
                    Timing
                  </label>
                  <div className="flex max-lg:flex-col items-center max-md:gap-3 gap-6">
                    <CreateEventInputField
                      inputType="hidden"
                      placeholderText=""
                      label=""
                      name="breakDown.schedule_pid"
                      errors={errors}
                      register={register}
                      required={true}
                      defaultValue={segment?.schedule_pid}
                    />
                    <div className="w-full">
                      <DatePicker
                        register={register}
                        watch={watch}
                        setValue={setValue}
                        name={`segments[${index}].startDate`}
                        errors={errors}
                      />
                    </div>
                    <div className="w-full">
                      <EventTimePicker
                        register={register}
                        watch={watch}
                        setValue={setValue}
                        name={`segments[${index}].startTime`}
                        errors={errors}
                      />
                    </div>
                    <p className="text-sm min-w-fit">-to-</p>
                    <div className="w-full">
                      <DatePicker
                        register={register}
                        watch={watch}
                        setValue={setValue}
                        name={`segments[${index}].endDate`}
                        errors={errors}
                      />
                    </div>
                    <div className="w-full">
                      <EventTimePicker
                        register={register}
                        watch={watch}
                        setValue={setValue}
                        name={`segments[${index}].endTime`}
                        errors={errors}
                      />
                    </div>
                  </div>
                  {(errors.segments as any)?.[index] && (
                    <p className="text-sm text-red-500">
                      {String((errors.segments as any)?.[index]?.message)}
                    </p>
                  )}
                </div>
                {/* {segments.length > 1 && (
                  <div className="absolute top-3 right-3 cursor-pointer">
                    <AiOutlineDelete
                      className="text-bgPrimary w-6 h-6"
                      onClick={() => deleteSegment(segment.id)}
                    />
                  </div>
                )} */}
              </div>
            ))}
          </div>
        )}
      </main>
    </section>
  );
};

export default TimeDate;
