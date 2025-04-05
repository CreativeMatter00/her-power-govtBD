import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
	id: string;
	title: string;
	image: string;
	providerName: string;
	providerId: string;
}

const CourseCard: React.FC<CardProps> = ({
	id,
	title,
	image,
	providerName,
	providerId,
}) => {
	const locale = useLocale();
	
	const t = useTranslations("career");
	return (
		// <Link href={`/${locale}/course/courses/${id}`}>
		<div className="bg-[#F9FFFD] h-72 rounded-lg overflow-hidden border group">
			<div className="flex justify-center items-center h-1/2 overflow-hidden">
				<Image
					height={106}
					width={196}
					className="object-cover w-full h-fit"
					src={image}
					alt={title}
				/>
			</div>
			<div className="p-4 bg-[#006A4D] h-1/2 text-white flex flex-col justify-between">
				<div className="">
					<p className="text-xl font-bold line-clamp-1">{title}</p>
				</div>
				<div className="flex text-sm font-medium justify-between mt-4">
					<Link
						href={`/${locale}/course/organization/${providerId}`}
						className="underline"
					>
						<p className="truncate">{providerName}</p>
					</Link>
					<Link href={`/${locale}/course/courses/${id}`} className="">
						{" "}
						<p className="hover:underline">{t("See Details")}</p>{" "}
					</Link>
				</div>
			</div>
		</div>
		// </Link>
	);
};

export default CourseCard;
