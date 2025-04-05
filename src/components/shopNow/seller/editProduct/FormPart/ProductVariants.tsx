import { UseFormRegister } from "react-hook-form";
import ProductInput from "../InputProduct/ProductInput";
import ProductInputWithUnit from "../InputProduct/ProductInputWithUnit";
import ProductInputWithSelectUnit from "../InputProduct/ProductInputWithSelectUnit";
// import ProductInputWithUnit from "../InputProduct/ProductInputWithUnit";
// import ProductInputWithSelectUnit from "../InputProduct/ProductInputWithSelectUnit";

interface ValidationInfo {
  errors: any;
  register: UseFormRegister<any>;
  index?: number; // Add index to differentiate fields
  variantData?: any;
}

const ProductVariants: React.FC<ValidationInfo> = ({
  errors,
  register,
  index,
  variantData,
}) => {
  // console.log(variantData);
  return (
    <div className="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-x-8 gap-y-4 mb-6 mt-3">
      <ProductInput
        inputType="text"
        placeholderText="Enter variant name here..."
        name={`varient_name`}
        label="Variant Name:"
        errors={errors}
        register={register}
        defaultValue={variantData?.varient_name}
        required={true}
      />
      <ProductInput
        inputType="number"
        placeholderText="Enter variant old price here..."
        name={`mrp_primary`}
        label="Old Price:"
        errors={errors}
        register={register}
        defaultValue={variantData?.mrp_primary}
        required={true}
      />
      <ProductInput
        inputType="number"
        placeholderText="Enter variant new price here..."
        name={`mrp`}
        label="New Price:"
        errors={errors}
        register={register}
        defaultValue={variantData?.mrp}
        required={true}
      />
      <ProductInput
        inputType="number"
        placeholderText="Enter variant stock here..."
        name={`stock_available`}
        label="Stock"
        errors={errors}
        register={register}
        defaultValue={variantData?.stock_available}
        required={true}
      />
      <ProductInput
        inputType="string"
        placeholderText="Enter variant description here..."
        name={`varient_desc`}
        label="Description"
        errors={errors}
        register={register}
        defaultValue={variantData?.varient_desc}
      />
    </div>
  );
};

export default ProductVariants;
