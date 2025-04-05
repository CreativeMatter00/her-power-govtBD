import * as yup from "yup";

const ProductSchema = yup.object().shape({
  product_name: yup.string().required("Product name is required"),
  brand_name: yup.string().required("Brand name is required"),
  model_name: yup.string().required("Model name is required"),
  category_pid: yup.string().required("Product category is required"),
  description: yup.string().required("Description is required"),
  enterpenure_pid: yup.string(),
  ud_serialno: yup.string(),
  attachments: yup.string(),
  varient_name: yup
    .array()
    .of(yup.string().required("Variant name is required")),
  mrp_primary: yup
    .array()
    .of(
      yup
        .number()
        .typeError("This field must be a number")
        .required("Previous price is required")
    ),
  mrp: yup
    .array()
    .of(
      yup
        .number()
        .min(0)
        .typeError("This field must be a number")
        .required("Selling price is required")
    ),
  // disc_pct: yup
  //   .array()
  //   .of(
  //     yup
  //       .number()
  //       .typeError("This field must be a number")
  //       .required("Discount price is required")
  //   ),
  varient_value: yup
    .array()
    .of(
      yup
        .number()
        .typeError("This field must be a number")
        .required("Varient is required")
    ),
  varient_desc: yup
    .array()
    .of(yup.string().required("Description is required")),
});

export default ProductSchema;
