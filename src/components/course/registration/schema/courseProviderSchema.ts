import * as Yup from "yup";

const maxAgeDate = new Date();
maxAgeDate.setFullYear(maxAgeDate.getFullYear() - 18);

const minAgeDate = new Date();
minAgeDate.setFullYear(minAgeDate.getFullYear() - 100);

export const courseProviderSchema = Yup.object().shape({
  mentorName: Yup.string().required("Name is required"),
  dob: Yup.date()
    .required("Date of Birth is required")
    .max(maxAgeDate, "You must be at least 18 years old")
    .min(minAgeDate, "Age cannot be more than 100 years"),
  tradeLicense: Yup.string().required("Trade License is required"),
  vatId: Yup.string().required("VAT ID is required"),
  taxId: Yup.string().required("Tax ID is required"),
  nid: Yup.string().required("NID is required"),
  tinNumber: Yup.string().required("TIN Number is required"),
  hasBranches: Yup.boolean().default(false),
  branch_info: Yup.array().when("hasBranches", {
    is: true,
    then: (schema) =>
      schema
        .of(
          Yup.object().shape({
            branch_name: Yup.string().required("Branch Name is required"),
            address_line: Yup.string().required(
              "Branch Location is required"
            ),
          })
        )
        .min(1, "At least one branch is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  expertise: Yup.array()
    .of(
      Yup.object().shape({
        workAs: Yup.string().required("Work as is required"),
        experienceTime: Yup.string().required("Experience time is required"),
        instituteName: Yup.string().required("Institution name is required"),
        relevantDegree: Yup.string().required("Relevant degree is required"),
      })
    )
    .default([]),

  education_info: Yup.array()
    .of(
      Yup.object().shape({
        degree: Yup.string().required("Degree is required"),
        group: Yup.string().required("Group/Department is required"),
        passing_year: Yup.string().required("Passing Year is required"),
        result: Yup.number()
          .transform((value, originalValue) => {
            // Convert empty string to undefined
            return originalValue === "" ? undefined : value;
          })
          .required("GPA/CGPA is required")
          .min(1, "GPA/CGPA must be at least 1")
          .max(
            Yup.ref("gpa_cgpa_outof"),
            "GPA/CGPA must be less than or equal to the Max Possible Point"
          ),
        gpa_cgpa_outof: Yup.number()
          .transform((value, originalValue) => {
            return originalValue === "" ? undefined : value;
          })
          .required("GPA/CGPA out of is required")
          .oneOf([4, 5], "GPA/CGPA out of must be either 4 or 5"),
      })
    )
    .default([]),
});