"use client";
// import { RxUnderline } from "react-icons/rx";
// import { MdOutlineFormatBold } from "react-icons/md";
// import { VscItalic } from "react-icons/vsc";
// import { IoList } from "react-icons/io5";
// import { MdFormatListNumbered } from "react-icons/md";
// import { UseFormRegister } from "react-hook-form";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import style from "@/styles/textEditor.module.css";
import "./style.css";

const modules = {
	toolbar: [
		[{ size: [] }],
		["bold", "underline"],
		[{ list: "ordered" }, { list: "bullet" }],
	],
};

const formats = ["size", "bold", "underline", "list"];

const TextInput = () => {
	const [value, setValue] = useState<string>("");
	const handleChange = (content: string) => {
		setValue(content);
	};

	//   console.log(value);
	return (
		<>
			<div>
				<label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
					News Content
				</label>
				<div className="w-full">
					<ReactQuill
						theme="snow"
						value={value}
						onChange={handleChange}
						modules={modules}
						formats={formats}
						placeholder="Write here description..."
					/>
				</div>

				{/* <div>{value}</div> */}
			</div>
		</>
	);
};

export default TextInput;
