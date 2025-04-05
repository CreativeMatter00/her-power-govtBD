import Link from "next/link";
import CategoryEventCard from "../../eventComponents/eventCards/EventCategoryCard";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { IoMdArrowForward } from "react-icons/io";
import { useLocale, useTranslations } from "next-intl";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useQuery } from "@tanstack/react-query";
import { getAllEventCategories } from "@/api/api";

// *=========== EVENTS TYPE DEFINITION ============
interface IEventCategory {
	category_file_url: string;
	category_name: string;
	category_pid: string;
}

const EventCategories = () => {
	const locale = useLocale();
	const t = useTranslations("Events");
	const {
		isLoading: eventCategoriesLoading,
		error: eventCategoriesError,
		data: eventCategories,
	} = useQuery({
		queryKey: ["getEventCategories"],
		queryFn: () => getAllEventCategories(),
	});

	// console.log(eventCategories);

	if (eventCategoriesLoading)
		return (
			<div className="min-h-[600px]">
				<div className="flex items-center justify-center">
					<ScaleLoader color="#421957" height={70} radius={8} width={10} />
				</div>
			</div>
		);

	if (eventCategoriesError) {
		// console.log("data fetching past event error");
		console.log(eventCategoriesError);
	}

	return (
		<>
			<section className="my-16">
				<div className="flex justify-between items-center">
					<p className="font-bold text-xl text-brandDs">{t("EventCategories")}</p>
					<div className="text-brandPrimary">
						<Link href={`/${locale}/events/events-category/all`}>
							<div className="flex items-center gap-2 text-brandPrimary cursor-pointer group ">
								<p className="text-base hover:underline underline-offset-2">
									
									{t("SeeAll")}
								</p>
								<IoMdArrowForward className="w-5 h-5" />
							</div>
						</Link>
					</div>
				</div>

				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					className="w-full"
				>
					<CarouselContent className="pt-8">
						{eventCategories.map((event: IEventCategory, index: number) => (
							<CarouselItem key={index} className="basis-1/2 md:basis-1/6">
								<div>
									<CategoryEventCard event={event} />
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="left-0" />
					<CarouselNext className="right-0" />
				</Carousel>
			</section>
		</>
	);
};

export default EventCategories;
