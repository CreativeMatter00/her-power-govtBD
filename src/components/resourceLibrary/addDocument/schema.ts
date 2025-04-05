import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  doc: yup
    .mixed()
    .required("Document is required")
    .test("file","Document is required",(value:any)=>{
      return value && value[0] ;
    })
    .test("fileSize", "File size is too large", (value: any) => {
      return value && value[0] && value[0].size <= 5000000; // 5MB
    })
    .test("fileType", "Unsupported file format", (value: any) => {
      return value && value[0] && ["application/pdf"].includes(value[0].type);
    })
});

export default schema;