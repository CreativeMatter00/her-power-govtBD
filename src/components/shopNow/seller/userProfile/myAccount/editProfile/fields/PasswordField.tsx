"use client";

import { useState } from "react";
import { LuEyeOff } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";

// ================================== PROPS TYPE DEFINITION ======================
interface FieldInfo {
	infoLabel: string;
}

const PasswordField: React.FC<FieldInfo> = ({ infoLabel }) => {
	// =============================== PASSWORD STATE INITIALIZED =========================
	const [isShow, setIsShow] = useState<boolean>(false);
	return (
		<div>
			{/* ==================================== LABEL =================================== */}
			<h1 className="text-brandPrimary text-sm pl-6">{infoLabel}</h1>

			<div className="flex justify-between items-center gap-4 mt-1 py-2 px-6  border border-brandLsPrimary rounded-3xl w-full">
				{/* ============================== PASSWORD ======================= */}
				<input
					type={`${isShow ? "text" : "password"}`}
					className="text-base text-brandPrimary outline-none w-full"
				/>
				{/* ================================ TOGGLE BUTTONS ================= */}
				<button type="button" onClick={() => setIsShow(!isShow)}>
					{isShow ? (
						// ================================= NOT SHOW ICON =======================
						<LuEyeOff className="text-greyPrimary hover:cursor-pointer" />
					) : (
						// ================================ SHOW ICON ==========================
						<MdOutlineRemoveRedEye className="text-greyPrimary hover:cursor-pointer" />
					)}
				</button>
			</div>
		</div>
	);
};

export default PasswordField;
