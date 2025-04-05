"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const DownloadPart = () => {
	const t = useTranslations("Footer");

	return (
		<div className="">
			<p className="text-sm font-bold mb-5 text-brandDs">{t("download")}</p>
			<div className="max-lg:flex max-lg:gap-4">
				<Image
					src={`/assets/images/footer/appStore.png`}
					width={140}
					height={42}
					alt="appStore"
					className="h-auto lg:mb-4 w-40"
					priority
				/>
				<Image
					src={`/assets/images/footer/googlePlay.png`}
					width={140}
					height={42}
					alt="google Play"
					className="h-auto w-40"
					priority
				/>
			</div>
		</div>
	);
};

export default DownloadPart;
