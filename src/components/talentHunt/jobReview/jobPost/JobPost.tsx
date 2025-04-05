"use client";

import { FC } from "react";
import { FaCaretRight } from "react-icons/fa";

type IJobPost = {
	setActive: Function;
};

const JobPost: FC<IJobPost> = ({ setActive }) => {
	return (
		<>
			<section className="container p-4">
				<main>
					{/* ====================== FIRST TITLE ============================= */}
					<h1 className="font-bold text-2xl md:text-4xl text-black mb-6">
						Welcome, <span className="text-[#59187B]">&nbsp;Sarah!</span>
					</h1>

					{/* ========================= SECOND TITLE ============================ */}
					<div className=" mb-10">
						<h1 className="font-bold text-3xl md:text-5xl">
							Embark with an <br /> attention-grabbing title <br /> that sets
							the tone.
						</h1>
					</div>

					{/* ===================== INPUT FIELD FOR JOB POST TITLE ======================= */}
					<div>
						<label>Write a title for your job post</label>
						<input
							type="text"
							className="block outline-none border border-black rounded-lg w-2/3 px-2 py-1 mt-1.5"
						/>
					</div>

					{/* ======================== EXAMPLE TITLES ================================ */}
					<div className="text-base mt-4">
						<h1 className="font-bold mb-3">Example Titles</h1>
						<ul className="ml-8 flex flex-col gap-3">
							<li className="list-disc">
								Build responsive WordPress site with booking/payment
								functionality
							</li>
							<li className="list-disc">
								Graphic designer needed to design ad creative for multiple
								campaigns
							</li>
							<li className="list-disc">
								Facebook ad specialist needed for product launch
							</li>
						</ul>
					</div>

					{/* =============================== NEXT BUTTON ========================= */}
					<div className="flex items-center w-fit gap-3 mt-3">
						<button className="text-2xl" onClick={() => setActive(2)}>
							Next
						</button>
						<FaCaretRight className="w-3 h-6" />
					</div>
				</main>
			</section>
		</>
	);
};

export default JobPost;
