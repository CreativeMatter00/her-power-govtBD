import * as yup from "yup";

const Schema = yup.object().shape({
  jobtitle: yup
    .string()
    .required("Job title is required")
    .min(2, "Job title must be at least 2 characters long"),
  provider_name: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters long"),
  workplace_type: yup.string().required("Workplace type is required"),
  job_location: yup.string().required("Job location is required"),
  jobdescription: yup.string().required("Job description is required"),
  job_type: yup.string().required("Job type is required"),
  banner: yup
    .mixed()
    .required("Banner is required")
    .test("file", "Banner is required", (value: any) => {
      return value && value[0];
    })
    .test("fileType", "Unsupported file format", (value: any) => {
      return value && value[0] && ["image/jpeg", "image/png"].includes(value[0].type);
    })
    .test("fileSize", "File size is too large", (value: any) => {
      return value && value[0] && value[0].size <= 50000000; // 5MB
    })
});

export default Schema;