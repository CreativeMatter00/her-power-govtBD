import * as yup from "yup";

const JobSeekerSchema = yup.object().shape({
	portfolio: yup.string(),
	degree: yup.array().of(yup.string().required("Degree is required")),
	groupDepartment: yup
		.array()
		.of(yup.string().required("Group/Department is required")),
	passingYear: yup
		.array()
		.of(yup.string().required("Passing year is required")),
	gpaCgpa: yup.array().of(
		yup
			.number()
			// .typeError("Result must be a number")
			// .min(1, "GPA/CGPA must be at least 1")
			// .max(5, "GPA/CGPA cannot be more than 5")
			// .test(
			// 	"max-decimal",
			// 	"GPA/CGPA can have at most 2 decimal places",
			// 	(value) =>
			// 		value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString())
			// )
			.required("GPA/CGPA is required")
	),
	outOf: yup
		.array()
		.of(
			yup
				.number()
				// .typeError("Result must be a number")
				// .oneOf([4, 4.0, 4.0, 5, 5.0, 5.0], "Value must be 4 or 5")
				.required("Required")
		),
	skill: yup.array().of(yup.string().required("Skill is required")),
	experience: yup.array().of(yup.string().required("Experience is required")),
	title: yup.array().of(yup.string().required("Skill is required")),
	jobExperience: yup.array().of(yup.string().required("Experience is required")),
});

export default JobSeekerSchema;
