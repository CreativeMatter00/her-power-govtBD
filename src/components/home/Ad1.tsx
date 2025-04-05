import Image from "next/image";
import React from "react";

const Ad1 = () => {
	return (
		<div className="flex flex-col gap-4 items-center">
			<Image
				src={"/assets/images/home/ads/1.jpg"}
				height={200}
				width={200}
				alt="advertisement"
				className="mix-blend-multiply h-[260px]"
			/>
{/* 
			<Image
				src={"/assets/images/home/ads/2-new.png"}
				height={200}
				width={200}
				alt="advertisement"
			/> */}
			<Image
				src={"/assets/images/home/ads/poster.jpeg"}
				height={200}
				width={200}
				alt="advertisement"
				className="h-[260px] rounded-lg"
			/>
		</div>
	);
};

export default Ad1;
