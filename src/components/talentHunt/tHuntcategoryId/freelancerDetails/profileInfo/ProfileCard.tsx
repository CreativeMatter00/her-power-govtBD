import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import { PiMedalLight } from "react-icons/pi";

const ProfileCard = () => {
	return (
		<>
			<div className="flex max-md:flex-col justify-start items-center gap-4">
				<div>
					{/* ========================= PROFILE IMAGE ========================= */}
					<Image
						src={
							"/assets/images/talent-hunt/matheus-ferrero-W7b3eDUb_2I-unsplash.jpg"
						}
						alt="profile photo"
						width={100}
						height={100}
						className="rounded-full object-cover w-24 h-24"
					/>
				</div>
				{/* ======================== INFORMATION ============================ */}
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold">Ripa Sultana</h1>
					<div className="flex items-center gap-2">
						<FiMapPin className="w-4 h-4" />
						<p className="text-sm font-normal">Badda, Dhaka</p>
					</div>
					<div className="flex items-center gap-2">
						<PiMedalLight className="w-4 h-4 bg-brandDs text-white rounded-full p-0.5" />
						<p className="text-sm font-bold">85% Job Success</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileCard;
