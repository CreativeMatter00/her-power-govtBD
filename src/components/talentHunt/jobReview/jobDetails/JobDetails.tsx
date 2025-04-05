import { FiEdit3 } from "react-icons/fi";

const JobDetails = () => {
	return (
		<>
			<section>
				<main className="container p-4">
					<div className="flex justify-between items-center my-6">
						<h1 className="text-black text-xl font-bold">Job Details</h1>
						<button className="bg-brandPrimary font-medium text-base text-[#FEFCFF] rounded-full px-6 py-2">
							Post the Job{" "}
						</button>
					</div>

					{/* ======================== DETAILS ===================== */}
					<div className="border border-lg divide-y rounded-lg ">
						{/* ================================== LOGO ====================== */}
						<div>
							<div className="flex justify-end items-start">
								<FiEdit3 className="w-6 h-6" />
							</div>
							<p className="px-12 py-6 font-bold text-lg">
								Need a Logo Designer for my business
							</p>
						</div>

						{/* ============================== DESCRIPTION ====================== */}
						<div>
							<div className="flex justify-end items-start">
								<FiEdit3 className="w-6 h-6" />
							</div>
							<p className="px-12 py-6 text-base">
								We are seeking a talented and creative freelance graphic
								designer to join our team on a project basis. The ideal
								candidate will have a strong passion for design and a keen eye
								for detail. As a graphic designer, you will be responsible for
								creating visually appealing graphics and illustrations for
								various projects, including but not limited to branding,
								marketing materials, social media content, and website design.
							</p>
						</div>

						<div>
							<div className="flex justify-end items-start">
								<FiEdit3 className="w-6 h-6" />
							</div>
							<div className="flex flex-col gap-6 px-12 py-6 text-base">
								<div>
									<h6 className="font-bold">Category</h6>
									<p>Graphics Design</p>
								</div>
								<div>
									<h6 className="font-bold">Skills</h6>
									<div className="flex items-center gap-3">
										<p>Logo Design,</p>
										<p>Banner</p>
										<p>Facebook Cover</p>
									</div>
								</div>
								<div>
									<h6 className="font-bold">Scale</h6>
									<p>
										Small, 3 to 6 months, Entry level, Contract-to-hire
										opportunity
									</p>
								</div>
								<div>
									<h6 className="font-bold">Resource allocation</h6>
									<p>25Tk-80Tk/hr</p>
								</div>
							</div>
						</div>

						{/* =============================== BUTTONS =============================== */}
						<div className="flex flex-col md:flex-row justify-start md:justify-between gap-4 items-start md:items-center pl-12 pr-6 py-4">
							<div>
								<button className="font-medium text-brandDs text-[18px]">
									Back
								</button>
							</div>
							<div className="flex flex-col md:flex-row items-center gap-4">
								<div>
									<button className="font-medium text-brandDs text-[18px]">
										Save as a Draft
									</button>
								</div>
								<div>
									<button className="bg-brandPrimary rounded-full px-6 py-2 text-bgPrimary">
										Post the Job
									</button>
								</div>
							</div>
						</div>
					</div>
				</main>
			</section>
		</>
	);
};

export default JobDetails;
