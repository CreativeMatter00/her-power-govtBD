"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { MdDelete, MdEdit } from "react-icons/md";

interface IFiles {
	selectedImage: File | null;
	setSelectedImage: (image: File | null) => void;
	divHeight?: string;
	errors: FieldErrors<any>;
	register: UseFormRegister<any>;
	labelName?: string;
}

const FileInput: React.FC<IFiles> = ({
	selectedImage,
	setSelectedImage,
	divHeight = "h-[100px]",
	errors,
	register,
	labelName,
}) => {
	const t = useTranslations("ImagePart");
	const [imageSrc, setImageSrc] = useState<string | null>(null);

	useEffect(() => {
		if (selectedImage) {
			const reader = new FileReader();
			reader.readAsDataURL(selectedImage);
			reader.onload = () => {
				setImageSrc(reader.result as string);
			};
			reader.onerror = () => {
				console.log(reader.error);
			};
		} else {
			setImageSrc(null);
		}
	}, [selectedImage]);

	const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedImage(file);
		}
	};

	const removeSelectedImage = () => {
		setSelectedImage(null);
	};

	return (
		<div>
			<label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
				{labelName} <span className="text-dangerPrimary">*</span>
			</label>
			<div
				className={`mt-1 block placeholder:text-[#cacaca] text-base border border-brandLsPrimary rounded w-full ${divHeight}`}
			>
				{!selectedImage ? (
					<div className="flex justify-center items-center w-full p-10 gap-4">
						<Image
							src="/assets/images/profile/inputImage.png"
							width={74}
							height={45}
							alt="input file"
							className="w-auto h-11"
						/>
						<div className="text-center text-brandPrimary text-sm">
							<p>{t("Drag your image here")}</p>
							<p>
								{t("or")} &nbsp;
								<label className="text-link text-base font-normal hover:underline cursor-pointer">
									<input
										hidden
										accept="image/*"
										type="file"
										{...register("attachment")}
										onChange={selectFile}
										className="outline-none"
									/>
									{t("Upload an Image")}
								</label>
							</p>
						</div>
					</div>
				) : (
					<div className="flex justify-evenly items-center h-full w-full p-2 gap-6">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<label htmlFor="editFile" className="cursor-pointer">
										<MdEdit fontSize={24} />
									</label>
								</TooltipTrigger>
								<TooltipContent>
									<p>{t("Change this file")}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<input
							id="editFile"
							hidden
							accept="image/*"
							type="file"
							{...register("attachment")}
							onChange={selectFile}
						/>
						{imageSrc && (
							<div>
								<Image
									src={imageSrc}
									alt="Selected file"
									width={300}
									height={100}
									className="rounded h-[80px]"
								/>
							</div>
						)}
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										onClick={removeSelectedImage}
										className="cursor-pointer"
									>
										<MdDelete fontSize={24} />
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>{t("Delete this file")}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				)}
			</div>
			{errors.attachment && errors.attachment.message && (
				<p className="text-red-500 text-sm mt-2 px-6 block">
					{(errors.attachment as any).message}
				</p>
			)}
		</div>
	);
};

export default FileInput;