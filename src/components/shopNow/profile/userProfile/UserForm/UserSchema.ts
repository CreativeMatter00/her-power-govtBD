import * as yup from "yup";

const UserSchema = yup.object().shape({
	fname: yup.string().required("First name is required"),
	lname: yup.string().required("Brand name is required"),
	// email: yup.string().required("email is required"),
	mobile_no: yup.string().required("Mobile number is required"),
	// address_line: yup.string().required("Address is required"),
	// city_name: yup.string().required("City name is required"),
	// area_name: yup.string().required("Area name is required"),
	// zip_postal_code: yup.string().required("Zip code is required"),
	customer_address: yup.string().required("Address is required"),
	customer_city_name: yup.string().required("City name is required"),
	customer_area_name: yup.string().required("Area name is required"),
	customer_zip_postal_code: yup.string().required("Zip code is required"),
});

export default UserSchema;
