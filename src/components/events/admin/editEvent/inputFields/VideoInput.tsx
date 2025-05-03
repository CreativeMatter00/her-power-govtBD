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

// ****************************** IMAGE TYPE DEFINITION ==========================
interface IVideoInfo {
	selectedFile: File | null;
	setSelectedFile: (image: File | null) => void;
}

const VideoInput: React.FC<IVideoInfo> = ({
	selectedFile,
	setSelectedFile,
}) => {
	// ================================ IMAGE CHANGE FUNCTION =====================
	const videoChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setSelectedFile(e.target.files[0]);
		}
	};

	// ================================ REMOVE IMAGE ===============================
	const removeSelectedFile = () => {
		setSelectedFile(null);
	};

	return (
		<div className="h-36 flex flex-col gap-2">
			{/* ======================================== TITLE ================================== */}
			<label className="text-brandPrimary text-sm pl-6">
				Video <span className="text-greyPrimary">(optional)</span>
			</label>

			<div className="h-full border border-[#EEDDF5] rounded-lg bg-white">
				{/* =============================== IF NO FILE SELECTED ============================= */}
				{!selectedFile ? (
					<div className="flex justify-center items-center h-fixed w-full p-8 gap-4">
						<Image
							src="/assets/images/profile/inputImage.png"
							width={74}
							height={45}
							alt="input file"
							className="w-auto h-11"
						/>
						<div className="text-center text-brandPrimary text-sm">
							<p>Drag video here</p>
							<p>
								or &nbsp;
								<label className="text-link text-base font-normal hover:underline cursor-pointer">
									{/* ================================= IMAGE INPUT FIELD ============================= */}
									<input
										hidden
										accept="video/*"
										type="file"
										onChange={videoChange}
									/>
									Upload a file
								</label>
							</p>
						</div>
					</div>
				) : (
					<div className="flex justify-center items-center h-full w-full p-2 gap-6">
						{/* =============================== EDIT UPLOADED FILE EDIT ============================= */}
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<label htmlFor="editVideo" className="cursor-pointer">
										<MdEdit fontSize={24} />
									</label>
								</TooltipTrigger>
								<TooltipContent>
									<p>Change this image</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						{/* =================================== EDIT IMAGE INPUT FIELD ========================== */}
						<input
							id="editVideo"
							hidden
							accept="video/*"
							type="file"
							onChange={videoChange}
						/>

						{/* ============================ SELECTED IMAGE FILE SHOW ================================= */}
						<video
							src={URL.createObjectURL(selectedFile)}
							autoPlay
							className="h-24"
						></video>

						{/* ================================== DELETE UPLOADED FILE ================================ */}
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										onClick={removeSelectedFile}
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

export default VideoInput;
