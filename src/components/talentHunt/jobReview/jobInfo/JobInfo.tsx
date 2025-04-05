import { FaCaretRight } from "react-icons/fa";
import JobInfoForm from "./JobInfoForm";
import { FC } from "react";

type IJobInfo = {
	setActive: Function;
};

const JobInfo: FC<IJobInfo> = ({ setActive }) => {
	return (
		<>
			<section className="">
				<main className="container p-4">
					<h1 className="font-bold text-5xl my-6">
						Quantify the breadth of your role
					</h1>
					{/* ================ Job Information Form & Next Button =============== */}
					<div className="flex gap-16">
						<div className="basis-1/2">
							{/* ======================= FORM ======================== */}
							<JobInfoForm />
						</div>

						{/* ========================= BUTTON ======================== */}
						<div className="basis-1/2 flex items-end">
							<div className="flex items-center w-fit gap-3 mt-3">
								<button className="text-2xl" onClick={() => setActive(4)}>
									Next
								</button>
								<FaCaretRight className="w-3 h-6" />
							</div>
						</div>
					</div>
				</main>
			</section>
		</>
	);
};

export default JobInfo;
