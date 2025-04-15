"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { useTranslations } from "next-intl";
import TestMessageModal from "./TestMessageModal";

const Hero = () => {
	const t = useTranslations("Home");

	// Define CSS for the gradient overlay
	const gradientOverlay: React.CSSProperties = {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		background: "#1E1E1E",
		opacity: 0.5, // Adjust the opacity as needed
	};

	return (
		<div>
			{/* <div className="bg-[#763B90] h-[200px]"> */}
			<div className="bg-[#763B90] h-[150px]">
				<div className="container mx-auto md:px-12 text-center h-full flex items-center">
					<p className="text-2xl md:text-6xl font-bold text-white text-center w-full">
						{t("hero")}
					</p>
				</div>
			</div>
			<TestMessageModal />
			{/* <div className="relative h-[600px]">
				<span className="absolute inset-0 flex flex-col justify-center container mx-auto z-50 text-[#fff]">
					<div className="block mx-4 text-center">
						<p className="text-6xl font-bold">
							Harnessing Strength <br /> Creating Opportunities
						</p>
					</div>
				</span>
				<Swiper
					spaceBetween={30}
					centeredSlides={true}
					autoplay={{
						delay: 4000,
						disableOnInteraction: false,
					}}
					navigation={true}
					loop={true}
					modules={[Autoplay, Navigation]}
					className="mySwiper relative"
					style={{ height: "600px" }}
				>
					<SwiperSlide>
						<div className="w-full h-full relative">
							<Image src="/assets/images/home/hero/1.jpg" fill alt="carousel" />
							<div style={gradientOverlay}></div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="w-full h-full relative">
							<Image src="/assets/images/home/hero/2.jpg" fill alt="carousel" />
							<div style={gradientOverlay}></div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="w-full h-full relative">
							<Image src="/assets/images/home/hero/3.jpg" fill alt="carousel" />
							<div style={gradientOverlay}></div>
						</div>
					</SwiperSlide>
				</Swiper>
			</div> */}
		</div>
	);
};
export default Hero;
