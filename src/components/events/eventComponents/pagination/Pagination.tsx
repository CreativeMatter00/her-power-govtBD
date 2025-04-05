import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// ************************* STATIC PAGINATION BUTTON ==========================
const Pagination = () => {
	return (
		<>
			{" "}
			<div>
				<div className="flex justify-end my-3">
					<div className="flex items-center gap-1 text-link text-base">
						{/* ------------ previous button --------------- */}
						<button className="h-9 w-9 flex justify-center items-center border border-brandPrimary p-1">
							<IoIosArrowBack />
						</button>
						<button className="h-9 border border-brandPrimary px-2 py-1">
							1
						</button>
						<button className="h-9 border border-brandPrimary px-2 py-1">
							2
						</button>
						<button className="h-9 border border-brandPrimary px-2 py-1">
							3
						</button>
						<button className="h-9 border border-brandPrimary px-2 py-1">
							4
						</button>
						<button className="h-9 border border-brandPrimary px-2 py-1">
							5
						</button>
						<button className="h-9 border border-brandPrimary px-2 py-1">
							...
						</button>
						<button className="h-9 border border-brandPrimary px-2 py-1">
							11
						</button>
						{/* ---------------- next nutton -------------------- */}
						<button className="h-9 w-9 flex justify-center items-center border border-brandPrimary px-2 py-1">
							<IoIosArrowForward />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Pagination;
