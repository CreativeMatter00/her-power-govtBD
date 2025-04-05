import { useTranslations } from "next-intl";
import Image from "next/image";

const PartnersPart = () => {
	const t = useTranslations("Footer");

	return (
		<div>
			<p className="text-sm font-bold mb-5 text-brandDs">{t("ourPartners")}</p>
			<div className="flex gap-2 max-lg:flex-col max-lg:gap-4">
				{/* <Image
					src={`/assets/images/footer/chaldal.png`}
					width={84}
					height={28}
					alt="chaldal"
					className="w-20 h-auto"
					priority
				/> */}
				<Image
					src={`/assets/images/footer/ict.png`}
					width={84}
					height={28}
					alt="ict"
					className="w-20 h-auto"
					priority
				/>
			</div>
		</div>
	);
};

export default PartnersPart;
