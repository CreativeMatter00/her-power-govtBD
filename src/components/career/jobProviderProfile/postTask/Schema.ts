import * as yup from "yup";

const Schema = yup.object().shape({
  jobtitle: yup
    .string()
    .required("Job title is required")
    .min(2, "Job title must be at least 2 characters long"),
    duration: yup
    .number()
    .transform((value, originalValue) => {
      // Convert empty string to undefined
      return originalValue === "" ? undefined : value;
    })
    .required("Duration is required")
    .min(0, "Duration cannot be negative"),  
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Must be a valid email address"
    ),
  jobdescription: yup.string().required("Job description is required"),
  remarks: yup
    .string()
    .required("Remarks is required")
    .min(2, "Remarks must be at least 2 characters long"),
  user_pid: yup.string().required("User pid is required"),
});

export default Schema;