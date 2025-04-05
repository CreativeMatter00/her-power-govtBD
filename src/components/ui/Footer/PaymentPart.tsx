import { useTranslations } from "next-intl";
import Image from "next/image";

const PaymentPart = () => {
	const t = useTranslations("Footer");

	return (
		<div>
			<p className="text-sm font-bold mb-5 text-brandDs">{t("payment")}</p>
			<div className="flex gap-4 ">
				<div className="lg:flex lg:gap-4 ">
					<Image
						src={`/assets/images/footer/upay.png`}
						width={32}
						height={32}
						alt="facebook Logo"
						className="h-8 w-8 max-lg:mb-4"
						priority
					/>
					<Image
						src={`/assets/images/footer/nagad.png`}
						width={32}
						height={32}
						alt="facebook Logo"
						className="h-8 w-8"
						priority
					/>
				</div>
				<div className="lg:flex lg:gap-4">
					<Image
						src={`/assets/images/footer/roket.png`}
						width={32}
						height={32}
						alt="facebook Logo"
						className="h-8 w-8 max-lg:mb-4"
						priority
					/>
					<Image
						src={`/assets/images/footer/bkash.png`}
						width={32}
						height={32}
						alt="facebook Logo"
						className="h-auto"
						priority
					/>
				</div>
			</div>
		</div>
	);
};

export default PaymentPart;
