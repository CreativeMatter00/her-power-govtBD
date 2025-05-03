"use client";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IDescription {
  control: any;
  errors: any;
  labelName: string;
  required?: boolean;
  inputName: string;
  defaultValue?: string;
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
  labelName,
  required,
  inputName,
  defaultValue,
}) => {
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
          render={({ field: { onChange, value } }) => (
            <ReactQuill
              theme="snow"
              value={value || defaultValue}
              onChange={onChange}
              modules={modules}
              formats={formats}
              placeholder="Write description here..."
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
