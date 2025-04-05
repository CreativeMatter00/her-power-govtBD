import { LuSearch } from "react-icons/lu";

const SearchBar = () => {
	return (
		<>
			{/* ============================ SEARCH SECTION ================================= */}
			<div className="flex items-center gap-4 my-8 w-full">
				{/* =============================== ENTER SEARCH TOPIC ======================== */}
				<div className="basis-11/12 cursor-pointer">
					<div className="border border-brandLsPrimary rounded-full px-5 py-3">
						<div className="flex items-center gap-3">
							{/* =========================== SEARCH ICON ============================= */}
							<LuSearch className="text-greyPrimary w-5 h-5" />
							{/* ========================== SEARCH INPUT FIELD ======================= */}
							<input
								type="text"
								name=""
								id=""
								className="text-[#cacaca] text-xl placeholder:text-xl w-full outline-none cursor-pointer"
								placeholder="Search for anything"
							/>
						</div>
					</div>
				</div>
				<div>
					{/* ================================= SEARCH BUTTON ============================== */}
					<button className="bg-brandDs hover:bg-brandPrimary text-lg text-bgPrimary font-medium px-8 py-3 rounded-full cursor-pointer">
						Search
					</button>
				</div>
			</div>
		</>
	);
};

export default SearchBar;
