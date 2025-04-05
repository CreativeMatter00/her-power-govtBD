import * as yup from "yup";

const speakersSchema = yup.object().shape({
	speaker_name: yup.string().required("Speakers name is required"),
	speaker_email: yup.string().required("Speakers email is required"),
	phone_no: yup.string().required("Speakers phone no is required"),
	description: yup.string().required("Speakers description is required"),
	org_address: yup.string(),
	designation: yup.string().required("Speakers designation is required"),
	speaker_bio: yup.string().required("Speakers bio is required"),
	speaker_profile_link: yup.string(),
});

export default speakersSchema;
