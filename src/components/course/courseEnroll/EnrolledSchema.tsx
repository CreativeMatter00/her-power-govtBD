import * as yup from "yup";

const EnrolledSchema = yup.object().shape({
	candidateName: yup.string().required("required"),
	fatherName: yup.string(),
	dateOfBirth: yup.string(),
	nidNumber: yup.string(),
	phone: yup.string(),
	email: yup.string(),
	sscRoll: yup.string(),
	hscDiplomaRoll: yup.string(),
	presentEducation: yup.string(),
	eduInstitute: yup.string(),
	resultDate: yup.string(),
	city: yup.string(),
});

export default EnrolledSchema;
