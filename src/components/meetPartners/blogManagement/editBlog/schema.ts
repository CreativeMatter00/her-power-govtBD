import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  des: yup.string().required("Description is required"),
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
    }),
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
    }),
});

export default schema;