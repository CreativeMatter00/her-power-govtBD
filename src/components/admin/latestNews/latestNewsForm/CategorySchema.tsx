import * as yup from "yup";

const CategorySchema = yup.object().shape({
	newsTitle: yup.string().required("News title is required"),
	newsDescription: yup.string().required("News description is required"),
	// newsDate: yup.string().required("News date is required"),
	// pdfFile: yup.string().required("Upload PDF files"),
	pdfFile: yup.string(),
	authorName: yup.string(),
	// isActive: yup.boolean(),
});

export default CategorySchema;
