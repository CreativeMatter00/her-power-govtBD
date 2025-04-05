"use client";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";
import { ChangeEvent, useEffect, useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

//  ==================== INTERFACE FOR MULTIPLE IMAGES ===========================
interface ImageInfo {
	fileObjects: File[];
	setFileObjects: Function;
	isSubmitted: boolean;
	defaultValue?: any;
}

const ProductImage: React.FC<ImageInfo> = ({
	fileObjects,
	setFileObjects,
	isSubmitted,
	defaultValue,
}) => {
	
	const [imageSrc, setImageSrc] = useState<string[] | null>(null);

	useEffect(() => {
		if (defaultValue) {
			const defaultImageUrls = defaultValue.map((item: any) => item.file_url);
			setImageSrc(defaultImageUrls);
		}
	}, [defaultValue]);

	// console.log(defaultValue);

	const imageChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const selectedFiles = event.target.files;

		if (selectedFiles) {
			const fileList = Array.from(selectedFiles);
			const filesObject = fileList.slice(0, 6);
			setFileObjects(filesObject); //! modified

			const images: string[] = [];
			for (const imageFile of filesObject) {
				const reader = new FileReader();
				reader.readAsDataURL(imageFile);
				reader.onload = () => {
					images.push(reader.result as string);
					if (images.length === filesObject.length) {
						setImageSrc([...images]);
					}
				};
				reader.onerror = () => {
					console.log(reader.error);
				};
			}
		}
	};

	// ====================== TO REMOVE MULTIPLE IMAGES AT A TIME =====================
	const removeSelectedImage = () => {
		setFileObjects(null);
		setImageSrc(null);
	};

	// console.log("image source: ", imageSrc);

	return (
		<div className="h-full flex flex-col gap-2">
			<label className="text-brandPrimary text-sm pl-6">Upload Image <span className="text-red-500">*</span></label>
			<div className="h-full border border-brandLsPrimary rounded-lg bg-white">
				{!imageSrc ? (
					<div className="flex justify-center items-center h-full w-full p-8 gap-4">
						<Image
							src="/assets/images/profile/inputImage.png"
							width={74}
							height={45}
							alt="input file"
							className="w-auto h-11"
						/>
						<div className="text-center text-brandPrimary text-sm">
							<p>Drag your profile images here</p>
							<p>
								or
								<label className="text-link text-base font-normal hover:underline cursor-pointer">
									{/* ================ INPUT FIELD IMAGE =================== */}
									<input
										hidden
										accept="image/*"
										type="file"
										multiple
										onChange={imageChange}
									/>
									&nbsp;Upload a file
								</label>
							</p>
						</div>
					</div>
				) : (
					<div className="flex justify-evenly items-center h-full w-full p-2 gap-6">
						{/* ================= IMAGE EDIT OPTOIN ================== */}
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<label htmlFor="editImage" className="cursor-pointer">
										<MdEdit fontSize={24} />
									</label>
								</TooltipTrigger>
								<TooltipContent>
									<p>Change this image</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						{/* ======================== EDIT INPUT IMAGES ========================= */}
						<input
							id="editImage"
							hidden
							accept="image/*"
							type="file"
							multiple
							onChange={imageChange}
						/>

						{/* ======================= DISPLAY INPUT IMAGES ===================== */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{/* <div className="flex items-center justify-center gap-4"> */}
							{(imageSrc || []).map((src, index) => (
								<div
									key={index}
									className="relative h-32 w-32 border border-gray-200 rounded-lg overflow-hidden"
								>
									<Image
										src={src || `/assets/images/profile/inputImage.png`}
										alt={`Selected image ${index}`}
										layout="fill"
										objectFit="cover"
										className="h-full w-full"
									/>
								</div>
							))}
						</div>

						{/* ===================== DELETE INPUT IMAGES ======================= */}
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										onClick={removeSelectedImage}
										className="cursor-pointer"
										type="button"
									>
										<MdDelete fontSize={24} />
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Delete this image</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				)}
			</div>
			{/* {isSubmitted === true && fileObjects.length === 0 ? (
        <p className="text-red-500 text-sm mt-2 ml-6">This field is required</p>
      ) : null} */}
		</div>
	);
};

export default ProductImage;
