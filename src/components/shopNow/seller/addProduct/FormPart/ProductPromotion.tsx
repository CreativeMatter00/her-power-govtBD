import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductInput from "../InputProduct/ProductInput";
import { UseFormRegister } from "react-hook-form";
import DatePicker from "../InputProduct/DatePicker";

interface IPromotionDate {}

interface ValidationInfo {
	startDate: string;
	endDate: string;
	setPromotionStartDate: Function;
	setPromotionEndDate: Function;
	errors: any;
	register: UseFormRegister<any>;
}

const ProductPromotion: React.FC<ValidationInfo> = ({
	errors,
	register,
	startDate,
	endDate,
	setPromotionStartDate,
	setPromotionEndDate,
	// activeTab,
	// setActiveTab,
}) => {
	return (
		<>
			{/* <Tabs defaultValue="Add Promotion" className="w-full my-4"> */}
			{/* <TabsList className="grid w-full grid-cols-3"> */}
			{/* <TabsList className="flex max-md:flex-col flex-row max-md:items-start items-center justify-between max-md:gap-3"> */}
			{/* ========================== ADD PROMOTION =========================== */}
			{/* <TabsTrigger
						value="Add Promotion"
						className={`text-sm ${
							activeTab === "Add Promotion" ? "" : "text-brandPrimary"
						}`}
						onClick={() => setActiveTab("Add Promotion")}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="mr-2"
						>
							<circle cx="9" cy="9" r="9" fill={`bg-brandLsPrimary`} />
							<circle
								cx="9"
								cy="9"
								r="7"
								className={` ${
									activeTab === "Add Promotion"
										? "fill-brandPrimary"
										: "fill-brandLsPrimary"
								}`}
							/>
						</svg>
						Add Promotion
					</TabsTrigger> */}

			{/* ======================== CREATE DISCOUNT ============================= */}
			{/* <TabsTrigger
						value="Create Discounts"
						className={`tabs-trigger ${
							activeTab === "Create Discounts" ? "active" : ""
						}`}
						onClick={() => setActiveTab("Create Discounts")}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="mr-2"
						>
							<circle cx="9" cy="9" r="9" fill={`bg-brandLsPrimary`} />
							<circle
								cx="9"
								cy="9"
								r="7"
								className={` ${
									activeTab === "Create Discounts"
										? "fill-brandPrimary"
										: "fill-brandLsPrimary"
								}`}
							/>
						</svg>
						Create Discounts
					</TabsTrigger> */}

			{/* ==================== GENERATE COUPONS ===================== */}
			{/* <TabsTrigger
						value="Generate Coupons"
						className={`tabs-trigger ${
							activeTab === "Generate Coupons" ? "active" : ""
						}`}
						onClick={() => setActiveTab("Generate Coupons")}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="mr-2"
						>
							<circle cx="9" cy="9" r="9" fill={`bg-brandLsPrimary`} />
							<circle
								cx="9"
								cy="9"
								r="7"
								className={` ${
									activeTab === "Generate Coupons"
										? "fill-brandPrimary"
										: "fill-brandLsPrimary"
								}`}
							/>
						</svg>
						Generate Coupons
					</TabsTrigger> */}
			{/* </TabsList> */}

			{/* ========================== ADD PROMOTION =========================== */}
			{/* <TabsContent
					value="Add Promotion"
					className="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-x-8 gap-y-4 max-md:mt-24"
				>
					<ProductInput
						inputType="text"
						placeholderText="Enter promotion name here..."
						name="promotionName"
						label="Promotion Name:"
						errors={errors}
						register={register}
					/>
					<ProductInput
						inputType="text"
						placeholderText="Enter promotion details here..."
						name="promotionDetails"
						label="Promotion Details:"
						errors={errors}
						register={register}
					/>
					<ProductInput
						inputType="text"
						placeholderText="dd/mm/yyyy"
						name="startDate"
						label="Start Date:"
						errors={errors}
						register={register}
					/>
					<ProductInput
						inputType="text"
						placeholderText="dd/mm/yyyy"
						name="endDate"
						label="End Date:"
						errors={errors}
						register={register}
					/>
				</TabsContent> */}

			{/* ======================== CREATE DISCOUNT ============================= */}
			{/* <TabsContent
					value="Create Discounts"
					className="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-x-8 gap-y-4"
				>
					<ProductInput
						inputType="text"
						placeholderText="Enter discount percentage here..."
						name="discountPercentage"
						label="Discount Percentage"
						errors={errors}
						register={register}
					/>
					<ProductInput
						inputType="text"
						placeholderText="Enter discount code here..."
						name="discountCode"
						label="Discount Code"
						errors={errors}
						register={register}
					/>
				</TabsContent> */}

			{/* ==================== GENERATE COUPONS ===================== */}
			{/* <TabsContent
					value="Generate Coupons"
					className="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-x-8 gap-y-4"
				>
					<ProductInput
						inputType="text"
						placeholderText="Enter coupon code prefix here..."
						name="couponCode"
						label="Coupon Code Prefix"
						errors={errors}
						register={register}
					/>
					<ProductInput
						inputType="text"
						placeholderText="Enter number of coupons here..."
						name="numberOfCoupons"
						label="Number of Coupons"
						errors={errors}
						register={register}
					/>
				</TabsContent> */}
			{/* </Tabs> */}

			<div className="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-x-8 gap-y-4 mt-3 mb-6">
				<ProductInput
					inputType="text"
					placeholderText="Enter promotion name here..."
					name="promotionName"
					label="Promotion Name:"
					errors={errors}
					register={register}
				/>
				<ProductInput
					inputType="text"
					placeholderText="Enter promotion code here..."
					name="promotionCode"
					label="Promotion Code:"
					errors={errors}
					register={register}
				/>

				<DatePicker
					label="Start Date:"
					errors={errors}
					register={register}
					promotionDate={startDate}
					setPromotionDate={setPromotionStartDate}
				/>
				<DatePicker
					label="End Date:"
					errors={errors}
					register={register}
					promotionDate={endDate}
					setPromotionDate={setPromotionEndDate}
				/>
			</div>
		</>
	);
};

export default ProductPromotion;
