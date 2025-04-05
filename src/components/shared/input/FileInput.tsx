"use client";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { ChangeEvent, useState, useRef } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import { GrDocumentPdf } from "react-icons/gr";

interface IFiles {
	selectedFiles: File[] | null;
	setSelectedFiles: (files: File[] | null) => void;
}

interface IFileInfo {
	fileName: string;
	fileSize: number;
}

const FileInput: React.FC<IFiles> = ({ selectedFiles, setSelectedFiles }) => {
	const [filesSrc, setFilesSrc] = useState<string[]>([]);
	const [filesInfo, setFilesInfo] = useState<IFileInfo[]>([]);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	// ===================== SELECT FILES FUNCTION ===================
	const selectFiles = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const files = Array.from(e.target.files);
			const selectedAllFiles = files.slice(0, 6);

			setSelectedFiles(files);

			const newFilesSrc: string[] = [];
			const filesNameSize: IFileInfo[] = [];

			for (const file of selectedAllFiles) {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					newFilesSrc.push(reader.result as string);
					setFilesSrc([...newFilesSrc]);
					const fileInfo: IFileInfo = {
						fileName: file.name,
						fileSize: file.size / 1024,
					};
					filesNameSize.push(fileInfo);
					setFilesInfo([...filesNameSize]);
				};
				reader.onerror = () => {
					console.log(reader.error);
				};
			}
		}
	};

	const removeSelectedFiles = () => {
		setSelectedFiles(null);
		setFilesSrc([]);
		setFilesInfo([]);
		if (fileInputRef.current) {
			fileInputRef.current.value = ""; // Reset input field value
		}
	};

	return (
		<div>
			<label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
				Attachments <span className="text-dangerPrimary">*</span>
			</label>
			<div
				className={`mt-1 block placeholder:text-[#cacaca] text-base border border-brandLsPrimary rounded w-full ${
					!selectedFiles ? "h-fit" : "h-72"
				}`}
			>
				{!selectedFiles || selectedFiles.length === 0 ? (
					<div className="flex justify-center items-center gap-3 h-full">
						<FaFilePdf className="w-10 h-12 text-dangerSecondary" />
						<div>
							<p>Drag attachment here</p>
							<div>
								or
								<label className="text-link text-base font-normal hover:underline cursor-pointer">
									<input
										hidden
										type="file"
										accept="file/*"
										multiple
										onChange={selectFiles}
										ref={fileInputRef} // Attach ref to the input
										className="outline-none"
									/>
									&nbsp;Upload a file
								</label>
							</div>
						</div>
					</div>
				) : (
					<div className="flex justify-evenly items-center h-full w-full p-2 gap-6">
						{/* ======================= SELECT FILE EDIT OPTOIN ========================= */}
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<label htmlFor="editFile" className="cursor-pointer">
										<MdEdit fontSize={24} />
									</label>
								</TooltipTrigger>
								<TooltipContent>
									<p>Change this file</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<input
							id="editFile"
							hidden
							accept="file/*"
							type="file"
							multiple
							onChange={selectFiles}
							ref={fileInputRef}
						/>

						{/* ======================= DISPLAY SELECT FILES ===================== */}

						<div className="w-full">
							{filesInfo.map((file, index) => (
								<div
									key={index}
									className="flex justify-center border-b border-dashed border-[#989898] my-2 py-2"
								>
									<div className="flex gap-3">
										<div>
											<GrDocumentPdf className="text-dangerPrimary h-10 w-8" />
										</div>
										<div className="font-normal text-[#1C1C1C] text-sm">
											<p className="font-medium">{file.fileName}</p>
											<p className="text-sm">
												<span className=" text-[#646464]">size:</span> &nbsp;
												<span className="font-medium">
													{file.fileSize.toFixed(1)} <span>Kb</span>
												</span>
											</p>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* ===================== DELETE SELECT FILES ======================= */}
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										onClick={removeSelectedFiles}
										className="cursor-pointer"
									>
										<MdDelete fontSize={24} />
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Delete this file</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				)}
			</div>
			{/* =========================== SELECT FILE CRITERIA ======================= */}
			<div className="flex items-center gap-3 mt-3">
				<h1 className="text-[#444444] text-sm">
					Max file size: <span className="font-bold text-[#1C1C1C]">2 MB</span>
				</h1>
				<h1 className="text-[#444444] text-sm">
					File format: <span className="font-bold text-[#1C1C1C]">pdf</span>
				</h1>
			</div>
		</div>
	);
};

export default FileInput;
