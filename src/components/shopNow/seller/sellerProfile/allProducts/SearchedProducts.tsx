import FilterTypes from "./FilterTypes";
import SearchResults from "./SearchResults";

const SearchedProducts = () => {
	return (
		<div className="container mx-auto">
			<div
				className="py-10 flex gap-6"
				// style={{ gridTemplateColumns: "1fr 3fr" }}
			>
				<div className="md:w-1/4 hidden md:block">
					<div className="w-full border border-brandLsPrimary py-2">
						<FilterTypes />
					</div>
				</div>

				<div className="w-full md:w-3/4">
					<SearchResults />
				</div>
			</div>
		</div>
	);
};

export default SearchedProducts;
