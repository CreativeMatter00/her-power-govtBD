import * as yup from "yup";

const SponsorSchema = yup.object().shape({
	sponsorName: yup.string().required("News title is required"),
	sponsorDescription: yup.string().required("News description is required"),
	contractPerson: yup.string().required("Contract Person Name is require"),
	contactEmail: yup.string().required('Contact Email is require'),
	address: yup.string().required('Address is require'),
  contactPhone:yup.number().required('Phone number is require'),
	imageFile: yup.string(),
});

export default SponsorSchema;
