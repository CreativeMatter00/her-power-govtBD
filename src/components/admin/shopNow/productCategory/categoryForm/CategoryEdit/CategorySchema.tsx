import * as yup from "yup";

const CategorySchema = yup.object().shape({
	categoryName: yup.string().required("Category name is required"),
	categoryDescription: yup
		.string()
		.required("Category description is required"),
	isActive: yup.boolean().optional(),
});

export default CategorySchema;
