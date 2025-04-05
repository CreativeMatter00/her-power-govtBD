import Image from "next/image";
import { IoStarSharp } from "react-icons/io5";

const ProfileCard = () => {
	return (
		<>
			{/* ======================== CARD =========================== */}
			<div className="p-3 border border-brandPrimary rounded-lg">
				<div className="flex justify-end font-medium text-sm text-[#252525]">
					<span>BDT 58</span>
					<span className="opacity-60">/hr</span>
				</div>

				{/* ==================== PROFILE PHOTO ======================== */}
				<div className="flex justify-center items-center">
					<div className="w-[74px] h-[74px] rounded-full">
						<Image
							src={
								"/assets/images/talent-hunt/matheus-ferrero-W7b3eDUb_2I-unsplash.jpg"
							}
							alt="profile photo"
							width={74}
							height={74}
							className="object-cover rounded-full w-[74px] h-[74px]"
						/>
					</div>
				</div>

				{/* ===================== PROFILE INFO ====================== */}
				<div className="flex flex-col justify-center items-center gap-1 mt-4">
					{/* ========================== NAME ============================ */}
					<h1 className="font-bold text-2xl">Ripa Sultana</h1>
					{/* ======================= PROFESSION ========================== */}
					<h3 className="font-normal text-base">Java Developer</h3>
					{/* ============================ RATING ============================= */}
					<div className="flex items-center gap-2 text-sm font-normal text-[#252525] mt-2">
						<IoStarSharp className="w-5 h-5 text-brandDs" />
						<span className="opacity-50">5.00/5</span>
						<span className="opacity-50">(147 Projects)</span>
					</div>
					{/* ======================== LANGUAGES ======================================= */}
					<div className="flex justify-center items-center gap-3 font-normal text-sm text-[#252525] opcaity-60 mt-3">
						<div className="border border-[#252525] border-opacity-80 rounded-xl px-3">
							Java
						</div>
						<div className="border border-[#252525] border-opacity-80 rounded-xl px-3">
							C++
						</div>
						<div className="border border-[#252525] border-opacity-80 rounded-xl px-3">
							MySQL
						</div>
					</div>
					{/* =========================== APPLICATION TYPE ========================== */}
					<div className="border border-[#252525] border-opacity-80 rounded-2xl px-4 mt-2 text-sm font-normal text-[#252525] opacity-80">
						Desktop Application
					</div>
					{/* ================================ ENROLL BUTTON =========================== */}
					<div className="bg-brandPrimary rounded-2xl px-4 py-1 mt-2 text-sm font-medium text-[#ffffff] ">
						Enroll Now
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileCard;
