"use client";

import React, { FC } from "react";

interface IViewSpeakersProps {
	viewData: any;
	setViewModalOpen: Function;
	refetch: any;
}

const SpeakersEdit: FC<IViewSpeakersProps> = ({
	viewData,
	setViewModalOpen,
	refetch,
}) => {
	return (
		<>
			<section className="w-full">
				<main className={`rounded-2xl`}>
					<div className={`p-2`}>
						{/* ========================== HEADING PART ======================= */}
						<div className="border-b border-[#989898]">
							<div className="mx-12 my-4 flex justify-between items-center">
								<h1 className="text-xl text-[#1C1C1C] font-bold">
									Edit Speakers
								</h1>
								{/* <RxCross2 className="h-8 w-8 cursor-pointer" /> */}
							</div>
						</div>
						{/* ===================== FORM PART ========================= */}
						<div>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
								<div>
									<h1 className="text-greyPrimary ml-6">Speaker Name</h1>
									<p className="px-6  py-1 mt-1">{viewData.speaker_name}</p>
								</div>

								<div>
									<h1 className="text-greyPrimary ml-6">Designation</h1>
									<p className="px-6  py-1 mt-1">{viewData.designation}</p>
								</div>
								<div>
									<h1 className="text-greyPrimary ml-6">Phone Number</h1>
									<p className="px-6  py-1 mt-1">{viewData.phone_no}</p>
								</div>
								<div>
									<h1 className="text-greyPrimary ml-6">Email</h1>
									<p className="px-6  py-1 mt-1">{viewData.speaker_email}</p>
								</div>

								<div>
									<h1 className="text-greyPrimary ml-6">Description</h1>
									<p className="px-6  py-1 mt-1">{viewData.description}</p>
								</div>
								<div>
									<h1 className="text-greyPrimary ml-6">Speaker Bio</h1>
									<p className="px-6  py-1 mt-1">{viewData.speaker_bio}</p>
								</div>
								<div>
									<h1 className="text-greyPrimary ml-6">Address</h1>
									<p className="px-6  py-1 mt-1">{viewData.org_address}</p>
								</div>
								<div>
									<h1 className="text-greyPrimary ml-6">
										Speaker&apos;s Profile Link
									</h1>
									<div className="pl-6">
										<p className="mt-1">
											<a
												href={viewData.speaker_profile_link}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 underline"
											>
												{viewData.speaker_profile_link}
											</a>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</section>
		</>
	);
};

export default SpeakersEdit;
