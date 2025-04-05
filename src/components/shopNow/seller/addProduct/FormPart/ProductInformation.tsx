"use client";
import { Controller, UseFormRegister } from "react-hook-form";
import ProductInput from "../InputProduct/ProductInput";
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
import { useTranslations } from "next-intl";

interface ValidationInfo {
  textDescription: string;
  setTextDescription: Function;
  errors: any;
  register: UseFormRegister<any>;
  isSelectedImages: boolean;
  // ====================== INPUT IMAGES DATA TYPE ===================
  selectedImages: any;
  setSelectedImages: (files: File[] | null) => void;
  control: any;
  imageSrc: any;
  setImageSrc: any;
}

const ProductInformation: React.FC<ValidationInfo> = ({
  errors,
  register,
  textDescription,
  setTextDescription,
  selectedImages,
  setSelectedImages,
  control,
  isSelectedImages,
  imageSrc,
  setImageSrc,
}) => {
  const t = useTranslations("ShopNowHome");

  const {
    isLoading: categoryLoading,
    isError: categoryError,
    data: categoryData,
    refetch: categoryRefetch,
  } = useQuery({
    queryKey: ["categoryData"],
    queryFn: () => getProductFrontendCategory(),
  });

  if (categoryLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <>
      <div className="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-x-8 gap-y-4 mt-3 mb-6">
        <div className="flex flex-col space-y-4">
          {/* ================= PRODUCT NAME ========================= */}
          <ProductInput
            inputType="text"
            placeholderText={t("Type_product_name_here")}
            name="product_name"
            label={t("Product_Name")}
            errors={errors}
            register={register}
            required={true}
          />
          {/* ================= Brand NAME ========================= */}
          <ProductInput
            inputType="text"
            placeholderText={t("Type_brand_name_here")}
            name="brand_name"
            label={t("Brand_Name")}
            errors={errors}
            register={register}
            required={true}
          />

          {/* ===================== DESCRIPTION FIELD ========================= */}
          <TextInput
            control={control}
            errors={errors}
            textDescription={textDescription}
            setTextDescription={setTextDescription}
            required={true}
          />
        </div>

        <div className="flex flex-col gap-y-4">
          {/* ================= Brand Model ========================= */}
          <ProductInput
            inputType="text"
            placeholderText={t("Type_brand_model_here")}
            name="model_name"
            label={t("Brand_Model")}
            errors={errors}
            register={register}
            required={true}
          />
          {/* ================= PRODUCT CATEGORY ========================= */}
          <div className="">
            <label className="text-brandPrimary font-normal text-sm pl-6">
              {t("Product_Category")} <span className="text-red-500">*</span>
            </label>
            <Controller
              control={control}
              name="category_pid"
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    onValueChange={(value) => {
                      field.onChange(value);
                      // handleRoleSelection(value);
                    }}
                  >
                    <SelectTrigger className="mt-1 flex outline-none placeholder:text-[#CACACA] text-base py-3 px-4 border border-brandLsPrimary rounded-full w-full bg-white">
                      <SelectValue
                        className="text-sm"
                        placeholder={t("Product_Category")}
                      />
                    </SelectTrigger>

                    <SelectContent className="">
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

          <ProductImage
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
          />

          {!selectedImages && !isSelectedImages && (
            <p className="text-red-500 text-sm mt-1 px-6">{t("Image_is_required")}</p>
          )}
          {/* {!selectedImages && (
						<>
							<input
								hidden
								value={selectedImages ? selectedImages : null}
								{...register("imageRequired", { required: true })}
								multiple
							/>
							{errors.imageRequired && (
								<span className="text-red-500 text-sm mt-1 px-6">
									Image is required
								</span>
							)}
						</>
					)} */}
        </div>
      </div>
    </>
  );
};

export default ProductInformation;
