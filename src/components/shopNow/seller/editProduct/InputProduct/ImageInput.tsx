"use client";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";
import { ChangeEvent, useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

//  ==================== INTERFACE FOR SINGLE IMAGE ===========================
interface ImageInfo {
	selectedImage: File | null;
	setSelectedImage: (image: File | null) => void;
}

const InputImage: React.FC<ImageInfo> = ({
	selectedImage,
	setSelectedImage,
}) => {
	// ===================== STATE INITIALIZED TO STORE SINGLE IMAGE =======================
	const [imageSrc, setImageSrc] = useState<string | null>(null);

	// ============================= FUNCTION TO TAKE SINGLE IMAGE AS INPUT ====================
	const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			// console.log(e.target.files);
			const file = e.target.files[0]; // get the first selected file
			// console.log(file);
			// setSelectedImage(file);

			// const reader = new FileReader();
			// reader.readAsDataURL(file);
			// reader.onload = () => {
			// 	setImageSrc(reader.result as string);
			// };
			// reader.onerror = () => {
			// 	console.log(reader.error);
			// };
		}
	};

	// ====================== TO REMOVE THE SELECTED IMAGE =====================
	const removeSelectedImage = () => {
		setSelectedImage(null);
		setImageSrc(null);
	};

	return (
		<div className="h-full flex flex-col gap-2">
			<label className="text-brandPrimary text-sm pl-6">Upload Image</label>
			<div className="h-full border border-brandLsPrimary rounded-lg bg-white">
				{!selectedImage ? (
					<div className="flex justify-center items-center h-full w-full p-8 gap-4">
						<Image
							src="/assets/images/profile/inputImage.png"
							width={74}
							height={45}
							alt="input file"
							className="w-auto h-11"
						/>
						<div className="text-center text-brandPrimary text-sm">
							<p>Drag your profile image here</p>
							<p>
								or
								<label className="text-link text-base font-normal hover:underline cursor-pointer">
									{/* ======================== INPUT FIELD IMAGE ========================== */}
									<input
										hidden
										accept="image/*"
										type="file"
										onChange={imageChange}
									/>
									&nbsp;Upload a file
								</label>
							</p>
						</div>
					</div>
				) : (
					<div className="flex justify-evenly items-center h-full w-full p-2 gap-6">
						{/* ======================= IMAGE EDIT OPTION ========================= */}
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

						{/* ======================== EDIT INPUT IMAGE ========================= */}
						<input
							id="editImage"
							hidden
							accept="image/*"
							type="file"
							onChange={imageChange}
						/>

						{/* ======================= DISPLAY INPUT IMAGE ===================== */}
						{imageSrc && (
							<div>
								<Image
									src={imageSrc}
									alt="Selected image"
									width={100}
									height={100}
									className="h-full"
								/>
							</div>
						)}

						{/* ===================== DELETE INPUT IMAGE ======================= */}
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
									<p>Delete this image</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				)}
			</div>
		</div>
	);
};

export default InputImage;
