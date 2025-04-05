import * as yup from "yup";

const Schema = yup.object().shape({
  jobtitle: yup
    .string()
    .required("job title is required")
    .min(2, "job title must be at least 2 characters long"),
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
    .required("email is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Must be a valid email address"
    ),
  jobdescription: yup.string(),
  remarks: yup.string(),
  user_pid: yup.string().required("User pid is required"),
});

export default Schema;

// import * as yup from "yup";

// const Schema = yup.object().shape({
//   jobtitle: yup
//     .string()
//     .required("job title is required")
//     .min(2, "job title must be at least 2 characters long"),
//   duration: yup
//     .string()
//     .required("duration is required")
//     .min(2, "duration must be at least 2 characters long"),
//   email: yup.string().required("email is required"),
//   jobdescription: yup.string().required("Job description is required"),
//   remarks: yup
//     .string()
//     .required("remarks is required")
//     .min(2, "remarks must be at least 2 characters long"),
//   user_pid: yup.string().required("User pid is required"),
// });

// export default Schema;

// duration: number;
// email: string;
// jobdescription: string;
// remarks: string;
