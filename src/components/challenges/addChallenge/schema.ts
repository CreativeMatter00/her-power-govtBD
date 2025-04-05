import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  banner: yup
    .mixed()
    .required("Banner is required")
    .test("file","Banner is required",(value:any)=>{
      return value && value[0] ;
    })
    .test("fileType", "Unsupported file format", (value:any) => {
      return value && value[0] && ["image/jpeg", "image/png"].includes(value[0].type);
    })
    .test("fileSize", "File size is too large", (value:any) => {
      return value && value[0] && value[0].size <= 50000000; // 5MB
    })
    ,
    thumbnail: yup
    .mixed()
    .required("Thumbnail is required")
    .test("file","Thumbnail  is required",(value:any)=>{
      return value && value[0] ;
    })
    .test("fileType", "Unsupported file format", (value:any) => {
      return value && value[0] && ["image/jpeg", "image/png"].includes(value[0].type);
    })
    .test("fileSize", "File size is too large", (value:any) => {
      return value && value[0] && value[0].size <= 50000000; // 5MB
    }),
  des: yup.string().required("Description is required"),
});

export default schema;