"use client";

import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IDescription {
  description: string;
  setDescription: Function;
  isSubmitted: boolean;
  errors: any;
  defaultValue?: any;
  register: UseFormRegister<any>;
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
  description,
  setDescription,
  isSubmitted,
  defaultValue,
  register,
}) => {
  // const [value, setValue] = useState<string>("");
  const handleChange = (content: string) => {
    // setValue(content);
    setDescription(content);
  };

  // console.log(description);
  return (
    <>
      <div>
        <div className="mb-1">
          <label className="text-sm font-normal pb-2 pl-6 text-brandPrimary">
            Description
          </label>
        </div>
        <div className="w-full">
          <ReactQuill
            theme="snow"
            value={ description || defaultValue}
            // value={description}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            placeholder="Write here description..."
            // {...register()}
            // {...register('myField', {
            // 	onChange: handleChange
            // })}
          />
          {isSubmitted === true && description === "" ? (
            <p className="text-red-500 text-sm mt-2 ml-6">
              This field is required
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default TextInput;
