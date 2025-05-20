import * as yup from 'yup';
const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, "").replace(/&nbsp;|\s|\\n/g, "");
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
 des: yup
    .string()
    .required("Description is required")
    .test("not-empty", "Description cannot be empty", (value) => {
      if (!value) return false;
      return stripHtml(value).length > 0;
    }),
  banner: yup
    .mixed()
    .test("file", "Banner is required", (value: any) => {
      if (typeof value === "string") return true;
      return value && value[0];
    })
    .test("fileType", "Unsupported file format", (value: any) => {
      if (typeof value === "string") return true;
      return value && value[0] && ["image/jpeg", "image/png"].includes(value[0].type);
    })
    .test("fileSize", "File size is too large", (value: any) => {
      if (typeof value === "string") return true;
      return value && value[0] && value[0].size <= 5000000; // 5MB
    }).required("Banner is Required")
    ,
  thumbnail: yup
    .mixed()
    .test("file", "Thumbnail is required", (value: any) => {
      if (typeof value === "string") return true;
      return value && value[0];
    })
    .test("fileType", "Unsupported file format", (value: any) => {
      if (typeof value === "string") return true;
      return value && value[0] && ["image/jpeg", "image/png"].includes(value[0].type);
    })
    .test("fileSize", "File size is too large", (value: any) => {
      if (typeof value === "string") return true;
      return value && value[0] && value[0].size <= 5000000; // 5MB
    }).required("Thumbnail is Required"),
});

export default schema;