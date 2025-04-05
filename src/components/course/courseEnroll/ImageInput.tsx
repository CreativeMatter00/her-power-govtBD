"use client";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Image from "next/image";
import React, { ChangeEvent } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

interface ImageState {
	selectedImage: File | null;
	setSelectedImage: (image: File | null) => void;
}

const ImageInput: React.FC<ImageState> = ({
	selectedImage,
	setSelectedImage,
}) => {
	const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files?.length > 0) {
			setSelectedImage(e.target.files[0]);
		}
	};

	const removeSelectedImage = () => {
		setSelectedImage(null);
	};

	return (
		<>
			<div>
				<div className="border border-greyPrimary">
					<div
						className={`${
							!selectedImage ? "py-8 px-4" : "p-0"
						} flex items-center justify-center text-base hover:underline h-36 w-36`}
					>
						{!selectedImage ? (
							<label className="cursor-pointer">
								<input
									type="file"
									hidden
									accept="image/*"
									onChange={imageChange}
								/>
								<span className="block">Upload your</span>
								<span className="block">photo here</span>
							</label>
						) : (
							<>
								<div className="relative">
									<input
										type="file"
										hidden
										accept="image/*"
										onChange={imageChange}
									/>
									<Image
										src={URL.createObjectURL(selectedImage)}
										width={144}
										height={144}
										alt="Selected file"
										className="object-fit w-36 h-36"
									/>
									<div className="absolute inset-0 flex items-center justify-center gap-4">
										{/* <TooltipProvider>
											<Tooltip>
												<TooltipTrigger> */}
										<div className="backdrop-blur-md bg-transparent p-1 rounded-full">
											<label htmlFor="editImage" className="cursor-pointer">
												<MdEdit className=" cursor-pointer text-white w-4 h-4" />
											</label>
										</div>
										{/* </TooltipTrigger>
												<TooltipContent> */}
										{/* <p className="text-white text-xs">Edit</p> */}
										{/* </TooltipContent>
											</Tooltip>
										</TooltipProvider> */}

										<input
											id="editImage"
											hidden
											accept="image/*"
											type="file"
											onChange={imageChange}
										/>

										<TooltipProvider>
											<Tooltip>
												<div>
													<TooltipTrigger>
														<div className="backdrop-blur-md bg-transparent p-1 rounded-full">
															<MdDelete
																type="button"
																onClick={removeSelectedImage}
																className="cursor-pointer text-white w-4 h-4"
															/>
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p className="text-white text-xs">Remove</p>
													</TooltipContent>
												</div>
											</Tooltip>
										</TooltipProvider>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ImageInput;
