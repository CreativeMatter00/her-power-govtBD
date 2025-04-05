import React from "react";

interface IProps {
	infoTitle: string;
}
const Title: React.FC<IProps> = ({ infoTitle }) => {
	return (
		<div>
			<div className="border-b border-brandLsPrimary">
				<p className="text-base font-bold text-brandDs pb-2">{infoTitle}</p>
			</div>
		</div>
	);
};

export default Title;
