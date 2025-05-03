"use client";
import CreateEventHeading from "../CreateEventHeading";
import CreateEventInputField from "../inputFields/CreateEventInputField";
import { BsInfoCircle } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { getAllVenue } from "@/api/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import SelectInput from "./SelectInput";
import { useEffect } from "react";

// =============================== EVENT CATEGORY TYPE DEFINITION =================================
type TEventCategory = {
  dataName: string;
  dataValue: string;
};

// =============================== EVENT CATEGORY STATIC DATA ================================
// const eventCategories: TEventCategory[] = [
// 	{
// 		dataName: "Hackathon",
// 		dataValue: "hackathon",
// 	},
// 	{
// 		dataName: "Data Innovation",
// 		dataValue: "dataInnovation",
// 	},
// 	{
// 		dataName: "Digital Marketing Fest",
// 		dataValue: "digitalMarketingFest",
// 	},
// 	{
// 		dataName: "BCS Mela",
// 		dataValue: "bcsMela",
// 	},
// 	{
// 		dataName: "Women Entrepreneur Fair",
// 		dataValue: "womenEntrepreneurFair",
// 	},
// 	{
// 		dataName: "Workshops",
// 		dataValue: "workshops",
// 	},
// 	{
// 		dataName: "Webinars",
// 		dataValue: "webinars",
// 	},
// 	{
// 		dataName: "Networking Events",
// 		dataValue: "networkingEvents",
// 	},
// 	{
// 		dataName: "Training Sessions",
// 		dataValue: "trainingSessions",
// 	},
// 	{
// 		dataName: "Digital Marketing Fest",
// 		dataValue: "digitalMarketingFest",
// 	},
// 	{
// 		dataName: "BCS Mela",
// 		dataValue: "bcsMela",
// 	},
// 	{
// 		dataName: "Women Entrepreneur Fair",
// 		dataValue: "womenEntrepreneurFair",
// 	},
// 	{
// 		dataName: "Workshops",
// 		dataValue: "workshops",
// 	},
// 	{
// 		dataName: "Webinars",
// 		dataValue: "webinars",
// 	},
// 	{
// 		dataName: "Networking Events",
// 		dataValue: "networkingEvents",
// 	},
// 	{
// 		dataName: "Training Sessions",
// 		dataValue: "trainingSessions",
// 	},
// ];

const allData: any[] = [
  {
    data_id: "001",
    data_name: "In App",
    data_value: "in-app",
  },
  {
    data_id: "002",
    data_name: "Email",
    data_value: "email",
  },
  {
    data_id: "003",
    data_name: "SMS",
    data_value: "sms",
  },
];

const Notification = ({eventData}:{eventData?:any}) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useFormContext();


  useEffect(() => {
    if (eventData) {
      setValue("notificationType", eventData.notification?.notification_media);
      setValue("notificationSchedule", eventData.notification?.notification_days);
    }
  }, [eventData, setValue]);

  return (
    <section className="my-8">
      <main className="flex flex-col gap-4">
        <CreateEventHeading heading="Notification" />

        <div className="mr-6">
          <SelectInput
            allData={allData}
            labelName="Notification"
            inputName={"notificationType"}
            placeholderText="Notification type"
            register={register}
            required={true}
            defaultValue={eventData?.notification?.notification_media}
          />
          {errors?.notificationType && (
              <p className="text-sm text-red-500">
                {String(errors.notificationType?.message)}
              </p>
            )}
        </div>
        {/* ===================== INPUT FIELD & BUTTON ==================== */}
        <div className="w-1/2">
          <CreateEventInputField
            label="Notification Schedule"
            name={"notificationSchedule"}
            errors={errors}
            register={register}
            inputType="text"
            placeholderText="Enter number of days before event"
            defaultValue={eventData?.notification?.notification_days}
          />
        </div>

        {/* ==================== MORE INFO ====================== */}
        <div className="flex items-center gap-2">
          <BsInfoCircle />
          <p className="text-sm text-greyPrimary">
            specify how many days before the event to send notifications
          </p>
        </div>
      </main>
    </section>
  );
};

export default Notification;
