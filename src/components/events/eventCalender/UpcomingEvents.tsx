import EventCard from "@/components/events/eventComponents/eventCards/EventCard";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

// ********************************* FEATURED EVENTS TYPE DEFINITION ================================
interface UpcomingEvents {
	eventImage: string;
	eventTitle: string;
	eventDate: string;
	eventTime: string;
	eventPlace: string;
	eventPrice: string;
}

const events: UpcomingEvents[] = [
	{
		eventImage:
			"/assets/images/events/Images/beth-jnr-0h-FN7oByyw-unsplash.png",
		eventTitle: "Future of Technology Conference",
		eventDate: "27 Jan, 2024",
		eventTime: "1:00 PM",
		eventPlace: "Dhaka, Bangladesh",
		eventPrice: "Free",
	},
	{
		eventImage:
			"/assets/images/events/Images/jaime-lopes-0RDBOAdnbWM-unsplash.png",
		eventTitle: "Sustainable Innovation Forum",
		eventDate: "28 Jan, 2024",
		eventTime: "2:00 PM",
		eventPlace: "Dhaka, Bangladesh",
		eventPrice: "From ৳ 1200",
	},
	{
		eventImage:
			"/assets/images/events/Images/britt-gaiser-hSAlu33padA-unsplash.png",
		eventTitle: "Women in Leadership Conference",
		eventDate: "17 Mar, 2024",
		eventTime: "1:00 PM",
		eventPlace: "Khulna, Bangladesh",
		eventPrice: "From ৳ 1500",
	},
	{
		eventImage:
			"/assets/images/events/Images/hivan-arvizu-soyhivan-MAnhvw0nDDY-unsplash.png",
		eventTitle: "Social Media Strategies Workshop",
		eventDate: "27 Feb, 2024",
		eventTime: "4:00 PM",
		eventPlace: "Khulna, Bangladesh",
		eventPrice: "Free",
	},
	{
		eventImage: "/assets/images/events/Images/antenna-ohNCIiKVT1g-unsplash.png",
		eventTitle: "Creative Entrepreneurs Summit",
		eventDate: "13 Feb, 2024",
		eventTime: "11:00 AM",
		eventPlace: "Chottogram, Bangladesh",
		eventPrice: "Free",
	},
	{
		eventImage:
			"/assets/images/events/Images/beth-jnr-0h-FN7oByyw-unsplash.png",
		eventTitle: "Future of Technology Conference",
		eventDate: "27 Jan, 2024",
		eventTime: "1:00 PM",
		eventPlace: "Dhaka, Bangladesh",
		eventPrice: "Free",
	},
];

const UpcomingEvents = () => {
	return (
		<div className="py-6 border-t border-brandLsPrimary">
			<div className="container mx-auto">
				<Carousel className="w-full">
					<CarouselContent className="">
						{events.map((event, index) => (
							<CarouselItem
								key={index}
								className="basis-1/2 md:basis-1/3 lg:basis-1/4"
							>
								<EventCard key={index} event={event} />;
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</div>
	);
};

export default UpcomingEvents;
