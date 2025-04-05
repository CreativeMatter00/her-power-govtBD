import * as yup from "yup";

const divisionSchema = yup.object().shape({
	division_code: yup.string().required("Division Code is required"),
	division_name: yup.string().required("Division Name is required"),
	bn_division_name: yup
		.string()
		.required("Division Name Bangla no is required"),
});

export default divisionSchema;
