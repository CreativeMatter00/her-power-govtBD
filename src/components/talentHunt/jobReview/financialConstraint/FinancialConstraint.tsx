"use client";
import { MdAccessTime } from "react-icons/md";
import { LuTag } from "react-icons/lu";
import { FC, useState } from "react";
import HourlyRate from "./HourlyRate";
import FixedRate from "./FixedRate";
import { FaCaretRight } from "react-icons/fa";

type IFinancialConstraint = {
	setActive: Function;
};

const FinancialConstraint: FC<IFinancialConstraint> = ({ setActive }) => {
	const [hourlyRate, setHourlyRate] = useState(true);
	const [fixedRate, setFixedRate] = useState(false);

	const handleHourlyRateClick = () => {
		setHourlyRate(true);
		setFixedRate(false); // Ensure only hourlyRate is true
	};

	const handleFixedRateClick = () => {
		setHourlyRate(false); // Ensure only fixedRate is true
		setFixedRate(true);
	};
	return (
		<>
			<section>
				<main className="container p-4">
					{/* ====================== TITLE ========================= */}
					<h1 className="font-bold text-5xl mb-16">
						Lets discuss your <br /> financial constraints and <br />
						allocations.
					</h1>

					<div>
						<p className="text-lg font-normal my-4">
							By providing this information, we can ensure that we match you
							<br />
							with talent that fits your requirements.
						</p>

						{/* ===================== BUTTONS FOR RATE ====================== */}

						<div className="flex items-center gap-4">
							<div>
								<button
									type="button"
									onClick={handleHourlyRateClick}
									className={`${
										hourlyRate
											? "border border-brandDs text-brandDs"
											: "border border-[#252525] text-[#252525]"
									} flex justify-center items-center gap-2 w-44 py-1 rounded-md`}
								>
									<MdAccessTime className="w-8 h-8" />
									<span className="font-bold text-lg">Hourly Rate</span>
								</button>
							</div>
							<div>
								<button
									className={`${
										fixedRate
											? "border border-brandDs text-brandDs"
											: "border border-[#252525] text-[#252525]"
									} flex justify-center items-center gap-2 w-44 py-1 rounded-md`}
									type="button"
									onClick={handleFixedRateClick}
								>
									<LuTag className="w-8 h-8" />
									<span className="font-bold text-lg"> Fixed Rate</span>
								</button>
							</div>
						</div>
					</div>

					<div>
						{hourlyRate === true && fixedRate === false ? (
							// ===================== HOURLY RATE COMPONENT ======================
							<HourlyRate />
						) : (
							// ===================== FIXED RATE COMPONENT ======================
							<FixedRate />
						)}
					</div>

					{/* =============================== NEXT BUTTON ========================= */}
					<div className="flex items-center w-fit gap-3 mt-5">
						<button className="text-2xl" onClick={() => setActive(5)}>
							Next
						</button>
						<FaCaretRight className="w-3 h-6" />
					</div>
				</main>
			</section>
		</>
	);
};

export default FinancialConstraint;
