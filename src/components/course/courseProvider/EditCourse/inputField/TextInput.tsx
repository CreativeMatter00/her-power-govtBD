"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IDescription {
	inputName: string;
	control: any;
	errors: any;
	setTextDescription: Function;
	labelName: string;
	required: true;
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
	inputName,
	control,
	errors,
	setTextDescription,
	labelName,
	required
}) => {
	const t = useTranslations("ImagePart");
	const handleChange = (content: string) => {
		setTextDescription(content);
	};
	return (
		<div className="col-span-1 flex flex-col gap-[5px] break-words">
			<label className="text-base font-normal text-black">{labelName} {required && <span className="text-red-500">*</span>}</label>
			<div className="w-full">
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
							placeholder={t("Write_des")}
							className="break-words"
						/>
					)}
				/>
				{errors.description && (
					<span className="text-red-500 text-sm mt-1 px-6">
						{errors.description.message}
					</span>
				)}
			</div>
		</div>
	);
};

export default TextInput;
