import * as yup from "yup";

const PasswordSchema = yup.object().shape({
  oldPassword: yup
  .string()
  .required("Old password is required")
  .min(4, "Password must be at least 4 characters long"),

newPassword: yup
  .string()
  .required("New password is required")
  .min(4, "Password must be at least 4 characters long")
  .notOneOf([yup.ref("oldPassword")], "New password cannot be the same as the old password"),

confirmPassword: yup
  .string()
  .required("Confirm password is required")
  .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export default PasswordSchema;
