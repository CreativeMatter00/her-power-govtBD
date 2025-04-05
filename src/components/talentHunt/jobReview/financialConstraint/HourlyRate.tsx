const HourlyRate = () => {
	return (
		<>
			<div className="flex items-center gap-14 font-bold text-lg mt-14">
				{/* ============================ FROM ================================ */}
				<div className="flex items-center gap-2">
					From{" "}
					<div className="flex items-center gap-0.5">
						<div className="flex items-start border border-[#252525] rounded px-2.5 py-0.5">
							<div className="text-sm">TK</div>
							<div className="mt-[1px]">25</div>
						</div>
						/hr
					</div>
				</div>
				{/* ============================= TO ========================= */}
				<div className="flex items-center gap-2">
					To{" "}
					<div className="flex items-center gap-0.5">
						<div className="flex items-start border border-[#252525] rounded px-2.5 py-0.5">
							<div className="text-sm">TK</div>
							<div className="mt-[1px]">80</div>
						</div>
						/hr
					</div>
				</div>
			</div>
		</>
	);
};

export default HourlyRate;
