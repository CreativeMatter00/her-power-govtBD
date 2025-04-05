import { useTranslations } from "next-intl";
import Link from "next/link";

const HerPowerPart = () => {
	const t = useTranslations("Footer");
	return (
		<div>
			<p className="text-sm font-bold mb-5 text-brandDs">{t("herPower")}</p>
			<div className="flex flex-col gap-2 text-brandPrimary text-base font-normal">
				<Link
					href="/"
					className="hover:underline underline-offset-2 decoration-brandPrimary decoration-2"
				>
					{t("about")}
				</Link>
				<Link
					href="/"
					className=" hover:underline underline-offset-2 decoration-brandPrimary decoration-2"
				>
					{t("deals")}
				</Link>
				<Link
					href="/"
					className=" hover:underline underline-offset-2 decoration-brandPrimary decoration-2"
				>
					{t("assistance")}
				</Link>
				<Link
					href="/"
					className="hover:underline underline-offset-2 decoration-brandPrimary decoration-2"
				>
					{t("qna")}
				</Link>
			</div>
		</div>
	);
};

export default HerPowerPart;
