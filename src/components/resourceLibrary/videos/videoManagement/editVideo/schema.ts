import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  // des: yup.string().required("Description is required"),
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
    // .test("fileSize", "File size is too large", (value: any) => {
    //   return value && value[0] && value[0].size <= 5000000; 
    // })
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
    // .test("fileSize", "File size is too large", (value: any) => {
    //   return value && value[0] && value[0].size <= 5000000000; 
    // })
});

export default schema;