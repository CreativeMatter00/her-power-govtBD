import * as yup from "yup";

const NewsFormSchema = yup.object().shape({
  news_title: yup.string().required("News title is required"),
  news_content: yup.string().required("News description is required"),
  effectivefrom: yup.string().required("News date is required"),
  effectiveto: yup.string().required("News date is required"),
  news_author: yup.string().required("News date is required"),
  attachments: yup.mixed(),
});

export default NewsFormSchema;
