import React from "react";
import styles from "@/styles/Events.module.css";

interface BrowseTopicType {
	topic: string;
}

interface Props {
	browseTopics: BrowseTopicType[];
}
const BrowseTopic: React.FC<Props> = ({ browseTopics }) => {
	return (
		<div className="my-8">
			{/* ================================ TITLE =============================== */}
			<h1 className="text-xl text-brandDs">Browse by topic</h1>
			{/* ================================ TOPICS =============================== */}
			<div className="mt-4 flex flex-wrap items-start gap-6">
				{/* ============================= MAPPING ================================= */}
				{browseTopics.map((browseTopic, index) => (
					<div
						key={index}
						className={`bg-bgPrimary border-brandLsPrimary p-3 rounded ${styles.helpCenterBrowseTopicShadow} group hover:bg-brandLsPrimary`}
					>
						{/* ============================== TOPIC NUMBER ========================== */}
						<p className="text-base text-brandPrimary group-hover:text-brandDs font-normal">
							{browseTopic.topic}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default BrowseTopic;
