import { FaGithub } from "react-icons/fa6";
import { LuUser2 } from "react-icons/lu";

const Summary = () => {
	return (
		<>
			<aside className="border-4 border-brandDs py-3 rounded-lg text-[#252525] h-full ">
				<div className="border-b border-brandDs pb-2">
					<div className="flex justify-evenly items-center gap-3">
						<div>
							<div className="flex items-start font-bold">
								<h1 className="text-sm">Tk</h1>
								<p className="mt-1 text-xl">57K+</p>
							</div>
							<p className="text-sm opacity-50">Total earnings</p>
						</div>
						<div>
							<h1 className="font-bold text-xl">13</h1>
							<p className="text-sm opacity-50">Total jobs</p>
						</div>
						<div>
							<h1 className="font-bold text-xl">225</h1>
							<p className="text-sm opacity-50">Total hours</p>
						</div>
					</div>
				</div>

				<div className="p-5 flex flex-col gap-12">
					<div>
						<h1 className="font-bold text-xl">Hours per week</h1>
						<p className="text-sm">More than 30 hrs/week</p>
						<p className="text-sm">24 hrs response time</p>
					</div>
					<div>
						<h1 className="font-bold text-xl">Verifications</h1>
						<p className="text-sm">More than 30 hrs/week</p>
						<p className="text-sm">24 hrs response time</p>
					</div>
					<div>
						<h1 className="font-bold text-xl">Linked Accounts</h1>
						<div className="flex items-center gap-3 my-2">
							<div>
								<FaGithub className="text-[#5c6bc0] w-6 h-6" />
							</div>
							<div className="text-xl">Github</div>
							<div className="text-sm">Ripa Sultana</div>
						</div>
						<p className="text-sm font-bold mb-2">View Profile</p>
						<div className="text-sm flex items-center gap-2">
							<LuUser2 /> 12 Followers
						</div>
					</div>
				</div>
			</aside>
		</>
	);
};

export default Summary;
