import { FC } from "react";
import { RiAttachment2 } from "react-icons/ri";

type IJobDescription = {
	setActive: Function;
};

const JobDescription: FC<IJobDescription> = ({ setActive }) => {
	return (
		<>
			<section>
				<main className="container p-4">
					<h1 className="font-bold text-5xl">
						Let&apos;s open the floor for <br />
						discussion.
					</h1>

					{/* ================= TALENT CRITERIA ================= */}
					<div className="mt-8 text-lg text-[#252525] opacity-80">
						<h1>Talent are looking for:</h1>
						<ul className="mt-3 ml-8">
							<li className="list-disc">
								Clear expectations about your task or deliverables
							</li>
							<li className="list-disc">The skills required for your work</li>
							<li className="list-disc">Good communication</li>
							<li className="list-disc">
								Details about how you or your team like to work
							</li>
						</ul>
					</div>

					{/* ========================== JOB DESCRIPTION TEXT ARIA ======================== */}
					<div className="mt-8 w-full">
						<h1 className="font-bold text-black text-lg my-1">
							Describe your job
						</h1>
						<textarea
							rows={6}
							className="outline-none border border-[#252525] border-opacity-80 p-2 w-full rounded-lg resize-none"
							placeholder="Type here the descriptions or paste here if you already have description"
						></textarea>
						<div className="flex justify-end">
							<p className="text-sm font-normal text-[#252525] text-opacity-80">
								5,000 characters left
							</p>
						</div>
					</div>

					{/* ============================ BUTTONS ============================ */}
					<div className="flex justify-between items-center mt-8">
						{/* ====================== ATTACHED FILE ===================== */}
						<div>
							<button className="flex items-center gap-2 bg-brandDs text-white rounded-full px-4 py-2 font-bold">
								<RiAttachment2 className="h-6 w-6" />
								Attach file
							</button>
						</div>
						{/* ========================== REVIEW JOB POST ==================== */}
						<div>
							<button
								className=" bg-brandPrimary text-white rounded-full px-4 py-2 font-bold"
								onClick={() => setActive(6)}
							>
								Review Job Post
							</button>
						</div>
					</div>
				</main>
			</section>
		</>
	);
};

export default JobDescription;
