import * as yup from "yup";

const OrganizerRegistrationSchema = yup.object().shape({
	org_name: yup.string().required("Organization name is required"),
	designation: yup.string().required("Your designation is required"),
	org_address: yup.string().required("Organization address is required"),
	org_type: yup.string().required("Organization type is required"),
	org_website: yup.string().required("Organization website is required"),
	// org_email: yup.string().required(),
	// phone_no: yup.string().required(),
	// remarks: yup.string().required(),
	// active_status: yup.string().required(),
});

export default OrganizerRegistrationSchema;
