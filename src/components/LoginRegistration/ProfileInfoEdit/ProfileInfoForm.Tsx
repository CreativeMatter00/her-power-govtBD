"use client";
import { useState } from "react";
import RegistrationInputField from "./RegistrationInputField/RegistrationInputField";
import { GoCheckbox } from "react-icons/go";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import Image from "next/image";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const ProfileInfoForm = () => {
	// ------------------------------------ BUTTON STATE INITIALIZED -------------------------------
	const [sameAddress, setSameAddress] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	return (
		<section className="bg-bgPrimary">
			<main className="container my-8">
				{/* ------------------------------------- Heading ----------------------------------- */}
				<div className="text-brandPrimary font-normal ">
					<h1 className="text-3xl mb-4">Registration Form</h1>
					{/* ------------------------------ LOGIN OPTION ----------------------------------------------- */}
					<p className="text-base">
						Already have an account?{" "}
						<span className="text-link">Click here to login</span>
					</p>
				</div>

				{/* ------------------------------------ REGISTRATION FORM ---------------------------------------- */}
				<form
					action="submit"
					className="border border-brandLsPrimary rounded-lg px-6 py-3 mt-4"
				>
					{/* ----------------------------- Personal Information ------------------------------------- */}
					<div>
						<h1 className="pb-4 border-b border-brandLsPrimary text-brandPrimary text-base font-bold">
							Personal Information
						</h1>
						<div className="flex justify-evenly items-start gap-8 mt-4">
							<div className="w-1/2">
								<div className="mb-5">
									<label className="text-brandPrimary text-sm pl-6">
										Upload Image
									</label>
									<div className="text-base border border-brandLsPrimary rounded-xl mt-3 w-full">
										{/* ----------------------------------------- IMAGE UPLOAD SECTION ----------------------------------- */}
										<div className="flex justify-center items-center gap-6">
											<Image
												src={`/assets/images/profile/inputImage.png`}
												width={74}
												height={45}
												alt="input file"
												className="w-20 h-11"
											/>
											<div className="py-8">
												<div className="text-center text-brandPrimary text-sm py-2">
													<p>Drag your profile images here</p>
													<p>
														or{" "}
														<span className="text-link text-base font-normal">
															Upload a file
														</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* --------------------------------------- name input section ------------------------------------------ */}
							<div className="w-1/2 ">
								<RegistrationInputField
									inputType="text"
									labelName="First Name"
									placeholderText="Enter your first name"
								/>
								<RegistrationInputField
									inputType="text"
									labelName="Last Name"
									placeholderText="Enter your last name"
								/>
							</div>
						</div>
						<div className="flex justify-evenly items-start gap-8">
							{/* ------------------------------------ LEFT SIDE INPUT FIELD ------------------------------- */}
							{/* ------------------------------ phone & user name --------------------------------- */}
							<div className="w-1/2">
								<RegistrationInputField
									inputType={"text"}
									labelName={"Phone"}
									placeholderText={"Ex. 01xxxxxxxx"}
								/>
								<RegistrationInputField
									inputType="text"
									labelName="Username"
									placeholderText="Enter your username"
								/>
							</div>
							{/* ------------------------------------ RIGHT SIDE INPUT FIELD ------------------------------- */}
							{/* ----------------------------- email ------------------------------------ */}
							<div className="w-1/2">
								<RegistrationInputField
									inputType="email"
									labelName="Email"
									placeholderText="Enter your email"
								/>
							</div>
						</div>
					</div>

					{/* *************************************************************************************************** */}
					{/* ---------------------------------------------------- Delivary Address ----------------------------------------------------- */}
					<div>
						<h1 className="pb-4 border-b border-brandLsPrimary text-brandPrimary text-base font-bold">
							Delivery Address
						</h1>
						<div className="flex justify-evenly items-center gap-8 mt-4">
							{/* ------------------------------------ LEFT SIDE INPUT FIELD ------------------------------- */}
							<div className="w-1/2">
								<RegistrationInputField
									inputType={"text"}
									labelName={"Address"}
									placeholderText={"Ex. House number and street name"}
								/>
								<RegistrationInputField
									inputType="text"
									labelName="City"
									placeholderText="Ex. Dhaka-north"
								/>
							</div>
							{/* ------------------------------------ RIGHT SIDE INPUT FIELD ------------------------------- */}
							<div className="w-1/2">
								<RegistrationInputField
									inputType="text"
									labelName="Area"
									placeholderText="Ex. Banani"
								/>
								<RegistrationInputField
									inputType="text"
									labelName="Zip Code"
									placeholderText="Ex. 1230"
								/>
							</div>
						</div>
					</div>

					{/* *************************************************************************************** */}
					{/* ------------------------------------- Billing Address -------------------------------------- */}
					<div>
						<h1 className="pb-4 border-b border-brandLsPrimary text-brandPrimary text-base font-bold">
							Billing Address
						</h1>
						<div className="flex justify-evenly items-center gap-8 mt-4">
							{/* ------------------------------------ LEFT SIDE INPUT FIELD Billing Address------------------------------- */}
							<div className="w-1/2">
								<RegistrationInputField
									inputType={"text"}
									labelName={"Address"}
									placeholderText={"Ex. House number and street name"}
								/>
								<RegistrationInputField
									inputType="text"
									labelName="City"
									placeholderText="Ex. Dhaka-north"
								/>
							</div>
							{/* ------------------------------------ RIGHT SIDE INPUT FIELD Billing Address------------------------------- */}
							<div className="w-1/2">
								<RegistrationInputField
									inputType="text"
									labelName="Area"
									placeholderText="Ex. Banani"
								/>
								<RegistrationInputField
									inputType="text"
									labelName="Zip Code"
									placeholderText="Ex. 1230"
								/>
							</div>
						</div>
						<div className="flex text-brandPrimary mb-4 px-6">
							<button
								onClick={() => setSameAddress(!sameAddress)}
								type="button"
							>
								{sameAddress ? (
									<GoCheckbox />
								) : (
									<MdOutlineCheckBoxOutlineBlank />
								)}
							</button>
							<p className="text-base pl-2">
								My Delivery and billing address are the same
							</p>
						</div>
					</div>

					{/* ---------------------------------------------------- Billing and Payment ----------------------------------------------------- */}
					<div>
						<h1 className="pb-4 mb-4 border-b border-brandLsPrimary text-brandPrimary text-base font-bold">
							Billing and Payment
						</h1>
						<div>
							<h1 className="ml-12 mt-6 text-brandPrimary px-6">Credit Card</h1>
						</div>
						<div className="flex justify-evenly items-center gap-8 mt-4">
							{/* ------------------------------------ LEFT SIDE INPUT FIELD Billing and Payment------------------------------- */}
							<div className="w-1/2">
								<RegistrationInputField
									inputType={"text"}
									labelName={"Card Number"}
									placeholderText={"Enter your card number"}
								/>
								<RegistrationInputField
									inputType="text"
									labelName="Expiry Date"
									placeholderText="dd/mm/yyyy"
								/>
							</div>
							{/* ------------------------------------ RIGHT SIDE INPUT FIELD Billing and Payment------------------------------- */}
							<div className="w-1/2">
								<RegistrationInputField
									inputType="text"
									labelName="Name on Card"
									placeholderText="Name on card"
								/>
								<RegistrationInputField
									inputType="text"
									labelName="CVV"
									placeholderText="CVV"
								/>
							</div>
						</div>
					</div>

					{/* ---------------------------------------------------- Security & Password ----------------------------------------------------- */}
					<div>
						<h1 className="pb-4 border-b border-brandLsPrimary text-brandPrimary text-base font-bold">
							Security & Password
						</h1>

						<div className="flex justify-evenly items-center gap-8 mt-4">
							{/* ------------------------------------ LEFT SIDE INPUT FIELD ------------------------------- */}
							<div className="w-1/2">
								<div className="mb-5">
									<label className="text-brandPrimary text-sm pl-6">
										Password
									</label>
									<div className="border border-brandLsPrimary rounded-3xl w-full flex justify-between items-center px-6">
										<input
											className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 w-full "
											type={showPassword ? "text" : "password"}
											placeholder="Type your password"
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="text-[#cacaca]"
										>
											{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
										</button>
									</div>
								</div>
							</div>
							{/* ------------------------------------ RIGHT SIDE INPUT FIELD ------------------------------- */}
							<div className="w-1/2">
								<div className="mb-5">
									<label className="text-brandPrimary text-sm pl-6">
										Confirm Password
									</label>
									<div className="border border-brandLsPrimary rounded-3xl w-full flex justify-between items-center px-6">
										<input
											className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 w-full"
											type={showConfirmPassword ? "text" : "password"}
											placeholder="Confirm your password"
										/>
										<button
											type="button"
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
											className="text-[#cacaca]"
										>
											{showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* ---------------------------------------------- button section ------------------------------------------- */}
					<div className="w-full">
						<input
							type="submit"
							value="Submit"
							className="font-medium text-lg text-bgSecondary bg-link px-8 py-2 rounded-3xl cursor-pointer"
						/>
						{/* ------------------------------------------ clear form --------------------------------- */}
						<div className="inline px-6">
							<button className="text-link text-base px-6">Clear</button>
						</div>
					</div>
				</form>
			</main>
		</section>
	);
};

export default ProfileInfoForm;
