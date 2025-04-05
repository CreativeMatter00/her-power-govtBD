const FixedRate = () => {
	return (
		<>
			<div className="text-base mt-4">
				<p className="">Set a price for the project and pay at the end</p>
				<p className="font-bold mt-8">
					What cost estimate fits your project&apos;s parameter?
				</p>
				<p>You can negotiate this cost</p>
				<div className="mt-4">
					<div className="text-[#252525] border-2 border-[#252525] p-2 rounded-md w-36 font-bold inline">
						TK
						{/* ======================= COST INPUT IN TK ========================= */}
						<input className="outline-none px-2" type="text" />
					</div>
				</div>
			</div>
		</>
	);
};

export default FixedRate;
