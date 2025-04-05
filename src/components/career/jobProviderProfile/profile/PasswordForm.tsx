"use client";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

interface EditPassword {
	setEditPassword: Function;
	setEditProfile: Function;
}
const PasswordForm: React.FC<EditPassword> = ({
	setEditPassword,
	setEditProfile,
}) => {
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

	const handleCancel = () => {
		setEditProfile(false);
		setEditPassword(false);
	};
	
	return (
		<>
			<div className="my-6">
				<form
					action="submit"
					className="border border-brandLsPrimary rounded-md max-md:p-3 p-6 text-brandPrimary"
				>
					{/* ---------------------------------- security password ---------------------------- */}
					<div className="">
						<h1 className="text-base font-bold my-3 pb-3 border-b border-brandLsPrimary">
							Security & Password
						</h1>

						<div className="w-full flex gap-6">
							<div className="my-3 max-md:w-full w-1/2">
								{/* ================================== OLD PASSWORD ======================= */}
								<label className="text-greyPrimary ml-6">Old Password</label>
								<div className="border border-brandLsPrimary rounded-3xl flex justify-between px-6 py-2 my-3 max-md:mr-0 mr-3">
									<input
										type={showOldPassword ? "text" : "password"}
										className="w-full outline-none"
										placeholder="Enter your old password..."
									/>
									<button
										type="button"
										onClick={() => setShowOldPassword(!showOldPassword)}
										className="text-greyPrimary"
									>
										{showOldPassword ? <FaRegEyeSlash /> : <FaRegEye />}
									</button>
								</div>
							</div>
							<div className="my-3 max-md:w-full w-1/2">
								{/* ===================================== NEW PASSWORD ============================= */}
								<label className="text-greyPrimary ml-6">New Password</label>
								<div className="border border-brandLsPrimary rounded-3xl flex justify-between px-6 py-2 my-3 max-md:mr-0 mr-3">
									<input
										type={showNewPassword ? "text" : "password"}
										className="w-full outline-none"
										placeholder="Enter your new password..."
									/>
									<button
										type="button"
										onClick={() => setShowNewPassword(!showNewPassword)}
										className="text-greyPrimary"
									>
										{showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
									</button>
								</div>
							</div>
						</div>
						<div className="w-full">
							<div className="my-3 max-md:w-full w-1/2">
								{/* ==================================== RETYPE NEW PASSWORD =========================== */}
								<label className="text-greyPrimary ml-6">
									Retype New Password
								</label>
								<div className="border border-brandLsPrimary rounded-3xl flex justify-between px-6 py-2 my-3 max-md:mr-0 mr-5">
									<input
										type={showConfirmNewPassword ? "text" : "password"}
										className="w-full outline-none"
										placeholder="Retype new password..."
									/>
									<button
										type="button"
										onClick={() =>
											setShowConfirmNewPassword(!showConfirmNewPassword)
										}
										className="text-greyPrimary"
									>
										{showConfirmNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-4 flex items-center gap-8">
						<button
							type="submit"
							className="bg-link text-white text-base font-bold py-2 px-6 rounded-md"
						>
							Save Changes
						</button>
						<button
							type="button"
							onClick={handleCancel}
							className="bg-dangerPrimary text-white text-base font-bold py-2 px-6 rounded-md"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default PasswordForm;
