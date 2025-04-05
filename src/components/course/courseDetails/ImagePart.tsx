import Image from "next/image";

interface ImagePart {
	image: string;
	courseTitle: string;
}

const ImagePart = ({ image, courseTitle }: ImagePart) => {
	return (
		<>
			<div className="flex flex-col justify-center items-center gap-6">
				{/* ----------------------- BD MAP LOGO ----------------- */}
				<Image
					src={image}
					height={150}
					width={150}
					alt="BD map logo"
					className="w-full h-72"
				/>
				<h1 className="text-[#252525] max-md:text-4xl text-6xl font-bold">
					{courseTitle}
				</h1>
			</div>
		</>
	);
};

export default ImagePart;
