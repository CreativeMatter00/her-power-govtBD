import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface ICourseCard {
	img: string;
	courseName: string;
	category: string;
}

const CourseCatCard: React.FC<ICourseCard> = ({
	img,
	courseName,
	category,
}) => {
	const locale = useLocale();
	return (
		<Link href={`/${locale}/course/${category}`}>
			<div className="border border-[#D9D9D9] px-8 py-16 flex flex-col gap-4 items-center justify-center rounded-md group hover:bg-[#d9d9d9] cursor-pointer min-w-64 overflow-hidden">
				<Image
					src={img}
					width={80}
					height={80}
					alt="govt course Logo"
					className="h-20 w-20"
					priority
				/>
				<p className="text-[#252525] text-xl font-bold">{courseName}</p>
			</div>
		</Link>
	);
};

export default CourseCatCard;
