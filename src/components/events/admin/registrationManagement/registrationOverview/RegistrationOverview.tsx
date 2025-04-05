"use client";
import React from "react";
import styles from "@/styles/Events.module.css";
import { PiCircleThin } from "react-icons/pi";

// ============================= OVERVIEW TYPE DEFINITION =========================
type TOverviewInfo = {
	title: string;
	total: number;
};

// ============================= PROPS TYPE DEFINITION =======================
type Props = {
	overviews: TOverviewInfo[];
};

const RegistrationOverview: React.FC<Props> = ({ overviews }) => {
	const [firstOverview, secondOverview, thirdOverview] = overviews;
	return (
		<>
			<section className="mt-12">
				{/* ===================================== TITLE ========================== */}
				<h1 className="text-base text-brandDs font-bold mb-3">
					Registration Overview
				</h1>

				{/* ===================================== CONTENT ========================= */}
				<main
					className={`${styles.registrationOverviewShadow} border border-brandLsPrimary rounded-lg p-4`}
				>
					{/* ===================================================================== */}
					<div className="border-b border-brandLsPrimary py-3">
						<div className="flex justify-between items-center px-3">
							<div className="flex items-center gap-3">
								<PiCircleThin className="w-5 h-5 bg-[#1EB0FF] rounded-full text-[#1EB0FF]" />
								<p className="text-base text-greyPrimary font-bold">
									{firstOverview.title}
								</p>
							</div>
							<p className="text-3xl text-brandPrimary">
								{firstOverview.total}
							</p>
						</div>
					</div>
					{/* ===================================================================== */}
					<div className="border-b border-brandLsPrimary py-3">
						<div className="flex justify-between items-center px-3">
							<div className="flex items-center gap-3">
								<PiCircleThin className="w-5 h-5 bg-[#FF6E1D] rounded-full text-[#FF6E1D]" />
								<p className="text-base text-greyPrimary font-bold">
									{secondOverview.title}
								</p>
							</div>
							<p className="text-3xl text-brandPrimary">
								{secondOverview.total}
							</p>
						</div>
					</div>
					{/* ===================================================================== */}
					<div className="py-3">
						<div className="flex justify-between items-center px-3">
							<div className="flex items-center gap-3">
								<PiCircleThin className="w-5 h-5 bg-brandDs rounded-full text-brandDs" />
								<p className="text-base text-greyPrimary font-bold">
									{thirdOverview.title}
								</p>
							</div>
							<p className="text-3xl text-brandPrimary">
								{thirdOverview.total}
							</p>
						</div>
					</div>
				</main>
			</section>
		</>
	);
};

export default RegistrationOverview;
