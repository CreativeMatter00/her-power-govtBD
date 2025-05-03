import * as yup from "yup";

const EditEventSchema = yup.object().shape({
  eventTitle: yup
    .string()
    // .required("Event title is required")
    .min(2, "Event title must be at least 2 characters long"),

  eventCategory: yup
    .string()
    // .required("Event Category is required")
    .test(
      "is-valid-category",
      "Please select a valid Category",
      (value) => value !== "Select Category"
    ),

  // description: yup.string().required("Description is required"),
  virtualEvent: yup.boolean(),

  locationVenue: yup.string().when("virtualEvent", {
    is: false,
    then: () =>
      yup
        .string()
        // .required("Location is required")
        .test(
          "is-valid-category",
          "Please select a valid Venue",
          (value) => value !== "Select Venue"
        ),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),

  // tags: yup.string().required("Tags is required"),

  notificationType: yup
    .string()
    // .required("Notification Type is required")
    .test(
      "is-valid-notification",
      "Please select a valid Notification Type",
      (value) => value !== "Notification Type"
    ),

  notificationSchedule: yup
    .string(),
    // .required("Notification Schedule is required"),

  ticket_type: yup
    .string()
    // .required("Ticket Type is required")
    .oneOf(["P", "F"], "Ticket type must be either 'P' (Paid) or 'F' (Free)"),

  tickets: yup.array().when("ticket_type", {
    is: "P",
    then: () =>
      yup.array().of(
        yup.object().shape({
          ticket_name: yup
            .string()
            // .required("Ticket name is required")
            .min(2, "Ticket name must be at least 2 characters long"),
          ticket_price: yup
            .number()
            // .required("Ticket price is required")
            .transform((value, originalValue) =>
              String(originalValue).trim() === "" ? undefined : value
            )
            .min(0, "Ticket price cannot be negative"),
          Facilities: yup
            .string()
            // .required("Facilities description is required")
            .min(
              10,
              "Facilities description must be at least 10 characters long"
            ),
        })
      ),
    otherwise: () => yup.array().notRequired(),
  }),
  thumbnail: yup
    .mixed()
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true; // Allow empty values
      if (typeof value === 'string') return true; // Allow string URLs
      const file = value as File;
      return ["image/jpg", "image/png"].includes(file.type);
    })
    .test("fileSize", "File size is too large (max 5MB)", (value) => {
      if (!value || typeof value === 'string') return true; // Skip validation for strings
      const file = value as File;
      return file.size <= 5 * 1024 * 1024;
    }),
  eventBanner: yup
    .mixed()
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true;
      if (typeof value === 'string') return true;
      const file = value as File;
      return ["image/jpg", "image/png"].includes(file.type);
    })
    .test("fileSize", "File size is too large (max 5MB)", (value) => {
      if (!value || typeof value === 'string') return true;
      const file = value as File;
      return file.size <= 5 * 1024 * 1024;
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
          eventStartDate: yup.string(), //.required("Start date is required"),
          eventStartTime: yup.string(), //.required("Start time is required"),
          eventEndDate: yup.string(), //.required("End date is required"),
          eventEndTime: yup.string(), //.required("End time is required"),
        }).test(
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
              startDate: yup.string(), //.required("Start date is required"),
              startTime: yup.string(), //.required("Start time is required"),
              endDate: yup.string(), //.required("End date is required"),
              endTime: yup.string(), //.required("End time is required"),
            })
            .test(
              "is-start-before-end",
              "Event start date and time must be before end date and time",
              function (value) {
                const {
                  startDate,
                  startTime,
                  endDate,
                  endTime,
                } = value;
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
      yup
        .array()
        .of(
          yup
            .object()
            .shape({
              segmentName:yup.string(), //.required("Segment Name is required"),
              speaker:yup.string().optional(),
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

export default EditEventSchema;
