"use client";
import { Controller, UseFormRegister } from "react-hook-form";
import ProductInput from "../InputProduct/ProductInput";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductImage from "../InputProduct/ProductImage";
import "./FormPart.css";
import TextInput from "../InputProduct/TextInput";
import { useQuery } from "@tanstack/react-query";
import { getProductFrontendCategory } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";

interface ValidationInfo {
  description: string;
  setDescription: Function;
  errors: any;
  register: UseFormRegister<any>;
  // ====================== INPUT IMAGES DATA TYPE ===================
  fileObjects: File[];
  setFileObjects: Function;
  isSubmitted: boolean;
  control: any;
  productData?: any;
}

// ===================== CATEGORIES NAME AND VALUE ===============
const allCategories = [
  { categoryName: "Food", categoryValue: "food" },
  { categoryName: "Groceries", categoryValue: "groceries" },
  { categoryName: "Electronics", categoryValue: "electronics" },
  { categoryName: "Books", categoryValue: "books" },
  { categoryName: "Handicraft", categoryValue: "handicraft" },
  { categoryName: "Hygiene", categoryValue: "hygiene" },
  { categoryName: "Life Style", categoryValue: "lifeStyle" },
  { categoryName: "Arts & Paints", categoryValue: "artsPaints" },
];

const ProductInformation: React.FC<ValidationInfo> = ({
  errors,
  register,
  description,
  setDescription,
  fileObjects,
  setFileObjects,
  isSubmitted,
  productData,
  control,
}) => {
  const {
    isLoading,
    isError,
    data: categoryData,
    refetch: categoryRefetch,
  } = useQuery({
    queryKey: ["categoryData"],
    queryFn: () => getProductFrontendCategory(),
  });

  // console.log("Product Data : ", productData);

  // console.log("categoryData", categoryData);

  // const defaultCategory = categoryData?.find(
  //   (item: any) => item.category_pid === productData?.data?.category_pid
  // );

  const defaultCategory = categoryData?.find(
    (item: any) => item.category_pid === productData?.category_pid
  );

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  // console.log("Default Category PID : ", defaultCategory);

  return (
    <>
      <div className="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-x-8 gap-y-4 mt-3 mb-6">
        <div className="flex flex-col space-y-4">
          {/* ================= PRODUCT NAME ========================= */}
          <ProductInput
            inputType="text"
            placeholderText="Type product name here..."
            name="product_name"
            label="Product Name"
            errors={errors}
            register={register}
            defaultValue={productData?.product_name}
            required={true}
          />
          {/* ================= Brand NAME ========================= */}
          <ProductInput
            inputType="text"
            placeholderText="Type brand name here..."
            name="brand_name"
            label="Brand Name"
            errors={errors}
            register={register}
            defaultValue={productData?.brand_name}
            required={true}
          />

          {/* ===================== DESCRIPTION FIELD ========================= */}
          <TextInput
            description={description}
            setDescription={setDescription}
            isSubmitted={isSubmitted}
            errors={errors}
            register={register}
            defaultValue={productData?.description}
          />
        </div>

        <div className="flex flex-col gap-y-4">
          {/* ================= Brand Model ========================= */}
          <ProductInput
            inputType="text"
            placeholderText="Type brand model here..."
            name="model_name"
            label="Brand Model"
            errors={errors}
            register={register}
            defaultValue={productData?.model_name}
            required={true}
          />

          {/* ================= PRODUCT CATEGORY ========================= */}
          <div className="">
            <label className="text-brandPrimary font-normal text-sm pl-6">
              Product Category <span className="text-red-500">*</span>
            </label>

            <Controller
              control={control}
              name="category_pid"
              defaultValue={defaultCategory?.category_pid}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="mt-1 flex outline-none placeholder:text-[#CACACA] text-base py-3 px-4 border border-brandLsPrimary rounded-full w-full bg-white">
                      <SelectValue
                        className="text-sm"
                        placeholder={
                          defaultCategory?.category_name || "Product Category"
                        }
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {categoryData?.map((item: any) => (
                        <SelectItem
                          key={item.category_pid}
                          className="border-b-2 border-brandLsPrimary text-sm text-brandPrimary"
                          value={item.category_pid}
                        >
                          {item.category_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              }}
            />

            {errors.category_pid && (
              <p className="text-red-500 text-sm mt-2 ml-6">
                {errors.category_pid.message}
              </p>
            )}
          </div>

          {/* <ProductInput
						inputType="number"
						placeholderText="Enter product previous price here..."
						name="mrp_primary"
						label="Previous Price (BDT)"
						errors={errors}
						register={register}
					/>

					<ProductInput
						inputType="number"
						placeholderText="Enter discount percentage here..."
						name="disc_pct"
						label="Discount Percentage"
						errors={errors}
						register={register}
					/>

					<ProductInput
						inputType="number"
						placeholderText="Enter product selling price here..."
						name="mrp"
						label="Selling Price (BDT)"
						errors={errors}
						register={register}
					/>


					<ProductInput
						inputType="number"
						placeholderText="Enter product stock here..."
						name="productStock"
						label="Stock"
						errors={errors}
						register={register}
					/> */}

          {/* ======================== INPUT IMAGES COMPONENT ==================== */}
          <ProductImage
            fileObjects={fileObjects}
            setFileObjects={setFileObjects}
            isSubmitted={isSubmitted}
            defaultValue={productData?.attachments}
          />
        </div>
      </div>
    </>
  );
};

export default ProductInformation;
