import React from "react";

interface HeadingType {
	heading: string;
}

const CreateEventHeading: React.FC<HeadingType> = ({ heading }) => {
	return (
		<div className="bg-brandDs p-2 rounded">
			<h1 className="text-base text-bgPrimary font-bold">{heading}</h1>
		</div>
	);
};

export default CreateEventHeading;
