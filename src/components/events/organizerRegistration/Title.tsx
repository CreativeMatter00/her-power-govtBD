import React from "react";

interface IProps {
	title: string;
}
const Title: React.FC<IProps> = ({ title }) => {
	return (
		<div>
			<div className="border-b border-brandLsPrimary">
				<p className="text-base font-bold text-brandDs pb-2">{title}</p>
			</div>
		</div>
	);
};

export default Title;
