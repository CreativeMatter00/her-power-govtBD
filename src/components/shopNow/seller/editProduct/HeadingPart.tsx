interface HeadingInfo {
	heading: string;
	option: string;
}

const HeadingPart: React.FC<HeadingInfo> = ({ heading, option }) => {
	return (
		<div>
			<p className="text-brandDs font-bold">
				{heading} &nbsp;
				<span className="text-greyPrimary text-sm font-normal">{option}</span>
			</p>
			<div className="border border-brandLsPrimary mt-1"></div>
		</div>
	);
};

export default HeadingPart;
