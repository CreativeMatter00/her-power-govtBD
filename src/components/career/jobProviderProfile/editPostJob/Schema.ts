import * as yup from "yup";

const Schema = yup.object().shape({
  jobtitle: yup
    .string()
    .required("job title is required")
    .min(2, "job title must be at least 2 characters long"),
  provider_name: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters long"),
  workplace_type: yup.string().required("Workplace type is required"),
  job_location: yup.string().required("Job location is required"),
  jobdescription: yup.string(),
  job_type: yup.string().required("Job type is required"), 
  banner: yup
      .mixed()
      .test("file", "Banner is required", (value: any) => {
        if (typeof value === "string") return true;
        return value && value[0];
      })
      .test("fileType", "Unsupported file format", (value: any) => {
        if (typeof value === "string") return true;
        return value && value[0] && ["image/jpeg", "image/png"].includes(value[0].type);
      })
      .test("fileSize", "File size is too large", (value: any) => {
        if (typeof value === "string") return true;
        return value && value[0] && value[0].size <= 5000000; // 5MB
      }),
  validdate: yup.string().required("Date is required") // Change to string type
});

export default Schema;
