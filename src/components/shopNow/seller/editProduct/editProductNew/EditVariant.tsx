"use client";
import { api } from "@/api/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductVariants from "../FormPart/ProductVariants";
import HeadingPart from "../HeadingPart";
import { VariantSchema } from "./Schema";

interface Variant {
  varient_id: number;
  varient_pid: string;
  product_pid: string;
  varient_name: string;
  varient_value: string;
}

interface VariantI {
  variant: Variant;
  refetch: Function;
  index: number;
  totalVariants: number;
}

interface EditProductVariantProps {
  variants: Variant[];
  refetch: Function;
}

const VariantForm = ({ variant, refetch, index, totalVariants }: VariantI) => {
  const router = useRouter();
  const locale = useLocale();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(VariantSchema),
    defaultValues: {
      varient_name: variant.varient_name,
    },
  });

  const onSubmit = async (data: any) => {
    // console.log("variant data", data);
    const formData = new FormData();
    if (data?.varient_name) {
      formData.append("varient_name", data?.varient_name);
    }
    if (data?.mrp_primary) {
      formData.append("mrp_primary", data?.mrp_primary);
    }
    if (data?.mrp) {
      formData.append("mrp", data?.mrp);
    }
    if (data?.mrp_primary && data?.mrp) {
      const mrpPercentageDifference =
        ((data.mrp - data.mrp_primary) / data.mrp_primary) * 100;
      const roundedPercentage = Math.round(mrpPercentageDifference).toString();
      formData.append("disc_pct", roundedPercentage);
    }
    if (data?.stock_available) {
      formData.append("stock_available", data?.stock_available);
    }
    if (data?.varient_desc) {
      formData.append("varient_desc", data?.varient_desc);
    }

    try {
      const response = await api.post(
        `/api/admin/product-variant-update/${variant?.varient_pid}`,
        formData
      );

      // console.log("Response:", response.data.meta);
      if (response?.data?.meta?.status) {
        // console.log("api success");
        toast.success("Variant Updated successfully!", {
          position: "bottom-left",
          autoClose: 3000,
        });
        refetch();
        reset(); // Reset form after successful submission
        setTimeout(() => {
          router.push(`/${locale}/shop-now/seller/dashboard/all-product`);
        }, 3000);
      } else {
        toast.error("Failed to updating variant. Please try again.", {
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
      //   setIsLoading(false);
    }
  };

  const handleDeleteVariant = async () => {
    try {
      const response = await api.delete(
        `/api/admin/product-variant/${variant?.varient_pid}`
      );

      // console.log("Response:", response.data);

      if (response?.data?.meta?.http_status === 204) {
        toast.success("Variant Updated successfully!", {
          position: "bottom-left",
          autoClose: 3000,
        });
        refetch();
        reset();
        setTimeout(() => {
          router.push(`/${locale}/shop-now/seller/dashboard/all-product`);
        }, 3000);
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
      //   setIsLoading(false);
    }
  };
  const t = useTranslations("talentHunt");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-brandLsPrimary rounded-lg p-8 mb-4"
    >
      <div className="flex items-center justify-between">
        <HeadingPart heading={`Edit Variant ${index + 1}`} option="" />
      </div>
      <div>
        <ProductVariants
          errors={errors}
          register={register}
          variantData={variant}
        />
      </div>
      <div className="flex justify-end mt-6">
        <div className="flex gap-4">
          {/* Delete Button */}
          {totalVariants > 1 && (
            <button
              type="button"
              className="border border-red-500 hover:bg-red-600 py-4 px-10 rounded-full text-white font-medium bg-red-500"
              onClick={handleDeleteVariant}
            >
              {t("Delete")}
            </button>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="border py-4 px-10 rounded-full text-white font-medium bg-link hover:bg-linkHover"
          >
            {t("Update_Variant")}
          </button>
        </div>
      </div>
    </form>
  );
};

const EditProductVariant = ({ variants, refetch }: EditProductVariantProps) => {
  const t = useTranslations("talentHunt");
  return (
    <div className="mt-12">
      {variants?.length > 0 && (
        <p className="text-3xl text-brandPrimary mb-5">
          {t("Edit_Product_Variants")}
        </p>
      )}

      {variants?.map((variant, index) => (
        <VariantForm
          key={variant.varient_id}
          variant={variant}
          refetch={refetch}
          index={index}
          totalVariants={variants.length}
        />
      ))}
    </div>
  );
};

export default EditProductVariant;
