import * as Yup from "yup";

export const VariantSchema = Yup.object().shape({
  varient_name: Yup.string()
    .required("Variant name is required")
    .min(3, "Variant name must be at least 3 characters long")
    .max(50, "Variant name can't exceed 50 characters"),

  mrp_primary: Yup.number()
    .required("Old price is required") 
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value
    ) 
    .typeError("Old price must be a number")
    .min(0, "Old price must be at least 0")
    .positive("Old price must be greater than 0")
    .max(999999, "Old price can't exceed 999,999"),

  mrp: Yup.number()
    .required("New price is required")
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value
    ) 
    .typeError("New price must be a number")
    .min(0, "New price must be at least 0")
    .positive("New price must be greater than 0")
    .max(999999, "New price can't exceed 999,999"),

  stock_available: Yup.number()
    .required("Stock is required")
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value
    ) 
    .typeError("Stock available must be a number")
    .integer("Stock available must be a whole number")
    .min(0, "Stock available can't be negative"),

  varient_desc: Yup.string()
    .max(500, "Description can't exceed 500 characters")
    .optional(),
});
