import * as yup from "yup";

const JobProviderSchema = yup.object().shape({
	companyName: yup.string().required("Company name is required"),
	designation: yup.string().required("Designation is required"),
	companyAddress: yup.string().required("Company address is required"),
	companyType: yup.string().required("Company type is required"),
	companyWebsiteUrl: yup.string().required("Company website url is required"),

});

export default JobProviderSchema;
