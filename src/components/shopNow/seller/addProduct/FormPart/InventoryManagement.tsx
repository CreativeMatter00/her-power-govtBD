import { UseFormRegister } from "react-hook-form";
// import { CheckboxInput } from "../InputProduct/CheckboxInput";
import ProductInput from "../InputProduct/ProductInput";
import { useTranslations } from "next-intl";

interface ValidationInfo {
  errors: any;
  register: UseFormRegister<any>;
}

const InventoryManagement: React.FC<ValidationInfo> = ({
  errors,
  register,
}) => {
  const t = useTranslations("talentHunt");

  return (
    // <div className="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-x-8 gap-y-4 mt-1 mb-6">
    // 	<ProductInput
    // 		inputType="text"
    // 		placeholderText="Enter SKU here..."
    // 		name="skuUnit"
    // 		label="Track Inventory (Stock Keeping Unit - SKU)"
    // 		errors={errors}
    // 		register={register}
    // 	/>

    // 	<div className="grid gap-4 lg:grid-cols-2">
    // 		<CheckboxInput />

    // 		<ProductInput
    // 			inputType="text"
    // 			placeholderText="Qty"
    // 			name="qty"
    // 			label="Low Stock Qty"
    // 			errors={errors}
    // 			register={register}
    // 		/>
    // 	</div>
    // </div>
    <div className="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-x-8 gap-y-4 mt-3 mb-6">
      <ProductInput
        inputType="number"
        placeholderText={t("Enter_Reorder_level")}
        name="reorderLevel"
        label={t("Reorder_Level")}
        errors={errors}
        register={register}
        // required={true}
      />

      <ProductInput
        inputType="number"
        placeholderText={t("Stock_Out_Lifetime_placeholder")}
        name="stockOut"
        label={t("Stock_Out_Lifetime")}
        errors={errors}
        register={register}
        // required={true}
      />
    </div>
  );
};

export default InventoryManagement;
