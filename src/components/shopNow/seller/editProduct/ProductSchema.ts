import * as Yup from "yup";

const ProductSchema = Yup.object().shape({
  product_name: Yup.string()
    .required("Product Name is required")
    .min(2, "Product Name must be at least 2 characters long"),

  brand_name: Yup.string()
    .required("Brand Name is required")
    .min(2, "Brand Name must be at least 2 characters long"),

  model_name: Yup.string().optional(),

  description: Yup.string().optional(),

  // Array of variants validation
  variants: Yup.array()
    .of(
      Yup.object().shape({
        // varient_name: Yup.string()
        //   .required("Variant Name is required")
        //   .min(2, "Variant Name must be at least 2 characters long"),
        varient_name: Yup.string().optional(),

        mrp_primary: Yup.number().optional(),

        mrp: Yup.number().optional(),

        // disc_pct: Yup.number().optional(),

        varient_value: Yup.number().optional(),
      })
    )
    .min(1, "At least one variant is required"),
  //   Optional additional fields
  category_pid: Yup.string().optional(),
  product_pid: Yup.string().optional(),
  enterpenure_pid: Yup.string().optional(),
  ud_serialno: Yup.string().optional(),
});

export default ProductSchema;
