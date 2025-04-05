import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  thumbnail: yup
    .mixed()
    .required("Thumbnail is required")
    .test("file", "Thumbnail is required", (value: any) => {
      return value && value[0];
    })
    .test("fileSize", "File size is too large", (value: any) => {
      return value && value[0] && value[0].size <= 5000000;
    })
    .test("fileType", "Unsupported file format", (value: any) => {
      return (
        value && value[0] && ["image/jpeg", "image/png"].includes(value[0].type)
      );
    }),
  des: yup.string().required("Description is required"),
  video: yup
    .mixed()
    .required("Video is required")
    .test("file", "Video is required", (value: any) => {
      return value && value[0];
    })
    .test("fileSize", "File size is too large", (value: any) => {
      return value && value[0] && value[0].size <= 50000000000;
    }),
  // .test("fileType", "Unsupported file format", (value: any) => {
  //   return (
  //     value && value[0] && ["video/mp4", "video/mkv", 'video/webm'].includes(value[0].type)
  //   );
  // }),
});

export default schema;
