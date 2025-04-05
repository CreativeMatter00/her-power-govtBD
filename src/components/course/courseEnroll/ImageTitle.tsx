import Image from "next/image";

const ImageTitle = () => {
	return (
		<>
			<div className="flex flex-col justify-center items-center gap-6">
				<Image
					src={"/assets/images/course/govt.png"}
					height={150}
					width={150}
					alt="govt"
					className="w-auto h-36"
				/>
				<h1 className="text-[#252525] max-md:text-4xl text-6xl font-bold">
					BCS Examination
				</h1>
			</div>
		</>
	);
};

export default ImageTitle;
