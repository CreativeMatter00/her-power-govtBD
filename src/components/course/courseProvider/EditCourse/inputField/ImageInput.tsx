"use client";
import Image from "next/image";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdDelete, MdEdit } from "react-icons/md";
import { ChangeEvent } from "react";
import { UseFormRegister } from "react-hook-form";
import { useTranslations } from "next-intl";

interface IImageInfo {
	selectedFile: File | null;
	setSelectedFile: (image: File | null) => void;
	title: string;
	register?: UseFormRegister<any>;
	setValue?: any;
	inputName: string;
	imageUrl?: string;
	required?: boolean;
}

const ImageInput: React.FC<IImageInfo> = ({
	selectedFile,
	setSelectedFile,
	title,
	register,
	setValue,
	inputName,
	imageUrl,
	required,
}) => {
	const t = useTranslations("ImagePart");
	const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files?.length > 0) {
			const file = e.target.files[0];
			setSelectedFile(file);
			if (setValue) {
				setValue(inputName, file);
			}
		}
	};

	const removeSelectedFile = () => {
		setSelectedFile(null);
		if (setValue) {
			setValue(inputName, null);
		}
	};

	return (
		<div className="h-36 flex flex-col gap-2 w-full">
			<label className="text-brandPrimary text-sm pl-6"> {t(`${title}`)} {required && <span className="text-red-500">*</span>} </label>

			<div className="h-full border border-[#EEDDF5] rounded-lg bg-white">
				{(!selectedFile && !imageUrl) ? (
					<div className="flex justify-center items-center h-full w-full p-8 gap-4">
						<Image
							src="/assets/images/profile/inputImage.png"
							width={74}
							height={45}
							alt="input file"
							className="w-auto h-11"
						/>
						<div className="text-center text-brandPrimary text-sm">
							<div>
								<label className="text-link text-base font-normal hover:underline cursor-pointer">
									<input
										hidden
										accept="image/*"
										type="file"
										{...(register
											? register(inputName, {
												onChange: (e) => {
													imageChange(e);
												},
											})
											: { onChange: imageChange })}
									/>
									{t("Upload an Image")}
								</label>
							</div>
						</div>
					</div>
				) : (
					<div className="flex justify-center items-center h-full w-full p-2 gap-6">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<label htmlFor={inputName} className="cursor-pointer">
										<MdEdit fontSize={24} />
									</label>
								</TooltipTrigger>
								<TooltipContent>
									<p>{t("Change this image")}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<input
							id={inputName}
							hidden
							accept="image/*"
							type="file"
							onChange={imageChange}
						/>

						{(selectedFile || imageUrl) && (
							<Image
								src={selectedFile ? URL.createObjectURL(selectedFile) : imageUrl!}
								width={300}
								height={300}
								alt="Selected file"
								className="w-auto h-24 max-w-56"
							/>
						)}

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button onClick={removeSelectedFile} className="cursor-pointer">
										<MdDelete fontSize={24} />
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>{t("Delete this image")}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				)}
			</div>
		</div>
	);
};

export default ImageInput;
