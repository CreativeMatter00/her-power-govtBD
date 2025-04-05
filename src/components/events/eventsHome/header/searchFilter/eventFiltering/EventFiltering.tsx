"use client";
import React from "react";
import FilterOptionDropDownMenu from "./FilterOptionDropDownMenu";

// ================================= EVENT FILTERING OPTION TYPE DEFINITION =========================
interface EventFilteringType {
	eventName: string;
}

interface Props {
	events: EventFilteringType[];
}

const EventFiltering: React.FC<Props> = ({ events }) => {
	return (
		<div className="pl-6">
			{/* ============================= DROP DOWN MENU ========================== */}
			<FilterOptionDropDownMenu />

			{/* ==================================== FILTERING EVENTS ============================= */}
			<div className="my-4">
				<div className="flex flex-wrap gap-x-4 gap-y-6">
					{/* ======================= MAPPING EVENT ================== */}
					{events.map((event, index) => (
						<button
							key={index}
							className={`text-sm text-brandPrimary hover:text-bgPrimary bg-brandLsSecondary hover:bg-brandDs px-6 py-2 rounded-full`}
						>
							{/* ====================== EVENT NAME ======================== */}
							{event.eventName}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default EventFiltering;
