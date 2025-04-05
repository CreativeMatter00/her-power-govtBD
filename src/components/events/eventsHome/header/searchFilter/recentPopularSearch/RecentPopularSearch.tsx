import React from "react";
import { RiExternalLinkLine } from "react-icons/ri";

// *********************************** SEARCH TOPIC TYPE *******************************
interface SearchesType {
	searchTopic: string;
}
// *********************************** PROPS TYPE *******************************
interface Props {
	searches: SearchesType[];
}
const RecentPopularSearch: React.FC<Props> = ({ searches }) => {
	return (
		<div className="pt-8">
			{/* ================================== TITLE ======================== */}
			<h1 className="text-xl text-brandPrimary font-bold">
				Recent and popular searches
			</h1>

			{/* ========================================== TOPICS =============================== */}
			<div className="ml-6 mt-4">
				<div className="flex flex-col gap-4 ">
					{/* ============================= MAPPING TOPICS ======================== */}
					{searches.map((search, index) => (
						<div
							key={index}
							className="text-brandPrimary hover:text-brandDs w-fit"
						>
							<div className="flex items-center gap-2">
								{/* ======================== LINK ICON ========================= */}
								<RiExternalLinkLine className="text-greyPrimary w-5 h-5" />
								{/* ================================== TOPIC ============================= */}
								<p className="text-sm ">{search.searchTopic}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default RecentPopularSearch;
