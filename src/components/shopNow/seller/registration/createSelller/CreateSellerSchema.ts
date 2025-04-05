import * as yup from "yup";

const CreateSellerSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  mobileNumber: yup
    .string()
    .matches(/^\d+$/, "Mobile number must be numeric")
    .required("Mobile Number is required"),
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match") 
    .required("Confirm Password is required"),
});

export default CreateSellerSchema;