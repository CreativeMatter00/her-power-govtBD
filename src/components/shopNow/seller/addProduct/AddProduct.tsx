"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ProductSchema from "./ProductSchema";
import HeadingPart from "./HeadingPart";
import { useState } from "react";
import InventoryManagement from "./FormPart/InventoryManagement";
import ProductInformation from "./FormPart/ProductInformation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";
import ProductVariants from "./FormPart/ProductVariants";
import ScaleLoader from "react-spinners/ScaleLoader";
import { api } from "@/api/api";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
interface IFormInput {
  product_name: string;
  brand_name: string;
  model_name: string;
  category_pid: string;
  description: string;
  enterpenure_pid?: string;
  ud_serialno?: string;
  attachments?: string;
  varient_name?: string[];
  mrp_primary?: number[];
  mrp?: number[];
  disc_pct?: number[];
  varient_value?: number[];
  varient_desc?: string[];
}

const AddProduct = () => {
  const t = useTranslations("talentHunt");
  const userInfo = JSON.parse(localStorage.getItem("loginDetails") || "{}");
  const router = useRouter();
  const locale = useLocale();
  // ==================== STATE INITILIZED FOR INPUTS ====================
  const [textDescription, setTextDescription] = useState<string>("");
  const [promotionStartDate, setPromotionStartDate] = useState<string>("");
  const [promotionEndDate, setPromotionEndDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<any>();
  const [isSelectedImages, setIsSelectedImages] = useState<boolean>(true);
  const [imageSrc, setImageSrc] = useState<string[] | null | undefined>(
    undefined
  );

  const [variants, setVariants] = useState<{ id: number }[]>([
    { id: Date.now() },
  ]);

  const addVariant = () => {
    setVariants([...variants, { id: Date.now() }]);
  };

  const removeVariant = (id: number) => {
    if (variants.length > 1) {
      const updatedVariants = variants.filter((variant) => variant.id !== id);
      setVariants(updatedVariants);
    }
  };

  const resolver = yupResolver(ProductSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    control,
    setValue,
  } = useForm<IFormInput>({ resolver });

  const onSubmit = async (data: IFormInput) => {
    const productFormData = new FormData();
    productFormData.append("product_name", data.product_name);
    productFormData.append("model_name", data.model_name);
    productFormData.append("brand_name", data.brand_name);
    productFormData.append("description", data.description);
    productFormData.append("category_pid", data.category_pid || "");
    productFormData.append("enterpenure_pid", userInfo?.enterpenure_pid);
    productFormData.append("ud_serialno", "1");

    if (selectedImages) {
      selectedImages.forEach((file: File, index: number) => {
        productFormData.append(`attachments[${index}]`, file);
      });
      setIsSelectedImages(true);
    } else {
      setIsSelectedImages(false);
      return;
    }

    data.varient_name?.forEach((varientName, index) => {
      productFormData.append(`varient_name[${index}]`, varientName);
    });

    data.mrp_primary?.forEach((pricePrimary, index) => {
      productFormData.append(`mrp_primary[${index}]`, pricePrimary.toString());

      const price = data.mrp?.[index];
      if (price !== undefined) {
        productFormData.append(`mrp[${index}]`, price.toString());

        const discountPercentage = pricePrimary
          ? Math.round(((pricePrimary - price) / pricePrimary) * 100)
          : 0;
        productFormData.append(
          `disc_pct[${index}]`,
          discountPercentage.toString()
        );
      }
    });

    data.varient_value?.forEach((varientValue, index) => {
      productFormData.append(
        `stock_available[${index}]`,
        varientValue.toString()
      );
    });
    data.varient_desc?.forEach((varientDescription, index) => {
      productFormData.append(
        `varient_desc[${index}]`,
        varientDescription.toString()
      );
    });

    setIsLoading(true);
    try {
      const response = await api.post(
        `/api/admin/product`,
        productFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.meta.status === true) {
        toast.success("Product added successfully!", {
          position: "bottom-left",
          autoClose: 3000,
        });

        setSelectedImages(undefined);
        reset();

        setTimeout(() => {
          router.push(`/${locale}/shop-now/seller/dashboard/all-product`);
        }, 3000);
      } else {
        toast.error("Failed to add product. Please try again.", {
          position: "bottom-left",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log("error", error);
      console.error("Error adding product:", error);
      toast.error("An error occurred. Please try again.", {
        position: "bottom-left",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const discardData = () => {
    reset();
    setTextDescription("");
    setPromotionStartDate("");
    setPromotionEndDate("");
    setImageSrc(null);
    setValue("category_pid", "");
  };
  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <div className="container p-4">
      <div className="flex justify-between mb-4">
        <p className="text-3xl text-brandPrimary">{t("Add_New_Product")}</p>

        <p className="text-base hover:underline text-link cursor-pointer"></p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-brandLsPrimary rounded-lg p-8"
      >
        {/* =============================== PRODUCT INFORMATION =========================== */}

        <HeadingPart
          heading={t("Product_Information")}
          option={t("required")}
        />

        <ProductInformation
          errors={errors}
          register={register}
          textDescription={textDescription}
          setTextDescription={setTextDescription}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          control={control}
          isSelectedImages={isSelectedImages}
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
        />
        {/* =================================== PRODUCT VARIANTS ============================ */}
        <div>
          <div className="flex items-center justify-between">
            <HeadingPart heading={t("Product_Variants")} option="" />
            <button
              type="button"
              className="flex gap-2 items-center rounded-full text-white"
              onClick={addVariant}
            >
              <FaPlus className="bg-link text-bgPrimary p-2 w-8 h-8 rounded-full" />
            </button>
          </div>

          {/* <div>Variant Type: {variants.indexOf(variant) + 1}</div> */}
          {variants.map((variant, index) => {
            return (
              <div key={variant.id} className="flex flex-col">
                <div className="my-2 flex items-center justify-between">
                  <div>{t("Variant_Type")}: {index + 1}</div>
                  {variants.length > 1 && (
                    <button
                      type="button"
                      className="p-2"
                      onClick={() => removeVariant(variant.id)}
                    >
                      <FaMinus className="bg-red-500 text-bgPrimary p-2 w-8 h-8 rounded-full" />
                    </button>
                  )}
                </div>
                <ProductVariants
                  errors={errors}
                  register={register}
                  index={index}
                  variantData={variant}
                />
              </div>
            );
          })}
        </div>
        {/* ====================== INVENTORY MANAGEMENT ======================= */}
        {/* <HeadingPart heading={t("Inventory_Management")} option="" />
        <InventoryManagement errors={errors} register={register} /> */}
        <div className="flex max-md:flex-col flex-row md:justify-between mt-6">
          <div className="flex max-md:flex-col flex-row gap-4 max-md:order-2 max-md:mt-3">
            {/* ============================= SUBMIT BUTTON ======================== */}
            <button
              type="submit"
              className="border py-4 px-10 rounded-full text-white font-medium bg-link hover:bg-linkHover"
            >
              {t("Publish_Product")}
            </button>
          </div>
          {/* ============================= DISCARD BUTTON ======================== */}
          <button
            type="button"
            onClick={discardData}
            className="text-link hover:underline  max-md:order-1"
          >
            {t("Discard")}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
