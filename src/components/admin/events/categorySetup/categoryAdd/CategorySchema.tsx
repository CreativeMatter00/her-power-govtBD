import * as yup from "yup";

const CategorySchema = yup.object().shape({
	category_name: yup.string().required("Category name is required"),
	category_desc: yup.string(),
	// isActive: yup.boolean().optional(),
	remarks: yup.string(),
	attachments: yup
		.mixed<FileList>()
		.test("required", "Image is required", (value) => {
			return value && (value as FileList).length > 0;
		}),
});

export default CategorySchema;
