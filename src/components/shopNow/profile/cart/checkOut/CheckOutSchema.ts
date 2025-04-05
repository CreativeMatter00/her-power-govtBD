import * as yup from "yup";

const CheckOutSchema = yup.object().shape({
	firstName: yup.string(),
});

export default CheckOutSchema;
