
import SearchBar from "./searchBar/SearchBar";
import BrowseTopic from "./browseTopic/BrowseTopic";
import MoreQuestion from "./moreQuestion/MoreQuestion";

// ******************************** BROWSE TOPICS TYPE *********************************
interface BrowseTopicType {
	topic: string;
}

// ****************************** BROWSE TOPIC STATIC TYPE **************************
const allTopics: BrowseTopicType[] = [
	{ topic: "Event Registration" },
	{ topic: "Ticket Information" },
	{ topic: "Event Categories" },
	{ topic: "Event Updates & News" },
	{ topic: "Technical Support" },
	{ topic: "FAQs" },
];

const HelpCenter = () => {
	return (
		<>
			{/* =============================== MAIN CONTENT =========================== */}
			<section>
				{/* ============================ BREAD CRUMBS =========================== */}
				<div className="border-b-2 border-brandLsPrimary h-16"></div>
				{/* ============================ HELP CENTER ============================= */}
				<main className="container p-4">
					{/* ============================ TITLE ============================= */}
					<h1 className="text-brandPrimary font-normal text-3xl">
						Help Center
					</h1>
					{/* ============================ SEARCH SECTION =========================== */}
					<SearchBar />
					{/* ============================ BROWSE TOPIC ========================= */}
					<BrowseTopic browseTopics={allTopics} />
					{/* ============================= MORE QUESTION ============================ */}
					<MoreQuestion />
				</main>
			</section>
		</>
	);
};

export default HelpCenter;
