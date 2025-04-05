// import { Controller } from "react-hook-form";
// import ReactQuill from "react-quill";

// interface IDescription {
//   control: any;
//   errors: any;
//   setTextDescription: (content: string) => void;
//   labelName: string;
//   name: string;
//   defaultValue?: string;  // Add defaultValue as an optional prop
// }

// const modules = {
//   toolbar: [
//     [{ size: [] }],
//     ["bold", "underline"],
//     [{ list: "ordered" }, { list: "bullet" }],
//   ],
// };

// const formats = ["size", "bold", "underline", "list"];

// const TextInput: React.FC<IDescription> = ({
//   control,
//   errors,
//   setTextDescription,
//   labelName,
//   name,
//   defaultValue = "",  // Set default value to an empty string if not provided
// }) => {
//   const handleChange = (content: string) => {
//     setTextDescription(content);
//   };

//   return (
//     <div className="flex flex-col gap-[5px]">
//       <label className="text-base font-normal text-black">{labelName}</label>
//       <div className="w-full">
//         <Controller
//           name={name}
//           control={control}
//           rules={{ required: "Description is required" }}
//           render={({ field }) => (
//             <ReactQuill
//               theme="snow"
//               value={field.value ?? defaultValue} // Use defaultValue if field.value is undefined
//               onChange={(content) => {
//                 field.onChange(content);
//                 handleChange(content);
//               }}
//               modules={modules}
//               formats={formats}
//               placeholder="Write here description..."
//             />
//           )}
//         />
//         {errors[name] && (
//           <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TextInput;

"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IDescription {
  control: any;
  errors: any;
  setTextDescription: Function;
  labelName: string;
  name: string;
  required?: boolean;
}

const modules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
};

const formats = ["size", "bold", "underline", "list"];

const TextInput: React.FC<IDescription> = ({
  control,
  errors,
  setTextDescription,
  labelName,
  name,
  required
}) => {
  const handleChange = (content: string) => {
    setTextDescription(content);
  };
const t = useTranslations("career");
  return (
    <div className="flex flex-col gap-[5px]">
      <label className="text-base font-normal text-black">{labelName} {required && (<span className="text-dangerPrimary  ">*</span>)}</label>
      <div className="w-full">
        <Controller
          name={name}
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              value={field.value || ""}
              onChange={(content) => {
                field.onChange(content);
                handleChange(content);
              }}
              modules={modules}
              formats={formats}
              placeholder={t("Write here description")}
            />
          )}
        />
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
        )}
      </div>
    </div>
  );
};

export default TextInput;
