import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
	return (
		<>
			<section className="mt-10 lg:mt-16 mb-8 w-full ">
				<h1 className="text-sm text-[#a5a5a5] font-normal"></h1>
				<div className="w-full">
					<div className="flex flex-col md:flex-row md:justify-between items-center max-md:gap-4 mt-2">
						<div className="flex items-center border border-brandDs rounded-full basis-2/4 p-0.5 w-full">
							<div className="basis-full">
								<input
									type="text"
									placeholder="Search..."
									className=" py-1.5 px-4 outline-none bg-transparent "
								/>
							</div>
							<div className="flex justify-center items-center w-10 h-10 bg-brandDs rounded-full">
								<IoIosSearch className="text-bgSecondary w-5 h-5 font-bold" />
							</div>
						</div>
						{/* <div className="text-link text-base font-normal">Draft (2)</div> */}
					</div>
				</div>
			</section>
		</>
	);
};

export default SearchBar;
