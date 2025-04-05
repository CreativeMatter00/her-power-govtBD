import * as yup from "yup";

const AboutBusinessSchema = yup.object().shape({
	storeName: yup.string().required("Store name is required"),
	address: yup.string().required("Address is required"),
	area: yup.string().required("Area is required"),
	city: yup.string().required("City is required"),
	zipCode: yup.string().required("Zip Code is Required"),
});

export default AboutBusinessSchema;
