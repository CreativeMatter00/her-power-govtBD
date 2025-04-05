// "use client";

// import { useParams } from "next/navigation";
// import React from "react";

// const EditProduct = () => {
//   const params = useParams();
//   console.log(params);
//   return <div>{params?.id}</div>;
// };

// export default EditProduct;

"use client";
import { useParams } from "next/navigation";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InventoryManagement from "../editProduct/FormPart/InventoryManagement";
import OtherSetting from "../editProduct/FormPart/OtherSetting";
import ProductInformation from "../editProduct/FormPart/ProductInformation";
import ProductVariants from "../editProduct/FormPart/ProductVariants";
import HeadingPart from "../editProduct/HeadingPart";
import ProductSchema from "../editProduct/ProductSchema";
import { useQuery } from "@tanstack/react-query";
import { getProductDetails, url } from "@/api/api";
import { type } from "os";
import ScaleLoader from "react-spinners/ScaleLoader";

interface IVariant {
	varient_name: string;
	mrp_primary: number;
	mrp: number;
	disc_pct?: number;
	varient_value?: number;
}

interface IFormInput {
	variants?: {
		varient_name?: string;
		mrp_primary?: number;
		mrp?: number;
		disc_pct?: number;
		varient_value?: number;
	}[];
	category_pid?: string;
	product_pid?: string;
	enterpenure_pid?: string;
	ud_serialno?: string;
	product_name: string;
	brand_name: string;
	model_name?: string;
	description?: string;
}

const EditProduct = () => {
	const params = useParams();
	const productId = params?.id;

	// =========== DATA FETCHING =========
	const {
		isLoading: productDetailsLoading,
		error,
		data: productDetailData,
		refetch,
	} = useQuery({
		queryKey: ["productDetails", params.id],
		queryFn: () => getProductDetails(productId as string),
	});

	// console.log("Product Details Data: ", productDetailData);
	// ? Get seller id

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		resetField,
		watch,
		control,
	} = useForm<IFormInput>({
		resolver: productDetailData ? yupResolver(ProductSchema) : undefined,
		// defaultValues: {
		//   product_name: productDetailData && productDetailData?.data?.product_name,
		// },
	});

	const product_name = watch("product_name");
	// console.log(product_name);

	const userInfo = JSON.parse(localStorage.getItem("loginDetails") || "{}");
	const entrepreneurId = userInfo.enterpenure_pid;

	// ==================== STATE INITILIZED FOR INPUTS ====================
	const [description, setDescription] = useState<string>("");
	const [promotionStartDate, setPromotionStartDate] = useState<string>("");
	const [promotionEndDate, setPromotionEndDate] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [fileObjects, setFileObjects] = useState<File[]>([]);
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

	const [variants, setVariants] = useState<{ id: number }[]>([
		{ id: Date.now() },
	]);
	const [variantCheck, setVariantCheck] = useState<any>(false);
	const [hiddenVariants, setHiddenVariants] = useState<{ id: number }[]>([]);

	// const addVariant = () => {
	//   setVariants([...variants, { id: Date.now() }]);
	// };

	// const resolver = yupResolver(ProductSchema);

	const { fields, append, remove } = useFieldArray({
		control,
		name: "variants",
	});

	const addVariant = () => {
		setVariantCheck(true);
		setVariants([...variants, { id: Date.now() }]);
	};

	let updatedExistingVariants;
	const removeVariant = (id: any) => {
		const isExistingVariant = existingVariants.some(
			(variant: any) => variant.varient_id === id
		);

		// console.log(existingVariants);
		// console.log(isExistingVariant);

		updatedExistingVariants = [...existingVariants];

		if (isExistingVariant) {
			updatedExistingVariants = existingVariants.filter(
				(variant: any) => variant.varient_id !== id
			);
		} else {
			const updatedVariants = variants.filter((variant) => variant.id !== id);

			// console.log("updated variants : ", updatedVariants);
			setVariants(updatedVariants);
		}
		resetField(`variants[${id}]` as any);
		setHiddenVariants((prev) => [...prev, { id }]);

		// console.log("updatedExistingVariants", updatedExistingVariants);
	};

	const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
		// console.log("Form Data:", data);

		const formattedData: any = {
			product_name: data.product_name,
			brand_name: data.brand_name,
			model_name: data.model_name,
			description: description || "description",
			category_pid: productDetailData?.data.category_pid,
			product_pid: productDetailData?.data.product_pid,
			enterpenure_pid: productDetailData?.data.enterpenure_pid,
			ud_serialno: "1",
			varient_desc: [],
			varient_name: [],
			mrp_primary: [],
			mrp: [],
			disc_pct: [],
			varient_value: [],
			attachments: fileObjects,
		};

		// Assuming data.variants holds the variants
		Object.values(data.variants || []).forEach((variant: any) => {
			formattedData?.varient_name.push(variant?.varient_name);
			formattedData?.mrp_primary.push(variant?.mrp_primary);
			formattedData?.mrp.push(variant?.mrp);
			formattedData?.disc_pct.push(variant?.disc_pct);
			formattedData?.varient_value.push(variant?.varient_value);
			formattedData?.varient_desc.push(variant?.varient_desc || "");
		});

		// console.log("formattedData:", formattedData); // Log formattedData to ensure correct structure

		// Submit the formattedData via POST
		setIsLoading(true);
		try {
			const response = await axios.post(
				`${url}/api/admin/update-product/${productId}`,
				formattedData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			// console.log("Response:", response.data);

			if (response?.data?.code === 200) {
				toast.success("Product Updated successfully!", {
					position: "bottom-left",
					autoClose: 3000,
				});
				refetch();
				reset(); // Reset form after successful submission
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

	const discardData = () => {
		reset();
		setDescription("");
		setPromotionStartDate("");
		setPromotionEndDate("");
	};

	const existingVariants = Array.isArray(
		productDetailData?.data?.productvariants
	)
		? productDetailData.data.productvariants
		: [];

	// const displayedVariants = variantCheck
	//   ? [...existingVariants, ...variants]
	//   : existingVariants;

	const displayedVariants = variantCheck
		? [...existingVariants, ...variants].filter(
				(variant) =>
					!hiddenVariants.some(
						(hidden) =>
							hidden.id === variant.id || hidden.id === variant.varient_id
					)
		  )
		: existingVariants.filter(
				(variant: any) =>
					!hiddenVariants.some((hidden) => hidden.id === variant.varient_id)
		  );
	if (productDetailsLoading)
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<ScaleLoader color="#421957" height={70} radius={8} width={10} />
			</div>
		);

	return (
		<div className="container p-4">
			<div className="flex justify-between mb-4">
				<p className="text-3xl text-brandPrimary">Edit Product</p>

				<p className="text-base hover:underline text-link cursor-pointer"></p>
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="border border-brandLsPrimary rounded-lg p-8"
			>
				{/* =============================== PRODUCT INFORMATION =========================== */}
				<HeadingPart heading="Product Information" option="" />
				<ProductInformation
					errors={errors}
					register={register}
					description={description}
					setDescription={setDescription}
					fileObjects={fileObjects}
					setFileObjects={setFileObjects}
					isSubmitted={isSubmitted}
					control={control}
					productData={productDetailData}
				/>

				{/* =================================== PRODUCT VARIANTS ============================ */}

				<div>
					<div className="flex items-center justify-between">
						<HeadingPart heading="Product Variants" option="" />
						<button
							type="button"
							className="flex gap-2 items-center rounded-full text-white"
							onClick={addVariant}
						>
							<FaPlus className="bg-link text-bgPrimary p-2 w-8 h-8 rounded-full" />
						</button>
					</div>

					{/* Combined product variants list */}
					<div>
						{displayedVariants.map((variant: any, index: any) => {
							const isExistingVariant = Boolean(variant.varient_id);
							return (
								<div
									key={isExistingVariant ? variant.varient_id : variant.id}
									className={`flex flex-col ${
										hiddenVariants.some(
											(hidden) =>
												hidden.id === variant.id ||
												hidden.id === variant.varient_id
										)
											? "hidden"
											: ""
									}`}
								>
									<div className="my-2 flex items-center justify-between">
										<div>Variant Type: {index + 1}</div>
										{displayedVariants.length > 1 && (
											<button
												type="button"
												className="p-2"
												onClick={() =>
													removeVariant(
														isExistingVariant ? variant.varient_id : variant.id
													)
												}
											>
												<FaMinus className="bg-red-500 text-bgPrimary p-2 w-8 h-8 rounded-full" />
											</button>
										)}
									</div>
									<ProductVariants
										errors={errors}
										register={register}
										index={isExistingVariant ? variant.varient_id : variant.id}
										variantData={variant}
									/>
								</div>
							);
						})}
					</div>
				</div>

				{/* ====================== INVENTORY MANAGEMENT ======================= */}
				<HeadingPart heading="Inventory Management" option="" />
				{/* api not available  */}
				<InventoryManagement
					errors={errors}
					register={register}
					defaultValue={productDetailData?.data?.inventory}
				/>

				{/* =============================== OTHER SETTINGS ============================== */}
				<HeadingPart heading="Other Settings" option="(optional)" />
				<OtherSetting errors={errors} register={register} />

				{/* ============================================== BUTTONS =============================== */}
				<div className="flex max-md:flex-col flex-row md:justify-between mt-6">
					<div className="flex max-md:flex-col flex-row gap-4 max-md:order-2 max-md:mt-3">
						{/* ============================= SUBMIT BUTTON ======================== */}
						<button
							type="submit"
							// onClick={() => setIsSubmitted(true)}
							className="border py-4 px-10 rounded-full text-white font-medium bg-link hover:bg-linkHover"
						>
							Update Product
						</button>
					</div>
					{/* ============================= DISCARD BUTTON ======================== */}
					<button
						type="button"
						onClick={discardData}
						className="text-link hover:underline  max-md:order-1"
					>
						Discard
					</button>
				</div>
			</form>
			<ToastContainer />
		</div>
	);
};

export default EditProduct;
