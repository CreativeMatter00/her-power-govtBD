import { MdOutlineStarPurple500 } from "react-icons/md";

const Instructions = () => {
	return (
		<>
			<div className="px-4 my-4">
				<h1 className="font-bold text-2xl text-brandDs mt-4 mb-1">
					Java Instructions
				</h1>
				<div className="flex max-md:flex-col max-md:items-start items-center gap-2">
					<div className="flex items-center gap-2">
						<MdOutlineStarPurple500 className="w-4 h-4 text-[#FFA600]" />
						<MdOutlineStarPurple500 className="w-4 h-4 text-[#FFA600]" />
						<MdOutlineStarPurple500 className="w-4 h-4 text-[#FFA600]" />
						<MdOutlineStarPurple500 className="w-4 h-4 text-[#FFA600]" />
						<MdOutlineStarPurple500 className="w-4 h-4 text-[#FFA600]" />
					</div>
					<div className="divide-x divide-[#252525] flex gap-2 text-sm">
						<p>5.00</p>
						<p className="opacity-50 pl-2">Apr 18, 2024 - Apr 26, 2024</p>
					</div>
				</div>

				<p className="text-sm my-3">
					&ldquo;It was greate working with Ripa. She has been very responsive
					and available when needed for discussions. Delivered quality work.
					Thank you Ripa.&ldquo;
				</p>

				<div className="flex items-center max-md:gap-3 gap-8 my-6 text-[#252525] opacity-60 divide-x divide-[#252525] divide-opacity-60">
					<div className="font-semibold">BDT 6225</div>
					<div className="max-md:pl-3 pl-8">BDT 75/hr</div>
					<div className="max-md:pl-3 pl-8">83 hours</div>
				</div>
			</div>
		</>
	);
};

export default Instructions;
