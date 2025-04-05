import styles from "@/styles/Events.module.css";

const MoreQuestion = () => {
	return (
		<div
			className={`my-6 w-full border border-brandLsPrimary rounded-lg ${styles.moreQuestionShadow}`}
		>
			<div className="flex flex-col items-center gap-3 p-4">
				{/* ============================ TITLE =========================== */}
				<h1 className="text-base text-link">Still have questions?</h1>
				{/* ================================== TEXT ================================= */}
				<p className="text-center text-base text-brandPrimary font-normal">
					If you need further assistance or have specific inquiries, don&apos;t
					hesitate to reach out. We&apos;re here to help you with all your
					event-related needs. Click the button below to contact us directly.
				</p>
				{/* ============================ CONTACT BUTTON ======================== */}
				<button className="text-sm font-medium text-success hover:text-bgPrimary border border-success rounded-full px-24 lg:px-36 py-2 hover:bg-success">
					Contact Us
				</button>
			</div>
		</div>
	);
};

export default MoreQuestion;
