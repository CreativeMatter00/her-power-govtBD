"use client";
import { api } from "@/api/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductVariants from "../FormPart/ProductVariants";
import HeadingPart from "../HeadingPart";
import { VariantSchema } from "./Schema";

interface AddNewVariantI {
	refetch: Function;
	productId: string | string[];
}

const AddNewVariant = ({ refetch, productId }: AddNewVariantI) => {
	const router = useRouter();
  	const locale = useLocale();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		control,
	} = useForm({
		resolver: yupResolver(VariantSchema),
	});

	const onSubmit = async (data: any) => {
		if (data?.mrp_primary && data?.mrp) {
			const mrpPercentageDifference = ((data.mrp - data.mrp_primary) / data.mrp_primary) * 100;
			const roundedPercentage = Math.round(mrpPercentageDifference).toString();
			data.disc_pct= roundedPercentage;
		  }
		try {
			const response = await api.post(
				`/api/admin/product-variant/${productId}`,
				data
			);

			if (response?.data?.meta?.status) {
				toast.success("Variant Updated successfully!", {
					position: "bottom-left",
					autoClose: 3000,
				});
				refetch();
				reset(); // Reset form after successful submission
				router.push(`/${locale}/shop-now/seller/dashboard/all-product`);
			} else {
				toast.error("Failed to update product. Please try again.", {
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

	return (
		<div className="mt-12">
			<p className="text-3xl text-brandPrimary mb-5">Add Product Variants</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="border border-brandLsPrimary rounded-lg p-8"
			>
				<div className="flex items-center justify-between">
					<HeadingPart heading="Product Variants" option="" />
				</div>
				<div>
					<ProductVariants errors={errors} register={register} />
				</div>
				<div className="flex justify-end mt-6">
					{/* Submit Button */}
					<button
						type="submit"
						className="border py-4 px-10 rounded-full text-white font-medium bg-link hover:bg-linkHover"
					>
						Add Variant
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddNewVariant;
