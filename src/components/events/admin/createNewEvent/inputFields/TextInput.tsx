"use client";
import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IDescription {
  control: any;
  errors: any;
  setTextDescription: Function;
  labelName: string;
  required?: boolean;
  inputName: string;
}

const modules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
};

const formats = ["size", "bold", "underline", "list", "normal"];

const TextInput: React.FC<IDescription> = ({
  control,
  errors,
  setTextDescription,
  labelName,
  required,
  inputName,
}) => {
  const handleChange = (content: string) => {
    setTextDescription(content);
  };

  return (
    <div>
      <div className="mb-1">
        <label className="text-sm font-normal pb-2 pl-6 text-brandPrimary">
          {labelName} {required && <span className="text-red-500">*</span>}
        </label>
      </div>
      <div className="w-full break-all inline-block">
        <Controller
          name={inputName}
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
              placeholder="Write here description..."
              preserveWhitespace={true}
            />
          )}
        />
        {errors[inputName] && ( 
          <span className="text-red-500 text-sm mt-1 px-6">
            {errors[inputName].message}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextInput;
