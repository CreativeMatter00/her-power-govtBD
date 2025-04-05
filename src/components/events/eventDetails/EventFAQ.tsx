// "use client";
import React from "react";
import TextCard from "./TextCard";

// ***************************** TEXT CARD TYPE DEFINITION ============================
interface EventFQAType {
	paraHeading: string;
	paragraph: string;
	textColor: string;
}

// ****************************** PROPS TYPE DEFINITION ==============================
interface Props {
	allFQA: EventFQAType[];
}

const EventFAQ: React.FC<Props> = ({ allFQA }) => {
	// console.log(allFQA);
	return (
		<>
			<section>
				{/* <div className="flex flex-col gap-8">
					
					{allFQA.map((fqa, index) => {
						return <TextCard key={index} info={fqa} />;
					})}
				</div> */}
				FAQ
			</section>
		</>
	);
};

export default EventFAQ;
