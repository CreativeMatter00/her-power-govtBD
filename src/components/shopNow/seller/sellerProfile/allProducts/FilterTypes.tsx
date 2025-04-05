import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaStar, FaRegStar } from "react-icons/fa6";

const FilterTypes = () => {
	return (
		<div className="py-6 px-2">
			<p className="font-bold text-xl text-brandPrimary pb-4 border-b border-brandLsPrimary hidden md:block">
				Filters
			</p>
			<div className="text-brandPrimary py-4">
				<div className="mb-6">
					<RadioGroup defaultValue="popular">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="popular" id="popular" />
							<Label htmlFor="popular" className="text-brandPrimary">
								{" "}
								Most Popular Products{" "}
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem value="frequently-sold" id="frequently-sold" />
							<Label htmlFor="frequently-sold" className="text-brandPrimary">
								Most Frequently Selling Products
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem value="lowToHigh" id="lowToHigh" />
							<Label htmlFor="lowToHigh" className="text-brandPrimary">
								Price Low to High
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem value="HighToLow" id="HighToLow" />
							<Label htmlFor="HighToLow" className="text-brandPrimary">
								Price Low to High
							</Label>
						</div>
					</RadioGroup>
				</div>

				<div className="mb-6">
					<p className="font-bold text-brandDs pb-2"> Price </p>
					<div className="grid grid-cols-2 gap-4">
						<input
							className="bg-brandLsSecondary p-2"
							type="number"
							placeholder="Min"
						/>

						<input
							className="bg-brandLsSecondary p-2"
							type="number"
							placeholder="Min"
						/>
					</div>
				</div>

				<div className="mb-6">
					<p className="font-bold text-brandDs pb-2"> Product Category </p>
					<RadioGroup defaultValue="food">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="food" id="food" />
							<Label htmlFor="food" className="text-brandPrimary">
								Food
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem value="handicraft" id="handicraft" />
							<Label htmlFor="handicraft" className="text-brandPrimary">
								Handicrafts
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem value="ornament" id="ornament" />
							<Label htmlFor="ornament" className="text-brandPrimary">
								Oranament Crafts
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem value="potteries" id="potteries" />
							<Label htmlFor="potteries" className="text-brandPrimary">
								Potteries
							</Label>
						</div>
					</RadioGroup>
				</div>

				<div className="mb-6">
					<p className="font-bold text-brandDs pb-2"> Rating </p>
					<RadioGroup defaultValue="1">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="5" id="5" />
							<Label htmlFor="5" className="text-brandPrimary">
								<div className="flex">
									<FaStar className="text-warning" />
									<FaStar className="text-warning" />
									<FaStar className="text-warning" />
									<FaStar className="text-warning" />
									<FaStar className="text-warning" />
								</div>
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem value="4" id="4" />
							<Label htmlFor="4" className="text-brandPrimary">
								<div className="flex">
									<FaStar className="text-warning" />
									<FaStar className="text-warning" />
									<FaStar className="text-warning" />
									<FaStar className="text-warning" />
									<FaRegStar className="text-grey" />
								</div>
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem value="3" id="3" />
							<Label htmlFor="3" className="text-brandPrimary">
								<div className="flex">
									<FaStar className="text-warning" />
									<FaStar className="text-warning" />
									<FaStar className="text-warning" />
									<FaRegStar className="text-grey" />
									<FaRegStar className="text-grey" />
								</div>
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem value="2" id="2" />
							<Label htmlFor="2" className="text-brandPrimary">
								<div className="flex">
									<FaStar className="text-warning" />
									<FaStar className="text-warning" />
									<FaRegStar className="text-grey" />
									<FaRegStar className="text-grey" />
									<FaRegStar className="text-grey" />
								</div>
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem value="1" id="1" />
							<Label htmlFor="1" className="text-brandPrimary">
								<div className="flex">
									<FaStar className="text-warning" />
									<FaRegStar className="text-grey" />
									<FaRegStar className="text-grey" />
									<FaRegStar className="text-grey" />
									<FaRegStar className="text-grey" />
								</div>
							</Label>
						</div>
					</RadioGroup>
				</div>

				<div className="mb-6">
					<p className="font-bold text-brandDs pb-2"> Special Offers </p>
					<RadioGroup defaultValue="sale">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="sale" id="sale" />
							<Label htmlFor="sale" className="text-brandPrimary">
								On Sale
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem value="new-arrivals" id="new-arrivals" />
							<Label htmlFor="new-arrivals" className="text-brandPrimary">
								New Arrivals
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<RadioGroupItem value="customizable" id="customizable" />
							<Label htmlFor="customizable" className="text-brandPrimary">
								Customizable Products
							</Label>
						</div>
					</RadioGroup>
				</div>

				<button className="px-9 py-2.5 border border-brandPrimary rounded-full text-brandPrimary block mx-auto mt-8 font-medium hover:bg-brandPrimary hover:text-white transition-all duration-300">
					Apply
				</button>
			</div>
		</div>
	);
};

export default FilterTypes;
