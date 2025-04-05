const SearchBar = () => {
	return (
		<div className="my-8 w-full">
			{/* ======================== TITLE ============================== */}
			<h1 className="text-xl text-brandDs">What you like to know?</h1>

			{/* ======================== SEARCH ============================ */}
			<div className="flex items-center gap-6 mt-3">
				{/* =============================== INPUT FIELD =================================== */}
				<input
					type="text"
					placeholder="Search anything"
					className="px-6 py-2 text-brandDs border border-brandLsPrimary rounded-full outline-none w-1/2"
				/>
				{/* ============================= SEARCH BUTTON ========================= */}
				<button className="bg-brandDs hover:bg-brandPrimary text-bgPrimary text-sm font-medium px-8 py-3 rounded-full">
					Search
				</button>
			</div>
		</div>
	);
};

export default SearchBar;
