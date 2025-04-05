// "use client";
import React from "react";

// ***************************** TEXT CARD TYPE DEFINITION ============================
interface IDescription {
	event_desc: string;
}

// ****************************** PROPS TYPE DEFINiTION ==============================
interface IProps {
	description: IDescription;
}

// const TextCard = ({ eventDesc: string }) => {
const TextCard: React.FC<IProps> = ({ description }) => {
	// console.log(description);
	return (
		<>
			<div className="flex flex-col gap-4">
				{/* <h1 className="text-xl text-brandDs">{eventDesc}</h1> */}
				{/* <p className={`text-base text-brandPrimary`}>{description}</p> */}
				{/* <p className={`text-base text-${textColor}`}>{paragraph}</p> */}
			</div>
		</>
	);
};

export default TextCard;
