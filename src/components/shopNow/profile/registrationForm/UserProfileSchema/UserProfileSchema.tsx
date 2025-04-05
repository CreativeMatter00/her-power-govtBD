import * as yup from "yup";

const UserProfileSchema = yup.object().shape({
  nidOrBirthCertificate: yup.string().required("Please select NID or Birth Certificate"),
  nid: yup.string().when('nidOrBirthCertificate', {
    is: "nid",
    then: () => yup.string()
      .required("NID is required.")
      .matches(/^\d+$/, "NID must be a number")
      .min(10, "NID must be at least 10 characters long")
      .max(17, "NID must be at most 17 characters long"),
  }),
  birthCertificate: yup.string().when("nidOrBirthCertificate", {
    is: "birthCertificate",
    then: () => yup.string()
      .required("Birth Certificate is required")
      .matches(/^\d+$/, "Birth Certificate must be a number")
      .min(17, "Birth Certificate must be at least 17 characters long")
      .max(25, "Birth Certificate must be at most 25 characters long"),
  }),
  fname: yup
    .string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters long"),
  lname: yup
    .string()
    .required("Last name is required")
    .min(3, "Last name must be at least 3 characters long"),
  mobile_no: yup
    .number()
    .typeError("Phone number must be digits")
    .required("Phone number is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is required"),
  house_number: yup.string().required("House number is required"),
  city_name: yup.string().required("City name is required"),
  area_name: yup.string().required("Area name is required"),
  zip_postal_code: yup
    .number()
    .typeError("Zip code must be a number")
    .required("Zip postal code is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required")
    .min(6, "Confirm password must be at least 6 characters long"),
  attachment: yup
    .mixed<FileList>()
    .test("required", "Image is required", (value) => {
      return value && (value as FileList).length > 0;
    }),
  // deliveryZipCode: yup.string().required(),
  // billingAddress: yup.string().required(),
  // billingCity: yup.string().required(),
  // billingArea: yup.string().required(),
  // billingZipCode: yup.string().required(),
  // cardNumber: yup.string().required(),
  // expiryDate: yup.string().required(),
  // nameOnCard: yup.string().required(),
  // cardCVV: yup.string().required(),
});

export default UserProfileSchema;