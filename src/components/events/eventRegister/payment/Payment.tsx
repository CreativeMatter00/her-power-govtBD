import CheckBoxInput from "@/components/shopNow/profile/cart/checkOut/checkOutInputs/CheckBoxInput";
import LinksText from "@/components/shopNow/profile/cart/checkOut/checkOutInputs/LinksText";
import Image from "next/image";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

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

const Payment: React.FC<{ setActive: Function }> = ({ setActive }) => {
	const [paymentMethod, setPaymentMethod] = useState<string>("");

	const [open, setOpen] = useState<boolean>(false);

	return (
		<div className="container mx-auto py-10">
			<p className="text-brandPrimary text-3xl mb-6"> Make Payment </p>
			<p className="text-brandDs font-bold border-b border-brandLsPrimary py-2">
				Payment
			</p>

			<p className="py-4 text-brandPrimary"> Online Payment </p>
			<div className="flex items-center gap-16 flex-wrap">
				{/* ==================== ONLINE PAYMENTS METHOD ============================== */}
				{onlinePaymentMethods.map((method, index) => (
					<div key={index} className="max-md:mt-8 md:mt-2">
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

			<div className="flex flex-col gap-1 max-md:mt-16 md:mt-8">
				<CheckBoxInput
					inputText="I have read and agree to the"
					linksText="Privacy Policy"
					fontWeightClass="font-medium"
				/>
				<CheckBoxInput
					inputText="I have read and agree to the"
					linksText="Terms & Conditions"
					fontWeightClass="font-medium"
				/>

				{/* ============================ TERMS AND CONDITIONS ============================== */}
				{/* ============================ LINKS ========================================= */}
				<div className="flex max-md:flex-col justify-start max-md:items-start items-center max-md:gap-2 gap-6">
					<CheckBoxInput
						inputText="I have read and agree to the"
						fontWeightClass="font-medium"
					/>
					<LinksText linksText="Payment Terms" />
					<LinksText linksText="Delivery Terms" />
					<LinksText linksText="Refund and Return Policy" />
				</div>

				<div className="pt-10">
					<p className="text-brandPrimary pb-4">
						{" "}
						Once you complete the payment you will get a verification code.{" "}
						<br />
						Please provide the verification code, that we sent you through
						mobile sms.{" "}
					</p>
					<input
						type="text"
						placeholder="Enter your verification code"
						className="border border-brandLsPrimary rounded-full text-lg p-2 w-[460px] mb-6"
					/>

					<button
						className="text-white py-3 px-8 bg-link rounded-full block"
						onClick={() => setOpen(true)}
					>
						Submit
					</button>
				</div>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="max-w-[600px] bg-white">
					<DialogDescription>
						<div className="p-10">
							<p className="text-3xl text-success mb-3 text-center">
								{" "}
								Success{" "}
							</p>

							<div className="mb-6">
								<p className="text-brandPrimary text-center text-lg">
									Thank you for purchasing Standard ticket for Future of
									Technology Conference.{" "}
								</p>
								<p className="text-brandPrimary text-center text-lg">
									Download the ticket now or you can also find it in the My
									Events page.{" "}
								</p>
							</div>

							<div className="flex items-center justify-center">
								<Link href={""} className="text-link text-center">
									Download Ticket
								</Link>
							</div>
						</div>
					</DialogDescription>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Payment;
