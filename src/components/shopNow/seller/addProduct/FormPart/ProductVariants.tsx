import { UseFormRegister } from "react-hook-form";
import ProductInput from "../InputProduct/ProductInput";
import ProductInputWithUnit from "../InputProduct/ProductInputWithUnit";
import ProductInputWithSelectUnit from "../InputProduct/ProductInputWithSelectUnit";
import TextArrayInput from "../InputProduct/TextArrayInput";
import { useTranslations } from "next-intl";
// import ProductInputWithUnit from "../InputProduct/ProductInputWithUnit";
// import ProductInputWithSelectUnit from "../InputProduct/ProductInputWithSelectUnit";

interface ValidationInfo {
  errors: any;
  register: UseFormRegister<any>;
  index: number; // Add index to differentiate fields
  variantData?: any;
}

// console.log()
const ProductVariants: React.FC<ValidationInfo> = ({
  errors,
  register,
  index,
  variantData,
}) => {
  const t = useTranslations("talentHunt");

  return (
    <div className="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-x-8 gap-y-4 mb-6 mt-3">
      <TextArrayInput
        inputType="text"
        placeholderText={t("Enter_variant_name_here")}
        inputName={`varient_name[${index}]`}
        labelName={t("Variant_Name")}
        errors={errors}
        register={register}
        componentNo={index}
        arrayName="varient_name"
        required={true}
      />
      <TextArrayInput
        inputType="number"
        labelName={t("Old_Price")}
        placeholderText={t("Enter_variant_old_price_here")}
        inputName={`mrp_primary[${index}]`}
        errors={errors}
        register={register}
        componentNo={index}
        arrayName="mrp_primary"
        required={true}
      />
      <TextArrayInput
        inputType="number"
        placeholderText={t("Enter_variant_new_price_here")}
        inputName={`mrp[${index}]`}
        labelName={t("New_Price")}
        errors={errors}
        register={register}
        componentNo={index}
        arrayName="mrp"
        required={true}
      />

      {/* <TextArrayInput
        inputType="number"
        placeholderText={t("Enter_variant_discount_percent_here")}
        inputName={`disc_pct[${index}]`}
        labelName={t("Discount_Percent")}
        errors={errors}
        register={register}
        componentNo={index}
        arrayName="disc_pct"
        required={true}
      /> */}

      {/* <TextArrayInput
				inputType="number"
				placeholderText="Enter variant stock here..."
				inputName={`stock_available[${index}]`}
				labelName="Stock"
				errors={errors}
				register={register}
				componentNo={index}
				arrayName="stock_available"
				required = {true}
			/> */}
      <TextArrayInput
        inputType="number"
        placeholderText={t("Enter_variant_stock_here")}
        inputName={`varient_value[${index}]`}
        labelName={t("Stock")}
        errors={errors}
        register={register}
        componentNo={index}
        arrayName="varient_value"
        required={true}
      />

      <TextArrayInput
        inputType="string"
        placeholderText={t("Enter_variant_description_here")}
        inputName={`varient_desc[${index}]`}
        labelName={t("Description")}
        errors={errors}
        register={register}
        componentNo={index}
        arrayName="varient_desc"
        required={true}
      />
    </div>
  );
};

export default ProductVariants;
