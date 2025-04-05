import EventCard from "@/components/events/eventComponents/eventCards/EventCard";
import Pagination from "@/components/events/eventComponents/pagination/Pagination";
import BreadCrumbEvents from "../BreadCrumbEvents/BreadCrumbEvents";

// ********************************* PAST EVENTS TYPE DEFINITION ================================
interface LikedEventsInfo {
	eventImage: string;
	eventTitle: string;
	eventDate: string;
	eventTime: string;
	eventPlace: string;
	eventPrice: string;
}

// *********************************** STATIC DATA ***************************
// *********************************** LIKED EVENTS ================================
const likedEventsEvents: LikedEventsInfo[] = [
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
];

// ********************************* OTHER EVENTS STATIC DATA ===============================
const otherEvents: LikedEventsInfo[] = [
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
];

const LikedEvents = () => {
	return (
		<>
			<BreadCrumbEvents title1="Events" link1="events" title2="Liked Events" />
			<section className="border-y border-brandLsPrimary mb-4">
				<main className="container p-4">
					{/* ============================ TITLE =========================== */}
					<h1 className="text-3xl text-brandPrimary font-normal">
						Liked Events
					</h1>

					<div className="my-4">
						<div className="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-x-8 gap-y-8">
							{/* ====================== ALL CARDS ========================= */}
							{likedEventsEvents.map((featuredEvent, index) => (
								<EventCard key={index} event={featuredEvent} />
							))}
						</div>

						{/* ===================== PAGINATION ============================ */}
						<div className="flex justify-end my-2">
							<Pagination />
						</div>
					</div>
				</main>
			</section>

			{/* ================================= WILL BE SLIDER ========================== */}
			<section className="container p-4">
				<h1 className="text-xl text-brandPrimary">Other Events You May Like</h1>

				<main className="my-4">
					{/* ============================== OTHER EVENTS ========================== */}
					<div className="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-x-8 gap-y-8">
						{/* =============================== EVENT CARD ====================== */}
						{otherEvents.map((event, index) => (
							<EventCard key={index} event={event} />
						))}
					</div>
				</main>
			</section>
		</>
	);
};

export default LikedEvents;
