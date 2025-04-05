import { useTranslations } from "next-intl";
import Link from "next/link";

const EarnPawerPart = () => {
	const t = useTranslations("Footer");

	return (
		<div>
			<p className="text-sm font-bold mb-5 text-brandDs">{t("earnWith")}</p>
			<div className="flex flex-col gap-2 text-brandPrimary text-base font-normal">
				<Link
					href="/"
					className="hover:underline underline-offset-2 decoration-brandPrimary decoration-2 "
				>
					{t("sell")}
				</Link>
				<Link
					href="/"
					className=" hover:underline underline-offset-2 decoration-brandPrimary decoration-2"
				>
					{t("codeOfConduct")}
				</Link>
			</div>
		</div>
	);
};

export default EarnPawerPart;
