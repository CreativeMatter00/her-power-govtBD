"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import CheckBoxInput from "../checkOutInputs/CheckBoxInput";
import LinksText from "../checkOutInputs/LinksText";
import { useState } from "react";

// ============================ ACTIVE TAB ==================
interface SelectTabInfo {
	activeTab: string;
	setActiveTab: Function;
}

// ====================== ONLINE PAYMENT METHODS ===========================
const onlinePaymentMethods = [
	{
		methodName: "Upay",
		methodImage: "/assets/images/footer/upay.png",
	},
	{
		methodName: "Nagad",
		methodImage: "/assets/images/footer/nagad.png",
	},
	{
		methodName: "Rocket",
		methodImage: "/assets/images/footer/roket.png",
	},
	{
		methodName: "Bkash",
		methodImage: "/assets/images/footer/bkash.png",
	},
];

const Payment: React.FC<SelectTabInfo> = ({ activeTab, setActiveTab }) => {
	// ==================== PAYMENT METHOD STATE ==========================
	const [paymentMethod, setPaymentMethod] = useState<string>("");
	// console.log(paymentMethod);
	// const [onlinePayment, setOnlinePayment] = useState<boolean>(false);
	return (
		<>
			<div className="mt-3">
				<Tabs defaultValue="onlinePayment" className="">
					<TabsList className="flex max-md:flex-col justify-between max-md:gap-2 text-base w-full">
						{/* =========================== ONLINE PAYMENT ============================= */}
						<TabsTrigger
							className={`text-base ${
								activeTab === "onlinePayment" ? "" : "text-brandPrimary"
							}`}
							value="onlinePayment"
							onClick={() => setActiveTab("onlinePayment")}
						>
							<svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="mr-2"
							>
								<circle cx="9" cy="9" r="9" fill="#EEDDF5" />
								<circle
									cx="9"
									cy="9"
									r="7"
									className={`${
										activeTab === "onlinePayment"
											? "fill-brandPrimary"
											: "fill-brandLsPrimary"
									}`}
								/>
							</svg>
							Online Payment
						</TabsTrigger>
						{/* =========================== CASH ON DELIVERY ========================= */}
						<TabsTrigger
							className={`text-base ${
								activeTab === "cashOnDelivery" ? "" : "text-brandPrimary"
							}`}
							value="cashOnDelivery"
							onClick={() => setActiveTab("cashOnDelivery")}
						>
							<svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="mr-2"
							>
								<circle cx="9" cy="9" r="9" fill="#EEDDF5" />
								<circle
									cx="9"
									cy="9"
									r="7"
									className={`${
										activeTab === "cashOnDelivery"
											? "fill-brandPrimary"
											: "fill-brandLsPrimary"
									}`}
								/>
							</svg>
							Cash on delivery
						</TabsTrigger>
					</TabsList>

					<TabsContent value="onlinePayment">
						<div className="grid max-md:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 max-md:mt-6">
							{/* ==================== ONLINE PAYMENTS METHOD ============================== */}
							{onlinePaymentMethods.map((method, index) => (
								<div key={index} className=" max-md:mt-8 md:mt-2">
									<button
										type="button"
										onClick={() => setPaymentMethod(`${method.methodName}`)}
									>
										<div className="flex items-center">
											<svg
												width="18"
												height="18"
												viewBox="0 0 18 18"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												className="mr-2"
											>
												<circle cx="9" cy="9" r="9" fill="#EEDDF5" />
												<circle
													cx="9"
													cy="9"
													r="7"
													className={`${
														paymentMethod === method.methodName
															? "fill-brandPrimary"
															: "fill-brandLsPrimary"
													}`}
												/>
											</svg>
											<Image
												src={method.methodImage}
												alt={`${method.methodName}`}
												width={40}
												height={40}
											/>
										</div>
									</button>
								</div>
							))}
						</div>
					</TabsContent>
					<TabsContent value="cashOnDelivery"></TabsContent>
				</Tabs>

				{/* ============================== CHECK BOX INPUTS ================================= */}
				{/* ============================== TERMS CONDITIONS POLICIES ======================= */}
				<div className="flex flex-row items-center gap-1 max-md:mt-16 md:mt-8">
					<CheckBoxInput
						inputText="I have read and agree to the"
						fontWeightClass="font-medium"
					/>
					<LinksText linksText="Privacy Policy" />
				</div>
			</div>
		</>
	);
};

export default Payment;
