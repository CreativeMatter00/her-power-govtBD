"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

// ****************************** IMAGE TYPE DEFINITION ==========================
interface IImageInfo {
	selectedFile: string ;
	labelName: string;
}

const ShowImage: React.FC<IImageInfo> = ({
	selectedFile,
	labelName,
}) => {
	const t = useTranslations("talentHunt");
	return (
		<div className="h-36 flex flex-col gap-2">
			{/* ======================================== labelName ================================== */}
			<label className="text-brandPrimary text-sm pl-6"> {labelName} </label>
			<div className="h-full border border-[#EEDDF5] rounded-lg bg-white flex justify-center items-center">
				{/* ============================ SELECTED IMAGE FILE SHOW ================================= */}
				<Image
					src={selectedFile}
					width={300}
					height={300}
					alt={t("Selected file")}
					className="w-auto h-24 max-w-56"
				/>
			</div>
		</div>
	);
};

export default ShowImage;
