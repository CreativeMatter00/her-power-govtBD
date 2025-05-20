"use client";
import { useForm } from "react-hook-form";
import InventoryManagement from "../FormPart/InventoryManagement";
import ProductInformation from "../FormPart/ProductInformation";
import HeadingPart from "../HeadingPart";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import "react-toastify/dist/ReactToastify.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useLocale, useTranslations } from "next-intl";

interface EditProductInformationI {
  productDetailData: any;
  refetch: Function;
}

const EditProductInformation = ({
  productDetailData,
  refetch,
}: EditProductInformationI) => {
  const t = useTranslations("talentHunt");
  const params = useParams();
  const cookies = useCookies();
  const router = useRouter();
  const locale = useLocale();
  const productId = params?.id;
  // ==================== STATE INITILIZED FOR INPUTS ====================
  const [description, setDescription] = useState<string>("");
  const [promotionStartDate, setPromotionStartDate] = useState<string>("");
  const [promotionEndDate, setPromotionEndDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [fileObjects, setFileObjects] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // =========== DATA FETCHING =========

  const productsData = {
    product_name: productDetailData?.product_name,
    brand_name: productDetailData?.brand_name,
    model_name: productDetailData?.model_name,
    category_pid: productDetailData?.category_pid,
    description: productDetailData?.description,
    attachments: productDetailData?.attachments,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    watch,
    control,
  } = useForm();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    if (data.product_name) {
      formData.append("product_name", data.product_name);
    }
    if (data.brand_name) {
      formData.append("brand_name", data.brand_name);
    }
    if (data.model_name) {
      formData.append("model_name", data.model_name);
    }
    if (description) {
      formData.append("description", description);
    } else {
      formData.append("description", "description");
    }
    if (data.category_pid) {
      formData.append("category_pid", data.category_pid);
    }
    if (productDetailData?.product_pid) {
      formData.append("product_pid", productDetailData?.product_pid);
    }
    if (productDetailData?.enterpenure_pid) {
      formData.append("enterpenure_pid", productDetailData?.enterpenure_pid);
    }
    formData.append("ud_serialno", "1");

    if (fileObjects.length > 0) {
      fileObjects.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });
    }

    setIsLoading(true);
    try {
      const response = await api.post(
        `/api/admin/update-product/${productId}`,
        formData
      );

      // console.log("Response:", response.data);

      if (response?.data?.code === 200) {
        toast.success("Product Updated successfully!", {
          position: "bottom-left",
          autoClose: 3000,
        });
        refetch();
        reset();
        setTimeout(()=>{
          router.push(`/${locale}/shop-now/seller/dashboard/all-product`);
        },3000)
      } else {
        toast.error("Failed to updating product. Please try again.", {
          position: "bottom-left",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred. Please try again.", {
        position: "bottom-left",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <>
      <main>
        <p className="text-3xl text-brandPrimary mb-5">{t("Edit_Product")}</p>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border border-brandLsPrimary rounded-lg p-8"
          >
            <HeadingPart heading={t("Product_Information")} option="" />
            <ProductInformation
              errors={errors}
              register={register}
              description={description}
              setDescription={setDescription}
              fileObjects={fileObjects}
              setFileObjects={setFileObjects}
              isSubmitted={isSubmitted}
              control={control}
              productData={productsData}
            />
            {/* <HeadingPart heading={t("Inventory_Management")} option="" />
            <InventoryManagement
              errors={errors}
              register={register}
              defaultValue={productDetailData?.data?.inventory}
            /> */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="border py-4 px-10 rounded-full text-white font-medium bg-link hover:bg-linkHover"
              >
                {t("Update_Product")}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default EditProductInformation;
