import { MdOutlineStarPurple500 } from "react-icons/md";

const WorkHistory = () => {
	return (
		<div className="px-4 my-4">
			<h1 className="font-bold text-2xl my-4">Work History</h1>

			<div className="flex items-center gap-16 font-bold text-sm text-[#252525] opacity-75">
				<p className="underline underline-offset-4">Completed Jobs (11)</p>
				<p className="underline underline-offset-4">In Progress (2)</p>
			</div>

			<div className="my-8">
				<h3 className="text-brandDs text-xl font-bold my-2">
					Eleagueonline minor enhancements release 2.1b
				</h3>
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

				<div className="flex items-center gap-8 my-6 text-[#252525] opacity-60 divide-x divide-[#252525] divide-opacity-60">
					<div className="font-semibold">BDT 6225</div>
					<div className="pl-8">Fixed Price</div>
				</div>
			</div>
		</div>
	);
};

export default WorkHistory;
