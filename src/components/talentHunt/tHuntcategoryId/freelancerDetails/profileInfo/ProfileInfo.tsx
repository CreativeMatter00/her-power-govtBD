import Image from "next/image";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FiMapPin, FiUpload } from "react-icons/fi";
import { PiMedalLight } from "react-icons/pi";
import ProfileCard from "./ProfileCard";
import Buttons from "./Buttons";

const ProfileInfo = () => {
	return (
		<>
			<section className="border border-brandDs rounded-md p-4">
				<div className="flex max-md:flex-col max-md:justify-center justify-between items-center">
					{/* ======================== PROFILE INFO ======================== */}
					<ProfileCard />
					{/* ======================== BUTTONS =============================== */}
					<Buttons />
				</div>
			</section>
		</>
	);
};

export default ProfileInfo;
