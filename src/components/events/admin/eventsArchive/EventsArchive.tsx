import { DownloadArrowIcon } from "@/components/ui/icon/EventsIcon";
import ArchiveTable from "./ArchiveTable";

// *********************************** TABLE DATA TYPE DEFINITION ===========================
interface EventInfoType {
	eventTitle: string;
	eventStatus: string;
	eventDate: string;
	eventPlace: string;
}

// ********************************** DASHBOARD TABLE STATIC DATA =========================
const allEvents: EventInfoType[] = [
	{
		eventTitle: "Future of Technology Conference",
		eventStatus: "Upcoming",
		eventDate: "28 Apr, 2024",
		eventPlace: "Dhaka, Bangladesh",
	},
	{
		eventTitle: "Sustainable Innovation Forum",
		eventStatus: "Upcoming",
		eventDate: "26 Apr, 2024",
		eventPlace: "Dhaka, Bangladesh",
	},
	{
		eventTitle: "E-Commerce Expo",
		eventStatus: "Upcoming",
		eventDate: "19 Feb, 2024",
		eventPlace: "Khulna, Bangladesh",
	},
	{
		eventTitle: "Creative Entrepreneurs Summit",
		eventStatus: "Upcoming",
		eventDate: "10 Jan, 2024",
		eventPlace: "Rangpur, Bangladesh",
	},
	{
		eventTitle: "Social Media Strategies Workshop",
		eventStatus: "Upcoming",
		eventDate: "22 Dec, 2023",
		eventPlace: "Rangpur, Bangladesh",
	},
	{
		eventTitle: "Women in Leadership Conference",
		eventStatus: "Past",
		eventDate: "10 Jan, 2024",
		eventPlace: "Khulna, Bangladesh",
	},
	{
		eventTitle: "Global Business Networking Event",
		eventStatus: "Past",
		eventDate: "16 Dec, 2023",
		eventPlace: "Khulna, Bangladesh",
	},
	{
		eventTitle: "Startup Pitch Day",
		eventStatus: "Past",
		eventDate: "8 Nov, 2023",
		eventPlace: "Sylhet, Bangladesh",
	},
	{
		eventTitle: "Tech for Good Hackathon 2024 Fest",
		eventStatus: "Past",
		eventDate: "27 Nov, 2023",
		eventPlace: "Rangpur, Bangladesh",
	},
	{
		eventTitle: "AI and Machine Learning Symposium",
		eventStatus: "Past",
		eventDate: "8 Nov, 2023",
		eventPlace: "Dhaka, Bangladesh",
	},
];

const EventsArchive = () => {
	return (
		<>
			<aside className="basis-full">
				{/* ========================== TITLE ============================= */}
				<h1 className="text-3xl text-brandPrimary font-normal">
					Events Archive
				</h1>
				<div className="border-t border-brandLsPrimary mt-4">
					<div className="flex justify-between items-center pt-6">
						{/* =========================== EVENT LIST ============================ */}
						<p className="text-base text-brandPrimary font-bold">Event List</p>

						{/* ========================== DOWNLOAD OPTION =================== */}
						<button className="flex items-center gap-2 px-8 py-3 rounded-full bg-success hover:bg-successHover">
							{/* ====================== DOWNLOAD ICON ============================== */}
							<DownloadArrowIcon />
							<span className="text-sm text-bgSecondary font-medium">
								Download list
							</span>
						</button>
					</div>
				</div>

				{/* ========================== TABLE =================================== */}
				{/* <Archive allEvents={allEvents} /> */}
				<ArchiveTable allEvents={allEvents} />
			</aside>
		</>
	);
};

export default EventsArchive;
