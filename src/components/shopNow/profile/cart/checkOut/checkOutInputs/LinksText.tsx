import React from "react";

interface LinksInfo {
	linksText: string;
}
const LinksText: React.FC<LinksInfo> = ({ linksText }) => {
	return (
		<>
			<p className="text-base font-normal text-link hover:underline underline-offset-4">
				{linksText}
			</p>
		</>
	);
};

export default LinksText;
