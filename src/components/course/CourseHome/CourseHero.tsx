import { useTranslations } from "next-intl";
import Image from "next/image";

const CourseHero = () => {
	const t = useTranslations("courses");
	return (
		<div className="border-t-2 border-[#f6eefb]">
			<div className="relative mx-auto w-full overflow-hidden">
				<div className="banner-image-wrapper w-full h-[200px] md:h-[300px] lg:w-auto ">
					<Image
						src={"/assets/images/course/Course Home BG.png"}
						width={1920}
						height={300}
						alt="hero"
						className="object-fill w-full max-w-none h-[200px] md:h-[300px]"
					/>
					<div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10"></div>
					<div className="absolute inset-0 flex flex-col gap-4 items-center justify-center z-20 text-white text-3xl lg:text-6xl font-bold text-center">
						{t("courseHero")} <br /> {t("courseHero2")}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseHero;
