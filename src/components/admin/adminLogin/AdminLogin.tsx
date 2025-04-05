/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import { useState } from "react";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { GoCheckbox } from "react-icons/go";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";

const AdminLogin = () => {
	const [rememberMe, setRememberMe] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	interface IAdminLogin {
		email: string;
		password: string;
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IAdminLogin>();

	const onSubmit: SubmitHandler<IAdminLogin> = (data) => {
		// if (data) {
		// 	console.log(data);
		// }
	};

	return (
		<>
			<section className="lg:h-screen">
				<div className="flex flex-col lg:flex-row lg:h-full items-center md:h-screen justify-center">
					{/* -------------------------------------------- IMAGE WITH HEADING ---------------------------------------- */}
					<div className="hidden lg:block lg:w-6/12 lg:h-full">
						<div className="relative lg:h-full">
							<Image
								src={`/assets/images/login/Sign in-amico.png`}
								width={450}
								height={450}
								alt="login image"
								className="absolute lg:h-full h-full w-full"
							/>
							<div className="absolute right-0 bottom-0 w-full h-full bg-gradient-to-br from-transparent to-brandPrimary opacity-40"></div>
						</div>
					</div>
					{/* --------------------------------------------------------- LOGIN SECTION -------------------------------------------------- */}
					<div className="flex justify-center lg:justify-center items-center lg:w-6/12 px-6 lg:px-0 my-8 lg:my-0 ">
						<div>
							<div className=" mb-4">
								<div className="flex justify-center items-center ">
									<Image
										src={`/assets/images/navbar/Her Power Logo.gif`}
										width={200}
										height={150}
										alt="her-power Logo"
										className="h-32 w-auto"
										priority
									/>
								</div>
							</div>
							<h1 className="text-4xl text-center">
								<span className="text-brandPrimary font-normal">
									Admin Panel of
								</span>{" "}
								<span className="text-brandDs">Her Power</span>
							</h1>
							<h6 className="text-base font-normal text-greyPrimary text-center my-3">
								Enter your credentials to access your account
							</h6>

							{/* ---------------------------------------------- LOGIN FORM ------------------------------------ */}
							<form onSubmit={handleSubmit(onSubmit)}>
								{/* ------------------------------------------ EMAIL FIELD -------------------------------------------- */}
								<div className="my-4">
									<label className="text-brandDs text-sm">Email</label>
									<input
										type="email"
										placeholder="Enter your email"
										className="block outline-none border-b border-[#252525] w-full px-2 py-1 placeholder:text-[#CACACA] text-base font-normal mt-2"
										{...register("email", {
											required: true,
											pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										})}
									/>
									{errors?.email?.type === "required" && (
										<span className="text-xs text-red-500 pl-2">
											Email is required
										</span>
									)}

									{errors?.email?.type === "pattern" && (
										<span className="text-xs text-red-500 pl-2">
											Email address is invalid
										</span>
									)}
								</div>

								{/* -------------------------------------------- PASSWORD FIELD --------------------------------- */}
								<div>
									<label className="text-brandDs text-sm">Password</label>
									<div className="flex border-b border-[#252525] mt-2">
										<input
											placeholder="Enter your password"
											type={showPassword ? "text" : "password"}
											className="block outline-none w-full px-2 placeholder:text-[#CACACA] text-base font-normal mb-1"
											{...register("password", {
												required: true,
												minLength: 6,
											})}
										/>

										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="mr-2 text-[#cacaca]"
										>
											{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
										</button>
									</div>
									{errors?.password?.type === "required" && (
										<span className="text-xs text-red-500 pl-2">
											Password is required
										</span>
									)}
									{errors?.password?.type === "minLength" && (
										<span className="text-xs text-red-500 pl-2">
											Password must be at least 6 characters
										</span>
									)}
								</div>
								{/* ----------------------------------------- REMEMBER ME ---------------------------------------------- */}
								<div className="text-brandPrimary flex items-center my-4 font-normal">
									{/* <button
										onClick={() => setRememberMe(!rememberMe)}
										type="button"
									>
										{rememberMe ? (
											<GoCheckbox />
										) : (
											<MdOutlineCheckBoxOutlineBlank />
										)}
									</button> */}
									{/* <div className="flex justify-between items-center w-full">
										<p className="text-base pl-2 w-full">Remember me</p>

										<p className="w-full text-end text-link text-base my-2 border-blue-500">
											Forgot Password?
										</p>
									</div> */}
								</div>
								{/* --------------------------------- LOGIN BUTTON -------------------- */}
								<input
									type="submit"
									value="Login"
									className="bg-link text-bgSecondary font-medium text-base w-full py-2 rounded-3xl mt-2 cursor-pointer"
								/>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default AdminLogin;
