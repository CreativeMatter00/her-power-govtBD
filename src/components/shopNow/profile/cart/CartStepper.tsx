import { useTranslations } from "next-intl";
import { FC } from "react";

type IStepper = {
	active: string;
};

const CartStepper: FC<IStepper> = ({ active }) => {
	const t = useTranslations("ShopNavbar");
	return (
		<div className="container mx-auto mb-16">
			<ol className="flex items-center w-full text-xs text-gray-900 font-medium sm:text-base">
				<li
					className={`flex w-full relative text-white after:content-[''] after:w-full after:h-0.5 ${
						active === "checkout" || active === "confirmation"
							? "after:bg-success"
							: "after:bg-gray-200"
					} after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4`}
				>
					<div className="block whitespace-nowrap z-10">
						<span className="w-6 h-6 bg-brandPrimary border-2 border-transparent rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-white lg:w-10 lg:h-10">
							1
						</span>
						<p className="text-brandPrimary"> {t("Cart")} </p>
					</div>
				</li>

				<li
					className={`flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5 ${
						active === "confirmation" ? "after:bg-success" : "after:bg-gray-200"
					} after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4`}
				>
					<div className="block whitespace-nowrap z-10">
						<span
							className={`w-6 h-6 ${
								active === "checkout" || active === "confirmation"
									? "bg-brandPrimary border-brandPrimary text-white"
									: "bg-gray-50 border-gray-200"
							} border-2  rounded-full flex justify-center items-center mx-auto mb-3 text-sm lg:w-10 lg:h-10`}
						>
							2
						</span>
						<p className="text-brandPrimary"> {t("Checkout")} </p>
					</div>
				</li>

				<li className="flex relative text-gray-900">
					<div className="block whitespace-nowrap z-10">
						<span
							className={`w-6 h-6 ${
								active === "confirmation"
									? "bg-brandPrimary border-brandPrimary text-white"
									: "bg-gray-50 border-gray-200"
							} border-2  rounded-full flex justify-center items-center mx-auto mb-3 text-sm lg:w-10 lg:h-10`}
						>
							3
						</span>
						<p className="text-brandPrimary"> {t("Confirmation")} </p>
					</div>
				</li>
			</ol>
		</div>
	);
};

export default CartStepper;
