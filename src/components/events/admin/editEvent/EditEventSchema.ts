import { SUPPORTED_FORMATS } from "@/utils/constand";
import * as yup from "yup";
const FILE_SIZE = 10 * 1024 * 1024;
export const EditEventSchema = yup.object().shape({
  eventTitle: yup
    .string()
    .min(2, "Event title must be at least 2 characters long"),
  featuredOrNot: yup.boolean().notRequired(),
  eventCategory: yup
    .string()
    .test(
      "is-valid-category",
      "Please select a valid Category",
      (value) => value !== "Select Category"
    ),

  description: yup.string().required("Description is required"),
  virtualEvent: yup.boolean(),

  locationVenue: yup.string().when("virtualEvent", {
    is: false,
    then: () =>
      yup
        .string()
        .test(
          "is-valid-category",
          "Please select a valid Venue",
          (value) => value !== "Select Venue"
        ),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),

  notificationType: yup
    .string()
    .test(
      "is-valid-notification",
      "Please select a valid Notification Type",
      (value) => value !== "Notification Type"
    ),

  notificationSchedule: yup.string(),

  ticket_type: yup
    .string()
    .oneOf(["P", "F"], "Ticket type must be either 'P' (Paid) or 'F' (Free)"),

  tickets: yup.array().when("ticket_type", {
    is: "P",
    then: () =>
      yup.array().of(
        yup.object().shape({
          ticket_name: yup
            .string()
            .min(2, "Ticket name must be at least 2 characters long"),
          ticket_price: yup
            .number()
            .transform((value, originalValue) =>
              String(originalValue).trim() === "" ? undefined : value
            )
            .min(0, "Ticket price cannot be negative"),
          Facilities: yup
            .string()
            .min(
              10,
              "Facilities description must be at least 10 characters long"
            ),
        })
      ),
    otherwise: () => yup.array().notRequired(),
  }),
  thumbnail: yup
    .mixed<File | string>()
    .required("Please upload a thumbnail.")
    .test("fileOrUrl", "thumbnail is required", (value) => {
      return value !== null && !!value;
    })
    .test("fileValidation", "Invalid file format or size", (value) => {
      if (!value || typeof value === "string") return true;
      return (
        value instanceof File &&
        value.size <= FILE_SIZE &&
        SUPPORTED_FORMATS.includes(value.type)
      );
    }),
  eventBanner: yup
    .mixed<File | string>()
    .required("Please upload a banner.")
    .test("fileOrUrl", "Banner is required", (value) => {
      return value !== null && !!value;
    })
    .test("fileValidation", "Invalid file format or size", (value) => {
      if (!value || typeof value === "string") return true;

      // If it's a file, check size and format
      return (
        value instanceof File &&
        value.size <= FILE_SIZE &&
        SUPPORTED_FORMATS.includes(value.type)
      );
    }),
  // New fields for event date and time
  singleDateOrNot: yup.boolean(),
  multiDateOrNot: yup.boolean(),
  breakDownOrNot: yup.boolean(),

  singleDate: yup.object().when("singleDateOrNot", {
    is: true,
    then: () =>
      yup
        .object()
        .shape({
          schedule_pid: yup.string(),
          eventStartDate: yup.string(), //.required("Start date is required"),
          eventStartTime: yup.string(), //.required("Start time is required"),
          eventEndDate: yup.string(), //.required("End date is required"),
          eventEndTime: yup.string(), //.required("End time is required"),
        })
        .test(
          "is-start-before-end",
          "Event start date and time must be before end date and time",
          function (value) {
            const {
              eventStartDate,
              eventStartTime,
              eventEndDate,
              eventEndTime,
            } = value;
            const startDateTime = `${eventStartDate}T${eventStartTime}`;
            const endDateTime = `${eventEndDate}T${eventEndTime}`;
            const isValid = new Date(startDateTime) < new Date(endDateTime);
            return isValid;
          }
        ),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  multiDates: yup.array().when("multiDateOrNot", {
    is: true,
    then: () =>
      yup
        .array()
        .of(
          yup
            .object()
            .shape({
              schedule_pid: yup.string(),
              startDate: yup.string(), //.required("Start date is required"),
              startTime: yup.string(), //.required("Start time is required"),
              endDate: yup.string(), //.required("End date is required"),
              endTime: yup.string(), //.required("End time is required"),
            })
            .test(
              "is-start-before-end",
              "Event start date and time must be before end date and time",
              function (value) {
                const { startDate, startTime, endDate, endTime } = value;
                const startDateTime = `${startDate}T${startTime}`;
                const endDateTime = `${endDate}T${endTime}`;
                const isValid = new Date(startDateTime) < new Date(endDateTime);
                return isValid;
              }
            )
        )
        .min(1, "At least one date range is required"), // Ensure the array has at least one object
    otherwise: (schema) => schema.nullable().notRequired(), // Skip validation if `singleDateOrNot` is `false`
  }),
  segments: yup.array().when("breakDownOrNot", {
    is: true,
    then: () =>
      yup.array().of(
        yup
          .object()
          .shape({
            schedule_pid: yup.string(),
            segmentName: yup.string(), //.required("Segment Name is required"),
            speaker: yup.string().optional(),
            breakDownEventStartDate: yup.string(), //.required("Start date is required"),
            breakDownEventStartTime: yup.string(), //.required("Start time is required"),
            breakDownEventEndDate: yup.string(), //.required("End date is required"),
            breakDownEventEndTime: yup.string(), //.required("End time is required"),
          })
          .test(
            "is-start-before-end",
            "Event start date and time must be before end date and time",
            function (value) {
              const {
                breakDownEventStartDate,
                breakDownEventStartTime,
                breakDownEventEndDate,
                breakDownEventEndTime,
              } = value;

              const startDateTime = `${breakDownEventStartDate}T${breakDownEventStartTime}`;
              const endDateTime = `${breakDownEventEndDate}T${breakDownEventEndTime}`;
              const isValid = new Date(startDateTime) < new Date(endDateTime);
              return isValid;
            }
          )
      ),
    otherwise: (schema) => schema.nullable().notRequired(), // Skip validation if `singleDateOrNot` is `false`
  }),
});
export type IEditEvent = yup.InferType<typeof EditEventSchema>;
