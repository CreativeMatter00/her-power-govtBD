"use client";

import { useEffect, useState } from "react";
import CreateEventHeading from "../CreateEventHeading";
import CreateEventInputField from "../inputFields/CreateEventInputField";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from "react-icons/io";
import { useForm, useFormContext } from "react-hook-form";
import TextInput from "../inputFields/TextInput";

interface ITickerPricingProp {
  onUpdate: any;
}

const TicketPricing = () => {
  const [eventFreeOrPaid, setEventFreeOrPaid] = useState<string>("Paid");
  const [textDescription, setTextDescription] = useState<string>("");

  const [sections, setSections] = useState<{ id: number }[]>([
    { id: Date.now() },
  ]);

  const addSection = () => {
    setSections([...sections, { id: Date.now() }]);
  };

  const removeSection = (id: number) => {
    if (sections.length > 1) {
      setSections(sections.filter((section) => section.id !== id));
    }
  };

  const handleTicketTypeChange = (type: string) => {
    setValue("ticket_type", type === "Paid" ? "P" : "F");
    setEventFreeOrPaid(type);
  };

  useEffect(() => {
    setValue("ticket_type", "P");
  }, []);

  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
    control,
  } = useFormContext();

  return (
    <section className="my-8">
      <main className="flex flex-col gap-4">
        <CreateEventHeading heading="Registration Fee" />

        <div className="flex justify-between">
          <div className="flex items-center">
            <button
              onClick={() => handleTicketTypeChange("Free")}
              className="flex items-center gap-2 pl-6"
            >
              {eventFreeOrPaid === "Free" ? (
                <IoIosRadioButtonOn className="text-brandPrimary w-5 h-5" />
              ) : (
                <IoIosRadioButtonOff className="text-brandPrimary w-5 h-5" />
              )}
              <p className="text-brandPrimary text-sm">Free</p>
            </button>

            <button
              onClick={() => handleTicketTypeChange("Paid")}
              className="flex items-center gap-2 pl-6"
            >
              {eventFreeOrPaid === "Paid" ? (
                <IoIosRadioButtonOn className="text-brandPrimary w-5 h-5" />
              ) : (
                <IoIosRadioButtonOff className="text-brandPrimary w-5 h-5" />
              )}
              <p className="text-brandPrimary text-sm">Paid</p>
            </button>
          </div>

          {eventFreeOrPaid === "Paid" && (
            <button onClick={addSection} className="rounded-full bg-link h-fit">
              <FaPlus className="text-bgPrimary p-2 w-10 h-10" />
            </button>
          )}
        </div>

        {eventFreeOrPaid === "Paid" &&
          sections.map((section, index) => (
            <div key={section.id}>
              <div className="flex max-lg:flex-col items-end max-md:gap-2 gap-6 mb-4">
                <div className="max-lg:w-full w-1/2">
                  <CreateEventInputField
                    label="Ticket"
                    name={`tickets[${index}].ticket_name`}
                    errors={errors}
                    register={register}
                    inputType="text"
                    placeholderText="Enter ticket name"
                    required={true}
                  />
                  {Array.isArray(errors.tickets) && errors.tickets?.[index]?.ticket_name && (
  <p className="text-danger text-sm text-red-500">
    {errors.tickets[index].ticket_name.message}
  </p>
)}
                </div>
                <div className="max-lg:w-full w-1/2">
                  <div className="flex gap-6 items-end">
                    <div className="max-lg:w-full w-1/2">
                      <CreateEventInputField
                        label="Price"
                        name={`tickets[${index}].ticket_price`}
                        errors={errors}
                        register={register}
                        inputType="number"
                        placeholderText="Enter price"
                        required={true}
                      />
                      { Array.isArray(errors.tickets) && errors.tickets?.[index]?.ticket_price && (
  <p className="text-danger text-sm text-red-500">
    {errors.tickets?.[index].ticket_price.message}
  </p>
)}
                    </div>
                    <button
                      onClick={() => removeSection(section.id)}
                      disabled={sections.length === 1}
                      className={`rounded-full ${sections.length === 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-dangerSecondary"
                        } h-fit`}
                    >
                      <FaMinus className="text-bgPrimary p-2 w-10 h-10" />
                    </button>
                  </div>
                </div>
              </div>

              <TextInput
                setTextDescription={setTextDescription}
                errors={errors}
                control={control}
                labelName="Facilities"
                required={true}
                inputName={`tickets[${index}].Facilities`}
              />
              { Array.isArray(errors.tickets) &&errors.tickets?.[index]?.Facilities && (
  <p className="text-danger text-sm text-red-500">
    {errors.tickets?.[index].Facilities.message}
  </p>
)}
            </div>
          ))}
      </main>
    </section>
  );
};

export default TicketPricing;
