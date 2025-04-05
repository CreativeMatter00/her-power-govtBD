import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
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
    ,
  video: yup
    .mixed()
    .test("file", "Video is required", (value: any) => {
      if (typeof value === "string") return true;
      return value && value[0];
    })
    .test("fileType", "Unsupported file format", (value: any) => {
      if (typeof value === "string") return true;
      return value && value[0] && ["video/mp4", "video/mkv", 'video/webm'].includes(value[0].type);
    }),
});

export default schema;