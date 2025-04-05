import { UseFormRegister } from "react-hook-form";
// import { CheckboxInput } from "../InputProduct/CheckboxInput";
import ProductInput from "../InputProduct/ProductInput";

interface ValidationInfo {
  errors: any;
  register: UseFormRegister<any>;
  defaultValue?: any;
}

const InventoryManagement: React.FC<ValidationInfo> = ({
  errors,
  register,
  defaultValue,
}) => {
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
        inputType="text"
        placeholderText="Enter Reorder level..."
        name="reorderLevel"
        label="Reorder Level"
        errors={errors}
        register={register}
        defaultValue={defaultValue?.reorderLevel}
      />

      <ProductInput
        inputType="text"
        placeholderText="Stock Out Lifetime..."
        name="stockOut"
        label="Stock Out Lifetime"
        errors={errors}
        register={register}
        defaultValue={defaultValue?.stockOut}
      />
    </div>
  );
};

export default InventoryManagement;
