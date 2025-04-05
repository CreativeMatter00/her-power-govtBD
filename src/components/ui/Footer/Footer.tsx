import Image from "next/image";
import Link from "next/link";
import HerPowerPart from "./HerPowerPart";
import EarnPawerPart from "./EarnPawerPart";
import DownloadPart from "./DownloadPart";
import FollowPart from "./FollowPart";
import PaymentPart from "./PaymentPart";
import PartnersPart from "./PartnersPart";
import herPowerLottie from "../../../../public/assets/data.json";
import Lottie from "lottie-react";
import { useTranslations } from "next-intl";
import Logo from "../logo/Logo";

const currentYear = new Date().getFullYear();

const Footer = () => {
	const t = useTranslations("Footer");

	return (
		<div className="bg-[#FBF5FD] border-t border-brandDs">
			<div className="container px-6 py-14 lg:max-w-[1024px]">
				<div className="flex gap-4 justify-between max-lg:flex-col max-lg:gap-8">
					<div className="flex justify-between flex-col">
						<div className="mb-6 max-lg:flex max-lg:justify-center">
							<Logo
								logoHeight="h-32"
								logoWidth="w-auto"
								text={true}
								textHeight="h-20"
								textWidth="w-auto"
							/>
							{/* <Image
								src={`/assets/images/navbar/Her Power Logo.gif`}
								width={260}
								height={113}
								alt="her-power Logo"
								className="h-28 w-64"
								priority
							/> */}
						</div>
						<div className="flex gap-2 justify-end items-start  lg:h-24 max-lg:hidden">
							<Image
								src={`/assets/images/footer/calllogo.png`}
								width={58}
								height={58}
								alt="ict"
								className="h-14 w-14"
								priority
							/>
							<div className="">
								<p className="text-sm text-brandPrimary font-bold">
									{t("customerCare")}
								</p>
								<p className="text-3xl text-brandDs">1234</p>
							</div>
						</div>
					</div>

					<div className="flex justify-between  lg:flex-col ">
						<div className=" lg:mb-6">
							<HerPowerPart />
						</div>
						<div className="h-24 max-lg:hidden">
							<PaymentPart />
						</div>
						<div className="h-24 lg:hidden">
							<EarnPawerPart />
						</div>
					</div>

					<div className="flex justify-between  lg:flex-col ">
						<div className="mb-6 max-lg:hidden">
							<EarnPawerPart />
						</div>
						<div className="lg:h-24 lg:hidden">
							<PaymentPart />
						</div>
						<div className=" lg:h-24 ">
							<PartnersPart />
						</div>
					</div>

					<div className="flex justify-between lg:flex-col  max-lg:gap-1 ">
						<div className="mb-6 max-lg:hidden">
							<DownloadPart />
						</div>

						<div className="lg:h-24">
							<FollowPart />
						</div>

						<div className="flex gap-2 mt-3 lg:hidden">
							<Image
								src={`/assets/images/footer/calllogo.png`}
								width={58}
								height={58}
								alt="ict"
								className="h-12 w-12"
								priority
							/>
							<div className="">
								<p className="text-xs text-brandPrimary font-bold">
									Customer Care
								</p>
								<p className="text-2xl text-brandDs">1234</p>
							</div>
						</div>
					</div>
					<div className="lg:hidden">
						<DownloadPart />
					</div>
				</div>
			</div>

			<div className="bg-brandDs ">
				<div className="container px-4 max-md:px-1 flex justify-center items-center flex-col text-sm text-white py-8">
					<div className="flex">
						© {currentYear}&nbsp;
						<Link
							href="https://www.atilimited.net/"
							target="_blank"
							className="hover:underline cursor-pointer"
						>
							ATI Limited
						</Link>
						<p className="mb-1">.&nbsp;All rights reserved.</p>
					</div>
					<p>Trade marks are owned by or licensed to the ICT Division</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
