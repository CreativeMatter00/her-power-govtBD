"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IDescription {
  control: any;
  errors: any;
  textDescription: string;
  setTextDescription: Function;
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
  textDescription,
  setTextDescription,
  required,
}) => {
  const t = useTranslations("resources_Library");
  const handleChange = (content: string) => {
    setTextDescription(content);
  };
  return (
    <div>
      <div className="mb-1">
        <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
          {t("Description")} {required && <span className="text-red-500">*</span>}
        </label>
      </div>
      <div className="w-full">
        <Controller
          name="des"
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
              placeholder={t("WriteDes")}
            />
          )}
        />
        {errors.des && (
          <span className="text-red-500 text-sm mt-1 px-3">
            {errors.des.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextInput;
