"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

const JobInfoForm = () => {
	// ======================= STATE INITIALIZED FOR RADIO BUTTON ============================
	const [scale, setScale] = useState(false);
	const [duration, setDuration] = useState(true);
	const [experience, setExperience] = useState(true);
	const [contractType, setContractType] = useState(true);

	return (
		<>
			{/* ============================== PROJECT SCALE ========================= */}
			<div className="my-8">
				<p className="text-lg font-bold my-2">
					Consider the scale of your project in relation to its estimated
					duration
				</p>
				<RadioGroup disabled={scale}>
					{/* =================== LARGE SCALE ========================= */}
					<div className="flex items-start space-x-2">
						<RadioGroupItem
							onClick={() => setDuration(false)}
							className="mt-1 w-5 h-5 text-brandDs"
							value="large"
							id="large"
						/>
						<Label htmlFor="large">
							<span className="text-lg font-bold">Large</span>
							<br />
							<span className="text-base font-normal">
								Design and build a full website (Longer term or complex
								initiatives)
							</span>
						</Label>
					</div>
					{/* =================== MEDIUM SCALE ========================= */}
					<div className="flex items-start space-x-2">
						<RadioGroupItem
							onClick={() => setDuration(false)}
							className="mt-1 w-5 h-5 text-brandDs"
							value="medium"
							id="medium"
						/>
						<Label htmlFor="medium">
							<span className="text-lg font-bold">Medium</span>
							<br />
							<span className="text-base font-normal">
								Landing page (Well defined projects)
							</span>
						</Label>
					</div>
					{/* =================== SMALL SCALE ========================= */}
					<div className="flex items-start space-x-2">
						<RadioGroupItem
							onClick={() => setDuration(false)}
							className="mt-1 w-5 h-5 text-brandDs"
							value="small"
							id="small"
						/>
						<Label htmlFor="small">
							<span className="text-lg font-bold">Small</span>
							<br />
							<span className="text-base font-normal">
								Update text and images on a webpage (Quick and straightforward
								tasks)
							</span>
						</Label>
					</div>
				</RadioGroup>
			</div>

			{/* ================================== PROJECT DURATION ======================== */}
			<div className={`my-8 ${duration ? "text-greyPrimary" : "text-black"}`}>
				<p className="text-lg font-bold my-2">How long will your work take?</p>
				<RadioGroup disabled={duration}>
					{/* ====================== THREE TO SIX MONTH ======================= */}
					<div className="flex items-start space-x-2">
						<RadioGroupItem
							onClick={() => setExperience(false)}
							className="mt-1 w-5 h-5 text-brandDs"
							value="3to6"
							id="3to6"
						/>
						<Label htmlFor="3to6">
							<span className="text-lg font-bold">3 to 6 months</span>
						</Label>
					</div>
					{/* ====================== ONE TO THREE MONTH ======================= */}
					<div className="flex items-start space-x-2">
						<RadioGroupItem
							onClick={() => setExperience(false)}
							className="mt-1 w-5 h-5 text-brandDs"
							value="1to3"
							id="1to3"
						/>
						<Label htmlFor="1to3">
							<span className="text-lg font-bold">1 to 3 months</span>
						</Label>
					</div>
					{/* ===================== LESS THAN ONE MONTH ================ */}
					<div className="flex items-start space-x-2">
						<RadioGroupItem
							onClick={() => setExperience(false)}
							className="mt-1 w-5 h-5 text-brandDs"
							value="lessThan1"
							id="lessThan1"
						/>
						<Label htmlFor="lessThan1">
							<span className="text-lg font-bold">Less than 1 month</span>
						</Label>
					</div>
				</RadioGroup>
			</div>

			{/* =============================== LEVEL OF EXPERIENCE =================== */}
			<div className={`my-8 ${experience ? "text-greyPrimary" : "text-black"}`}>
				<p className="text-lg font-bold my-2">
					Which level of experience will it need?
				</p>
				<RadioGroup disabled={experience}>
					{/* ================================ ENTRY LEVEL ======================= */}
					<div className="flex items-start space-x-2">
						<RadioGroupItem
							onClick={() => setContractType(false)}
							className="mt-1 w-5 h-5 text-brandDs"
							value="entry"
							id="entry"
						/>
						<Label htmlFor="entry">
							<span className="text-lg font-bold">Entry</span>
						</Label>
					</div>
					{/* ======================== INTERMEDIATE LEVEL ========================= */}
					<div className="flex items-start space-x-2">
						<RadioGroupItem
							onClick={() => setContractType(false)}
							className="mt-1 w-5 h-5 text-brandDs"
							value="intermediate"
							id="intermediate"
						/>
						<Label htmlFor="intermediate">
							<span className="text-lg font-bold">Intermediate</span>
						</Label>
					</div>
					{/* ========================= EXPERT LEVEL ===================== */}
					<div className="flex items-start space-x-2">
						<RadioGroupItem
							onClick={() => setContractType(false)}
							className="mt-1 w-5 h-5 text-brandDs"
							value="expert"
							id="expert"
						/>
						<Label htmlFor="expert">
							<span className="text-lg font-bold">Expert</span>
						</Label>
					</div>
				</RadioGroup>
			</div>

			{/* ============================= CONTRACT TO HIRE ======================== */}
			<div
				className={`my-8 ${contractType ? "text-greyPrimary" : "text-black"}`}
			>
				<div className="my-2">
					<p className="text-lg font-bold mt-2">
						Is this job a contract-to-hire opportunity?
					</p>
					<p className="text-base">
						This helps set expectations with talent and won&apos;t restrict who
						can submit proposals.
					</p>
				</div>
				<RadioGroup disabled={contractType}>
					{/* ============================ FULL TIME =================== */}
					<div className="flex items-start space-x-2">
						<RadioGroupItem
							disabled={contractType}
							className="mt-1 w-5 h-5 text-brandDs"
							value="full-time"
							id="full-time"
						/>
						<Label htmlFor="full-time">
							<span className="text-lg font-bold">
								Yes, this could become full time
							</span>
							<p className="text-base">
								After a trial period, you can pay a one-time fee to convert the
								contract.
							</p>
						</Label>
					</div>
					{/* =========================== NOT ========================== */}
					<div className="flex items-start space-x-2">
						<RadioGroupItem
							className="mt-1 w-5 h-5 text-brandDs"
							value="not"
							id="not"
						/>
						<Label htmlFor="not">
							<span className="text-lg font-bold">No, not at this time</span>
						</Label>
					</div>
				</RadioGroup>
			</div>
		</>
	);
};

export default JobInfoForm;
