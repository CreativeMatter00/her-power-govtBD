"use client";

import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { LuEyeOff } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";

// ================================== PROPS TYPE DEFINITION ======================
interface FieldInfo {
	inputLabel: string;
	inputName: string;
	errors: any;
	register: UseFormRegister<any>;
	borderStyle?: string;
}

const PasswordField: React.FC<FieldInfo> = ({
	inputLabel,
	inputName,
	errors,
	register,
	borderStyle = "rounded-3xl",
}) => {
	// ======================== PASSWORD STATE INITIALIZED =====================
	const [isShow, setIsShow] = useState<boolean>(false);
	return (
		<div>
			{/* ==================================== LABEL =================================== */}
			<h1 className="text-brandPrimary text-sm pl-6">{inputLabel}</h1>

			{/* ============================ PASSWORD ============================== */}
			<div
				className={`flex justify-between items-center gap-4 mt-1 py-2 px-6 border border-brandLsPrimary ${borderStyle} w-full`}
			>
				{/* <div className={`flex justify-between items-center gap-4 mt-1 py-2 px-6 border border-brandLsPrimary rounded-3xl w-full`}> */}
				<input
					type={`${isShow ? "text" : "password"}`}
					className="text-base text-brandPrimary outline-none w-full"
					{...register(inputName)}
				/>

				{/* ================================ TOGGLE BUTTONS ================= */}
				<button
					type="button"
					onClick={() => setIsShow(!isShow)}
					className="outline-none"
				>
					{isShow ? (
						// ================================= NOT SHOW ICON =======================
						<LuEyeOff className="text-greyPrimary hover:cursor-pointer" />
					) : (
						// ================================ SHOW ICON ==========================
						<MdOutlineRemoveRedEye className="text-greyPrimary hover:cursor-pointer" />
					)}
				</button>
			</div>

			{errors[inputName] && (
				<p className="text-red-500 text-sm mt-1 pl-6">
					{errors[inputName]?.message}
				</p>
			)}
		</div>
	);
};

export default PasswordField;
