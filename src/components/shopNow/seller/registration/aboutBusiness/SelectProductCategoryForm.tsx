import { useFormContext } from "react-hook-form";
import ProductCategoryInput from "./ProductCategoryInput";
import { useQuery } from "@tanstack/react-query";
import { getProductCategories } from "@/api/api";

// const categoryProps = {
// title: "Select Product Category",
// defaultValueInput: "",
// values: [
// 	{ value: "Food", id: "Food", htmlFor: "Food", label: "Food" },
// 	{
// 		value: "Groceries",
// 		id: "Groceries",
// 		htmlFor: "Groceries",
// 		label: "Groceries",
// 	},
// 	{
// 		value: "Electronics",
// 		id: "Electronics",
// 		htmlFor: "Electronics",
// 		label: "Electronics",
// 	},
// 	{ value: "Books", id: "Books", htmlFor: "Books", label: "Books" },
// 	{
// 		value: "Handicraft",
// 		id: "Handicraft",
// 		htmlFor: "Handicraft",
// 		label: "Handicraft",
// 	},
// 	{ value: "Hygiene", id: "Hygiene", htmlFor: "Hygiene", label: "Hygiene" },
// 	{
// 		value: "Life Style",
// 		id: "Life Style",
// 		htmlFor: "Life Style",
// 		label: "Life Style",
// 	},
// 	{
// 		value: "Zip Code",
// 		id: "Zip Code",
// 		htmlFor: "Zip Code",
// 		label: "Zip Code",
// 	},
// ],
// name: "selectedProductCategory",
// };

const SelectProductCategoryForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useFormContext();

	const onSubmit = (data: any) => {
		// Handle form submission
		console.log(data);
	};

	const { isLoading, error, data } = useQuery({
		queryKey: ["ProductCategories"],
		queryFn: getProductCategories,
	});

	if (error)
		return (
			<div className="text-center text-xl font-md py-8">
				Something went wrong. Please reload
			</div>
		);

	// console.log(data);

	const categories = data?.data || [];

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-6">
					<ProductCategoryInput
						values={categories} // Spread categoryProps to pass all props
						name="selectedProductCategory"
						isLoading={isLoading}
						register={register}
						errors={errors}
					/>
				</div>
			</form>
		</>
	);
};

export default SelectProductCategoryForm;
