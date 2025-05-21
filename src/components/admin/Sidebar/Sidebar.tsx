import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CgListTree } from "react-icons/cg";
import { FaGraduationCap } from "react-icons/fa";
import { FaHandshake, FaHandshakeSimple } from "react-icons/fa6";
import { HiSpeakerphone } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { RiClipboardFill, RiDashboardFill } from "react-icons/ri";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { VscStarFull } from "react-icons/vsc";
import "./sidebar.css";

const Sidebar = () => {
	const locale = useLocale();
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const handleToggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const pathName = usePathname();

	return (
		<>
			<section
				className={`print:hidden bg-white h-screen fixed w-72 z-40 overflow-auto  border-r border-[#D4D4D4] scrollbar`}
			>
				{/* <section className="border border-red-400 h-screen overflow-auto scrollbar bg-black"> */}

				<aside className="mt-16">
					{/* =========================================== ADMIN PANEL ==================================== */}
					<div className="border-b border-[#d4d4d4]">
						<h1 className="px-4 py-6 font-bold text-brandPrimary text-xl">
							Admin Panel
						</h1>
					</div>
					{/* ============================================================================================ */}

					<main className="my-6 mx-4">
						{/* ============================================= DASHBOARD OVERVIEW =============================== */}
						<Link href={`/${locale}/admin`}>
							<div
								className={`flex items-center cursor-pointer gap-3 hover:bg-[#F2F2F2] py-3 px-1 ${
									pathName === `/${locale}/admin`
										? "bg-[#f2f2f2]"
										: "bg-transparent"
								}`}
							>
								<RiDashboardFill className="text-brandDs w-6 h-6" />
								<h1 className="text-[#1C1C1C] text-base font-normal">
									Dashboard Overview
								</h1>
							</div>
						</Link>

						{/* ============================ NEWS & MEDIA ================================ */}
						<div className="mt-5 flex flex-col gap-3 text-base text-[#1C1C1C]">
							{/* ***************************************************************************************************** */}
							<h6 className="text-[#646464] text-sm">News and Media</h6>
							{/* ***************************************************************************************************** */}

							<div className={`flex justify-between items-center gap-3 w-full`}>
								<Link
									href={`/${locale}/admin/latest-news`}
									className={`flex items-center cursor-pointer gap-3 hover:bg-[#F2F2F2] ${
										pathName === `/${locale}/admin/latest-news`
											? "bg-[#f2f2f2]"
											: "bg-transparent"
									} px-1 py-3 w-full`}
								>
									{/* <div className="flex items-center gap-3 bg-[#f2f2f2] p-1 w-full"> */}
									<HiSpeakerphone className="text-brandDs w-6 h-6" />
									<h1>Latest News</h1>
									{/* </div> */}
								</Link>
							</div>
							<div className={`flex justify-between items-center gap-3 w-full`}>
								<Link
									href={`/${locale}/admin/sponsor-setup`}
									className={`flex items-center cursor-pointer gap-3 hover:bg-[#F2F2F2] ${
										pathName === `/${locale}/admin/sponsor-setup`
											? "bg-[#f2f2f2]"
											: "bg-transparent"
									} px-1 py-3 w-full`}
								>
									{/* <div className="flex items-center gap-3 bg-[#f2f2f2] p-1 w-full"> */}
									<FaHandshakeSimple className="text-brandDs w-6 h-6" />
									<h1>Sponsor Setup</h1>
									{/* </div> */}
								</Link>
							</div>
						</div>

						{/* =========================================== HER POWER MODULES ===================================================== */}
						<div className="mt-5 flex flex-col gap-5 text-base text-[#1C1C1C]">
							{/* ***************************************************************************************************** */}
							<h6 className="text-[#646464] text-sm">Her Power Modules</h6>
							{/* ***************************************************************************************************** */}

							{/* =============================================== DASHBOARD MENUS ================================= */}

							{/* ----------------------------------------------------------------------------------------------------------------------- */}
							<div>
								<div
									onClick={() => handleToggle(0)}
									className={`flex justify-between items-center gap-3 hover:font-bold hover:cursor-pointer ${
										openIndex === 0 && "font-bold"
									} group`}
								>
									<div
										className={`flex items-center gap-3 ${
											openIndex === 0 && "font-bold"
										}`}
									>
										<SiHomeassistantcommunitystore className="text-brandDs w-5 h-5" />
										<h1>Shop Now</h1>
									</div>
									{openIndex === 0 ? (
										<IoIosArrowDown className="text-brandDs" />
									) : (
										<IoIosArrowForward className="group-hover:text-brandDs" />
									)}
								</div>
								{openIndex === 0 ? (
									<div className="mt-4 flex flex-col gap-3 text-sm text-[#444444] animation">
										<Link href={`/${locale}/admin/shop-now/product-category`}>
											<div
												className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
													pathName ===
													`/${locale}/admin/shop-now/product-category`
														? "bg-[#f2f2f2]"
														: "bg-transparent"
												}  px-1 py-3 cursor-pointer`}
											>
												<CgListTree className="text-brandDs w-5 h-5" />{" "}
												<h1>Product Category</h1>
											</div>
										</Link>
										<Link href={`/${locale}/admin/shop-now/seller-approval`}>
											<div
												className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
													pathName ===
													`/${locale}/admin/shop-now/seller-approval`
														? "bg-[#f2f2f2]"
														: "bg-transparent"
												}  px-1 py-3 cursor-pointer`}
											>
												<CgListTree className="text-brandDs w-5 h-5" />{" "}
												<h1>Seller Approval</h1>
											</div>
										</Link>
									</div>
								) : null}
							</div>
							{/* ------------------------------------------------------------------------------------------------------------------------------------ */}
							<div>
								<div
									onClick={() => handleToggle(1)}
									className={`flex justify-between items-center gap-3 hover:font-bold hover:cursor-pointer ${
										openIndex === 1 && "font-bold"
									} group`}
								>
									<div
										className={`flex items-center gap-3 ${
											openIndex === 1 && "font-bold"
										}`}
									>
										<FaGraduationCap className="text-brandDs w-5 h-5" />
										<h1>Explore Courses</h1>
									</div>
									{openIndex === 1 ? (
										<IoIosArrowDown className="text-brandDs" />
									) : (
										<IoIosArrowForward className="group-hover:text-brandDs" />
									)}
								</div>
								{openIndex === 1 ? (
									<div className="mt-4 flex flex-col gap-3 text-sm text-[#444444] animation">
										<div
											className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
												pathName ===
												`/${locale}/admin/shop-now/product-category`
													? "bg-[#f2f2f2]"
													: "bg-transparent"
											}  px-1 py-3 cursor-pointer`}
										>
											<CgListTree className="text-brandDs w-5 h-5" />{" "}
											<h1>Product Category</h1>
										</div>
										<div
											className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
												pathName ===
												`/${locale}/admin/shop-now/product-category`
													? "bg-[#f2f2f2]"
													: "bg-transparent"
											}  px-1 py-3 cursor-pointer`}
										>
											<CgListTree className="text-brandDs w-5 h-5" />{" "}
											<h1>Product Sub Category</h1>
										</div>
									</div>
								) : null}
							</div>
							{/* ------------------------------------------------------------------------------------------------------------------------------------ */}
							<div>
								<div
									onClick={() => handleToggle(2)}
									className="flex justify-between items-center gap-3 hover:font-bold hover:cursor-pointer group"
								>
									<div
										className={`flex items-center gap-3 ${
											openIndex === 2 && "font-bold"
										}`}
									>
										<VscStarFull className="text-brandDs w-5 h-5" />
										<h1>Career</h1>
									</div>
									{openIndex === 2 ? (
										<IoIosArrowDown className="text-brandDs" />
									) : (
										<IoIosArrowForward className="group-hover:text-brandDs" />
									)}
								</div>
								{openIndex === 2 ? (
									<div className=" mt-4 flex flex-col gap-3 text-sm text-[#444444] animation">
										<Link href={`/${locale}/admin/career/skillset-setup`}>
											<div
												className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
													pathName ===
													`/${locale}/admin/shop-now/product-category`
														? "bg-[#f2f2f2]"
														: "bg-transparent"
												}  px-1 py-3 cursor-pointer`}
											>
												<CgListTree className="text-brandDs w-5 h-5" />{" "}
												<h1>Skillset Setup</h1>
											</div>
										</Link>

										<Link href={`/${locale}/admin/career/skill-setup`}>
											<div
												className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
													pathName === `/${locale}/admin/career/skill-setup`
														? "bg-[#f2f2f2]"
														: "bg-transparent"
												}  px-1 py-3 cursor-pointer`}
											>
												<CgListTree className="text-brandDs w-5 h-5" />{" "}
												<h1>Skill Setup</h1>
											</div>
										</Link>
									</div>
								) : null}
							</div>
							{/* ------------------------------------------------------------------------------------------------------------------------------------ */}
							<div>
								<div
									onClick={() => handleToggle(3)}
									className="flex justify-between items-center gap-3 hover:font-bold hover:cursor-pointer group"
								>
									<div
										className={`flex items-center gap-3 ${
											openIndex === 3 && "font-bold"
										}`}
									>
										<FaHandshake className="text-brandDs w-5 h-5" />
										<h1>Meet Partners</h1>
									</div>
									{openIndex === 3 ? (
										<IoIosArrowDown className="text-brandDs" />
									) : (
										<IoIosArrowForward className="group-hover:text-brandDs" />
									)}
								</div>
								{openIndex === 3 ? (
									<div className=" mt-4 flex flex-col gap-3 text-sm text-[#444444] animation">
										<div
											className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
												pathName ===
												`/${locale}/admin/shop-now/product-category`
													? "bg-[#f2f2f2]"
													: "bg-transparent"
											}  px-1 py-3 cursor-pointer`}
										>
											<CgListTree className="text-brandDs w-5 h-5" />{" "}
											<h1>Product Category</h1>
										</div>
										<div
											className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
												pathName ===
												`/${locale}/admin/shop-now/product-category`
													? "bg-[#f2f2f2]"
													: "bg-transparent"
											}  px-1 py-3 cursor-pointer`}
										>
											<CgListTree className="text-brandDs w-5 h-5" />{" "}
											<h1>Product Sub Category</h1>
										</div>
									</div>
								) : null}
							</div>
							{/* ------------------------------------------------------------------------------------------------------------------------------------ */}
							<div>
								<div
									onClick={() => handleToggle(4)}
									className="flex justify-between items-center gap-3 hover:font-bold hover:cursor-pointer group"
								>
									<div
										className={`flex items-center gap-3 ${
											openIndex === 4 && "font-bold"
										}`}
									>
										<RiClipboardFill className="text-brandDs w-5 h-5" />
										<h1>Events</h1>
									</div>
									{openIndex === 4 ? (
										<IoIosArrowDown className="text-brandDs" />
									) : (
										<IoIosArrowForward className="group-hover:text-brandDs" />
									)}
								</div>
								{openIndex === 4 ? (
									<div className="mt-4 flex flex-col gap-3 text-sm text-[#444444] animation">
										<Link href={`/${locale}/admin/events/venue-setup`}>
											<div
												className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
													pathName === `/${locale}/admin/events/venue-setup`
														? "bg-[#f2f2f2]"
														: "bg-transparent"
												}  px-1 py-3 cursor-pointer`}
											>
												<CgListTree className="text-brandDs w-5 h-5" />{" "}
												<h1>Venue Setup</h1>
											</div>
										</Link>
										<Link href={`/${locale}/admin/events/speakers-setup`}>
											<div
												className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
													pathName === `/${locale}/admin/events/speakers-setup`
														? "bg-[#f2f2f2]"
														: "bg-transparent"
												}  px-1 py-3 cursor-pointer`}
											>
												<CgListTree className="text-brandDs w-5 h-5" />{" "}
												<h1>Speakers Setup</h1>
											</div>
										</Link>
										<Link href={`/${locale}/admin/events/event-category-setup`}>
											<div
												className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
													pathName ===
													`/${locale}/admin/events/event-category-setup`
														? "bg-[#f2f2f2]"
														: "bg-transparent"
												}  px-1 py-3 cursor-pointer`}
											>
												<CgListTree className="text-brandDs w-5 h-5" />{" "}
												<h1>Event Category Setup</h1>
											</div>
										</Link>

										<Link href={`/${locale}/admin/events/division-setup`}>
											<div
												className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
													pathName === `/${locale}/admin/events/division-setup`
														? "bg-[#f2f2f2]"
														: "bg-transparent"
												}  px-1 py-3 cursor-pointer`}
											>
												<CgListTree className="text-brandDs w-5 h-5" />{" "}
												<h1>Division Setup </h1>
											</div>
										</Link>
									</div>
								) : null}
							</div>
							<div>
								<div
									onClick={() => handleToggle(5)}
									className="flex justify-between items-center gap-3 hover:font-bold hover:cursor-pointer group"
								>
									<div
										className={`flex items-center gap-3 ${
											openIndex === 5 && "font-bold"
										}`}
									>
										<RiClipboardFill className="text-brandDs w-5 h-5" />
										<h1>Users</h1>
									</div>
									{openIndex === 5 ? (
										<IoIosArrowDown className="text-brandDs" />
									) : (
										<IoIosArrowForward className="group-hover:text-brandDs" />
									)}
								</div>
								{openIndex === 5 ? (
									<div className="mt-4 flex flex-col gap-3 text-sm text-[#444444] animation">
										<Link href={`/${locale}/admin/users/user-list`}>
											<div
												className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
													pathName === `/${locale}/admin/users/user-list`
														? "bg-[#f2f2f2]"
														: "bg-transparent"
												}  px-1 py-3 cursor-pointer`}
											>
												<CgListTree className="text-brandDs w-5 h-5" />{" "}
												<h1>User List</h1>
											</div>
										</Link>
										
									</div>
								) : null}
							</div>
							<div>
								<div
									onClick={() => handleToggle(6)}
									className="flex justify-between items-center gap-3 hover:font-bold hover:cursor-pointer group"
								>
									<div
										className={`flex items-center gap-3 ${
											openIndex === 6 && "font-bold"
										}`}
									>
										<RiClipboardFill className="text-brandDs w-5 h-5" />
										<h1>Sellers</h1>
									</div>
									{openIndex === 6 ? (
										<IoIosArrowDown className="text-brandDs" />
									) : (
										<IoIosArrowForward className="group-hover:text-brandDs" />
									)}
								</div>
								{openIndex === 6 ? (
									<div className="mt-4 flex flex-col gap-3 text-sm text-[#444444] animation">
										<Link href={`/${locale}/admin/seller/seller-list`}>
											<div
												className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
													pathName === `/${locale}/admin/seller/seller-list`
														? "bg-[#f2f2f2]"
														: "bg-transparent"
												}  px-1 py-3 cursor-pointer`}
											>
												<CgListTree className="text-brandDs w-5 h-5" />{" "}
												<h1>Seller List</h1>
											</div>
										</Link>
										
									</div>
								) : null}
							</div>
							<div>
								<div
									onClick={() => handleToggle(7)}
									className="flex justify-between items-center gap-3 hover:font-bold hover:cursor-pointer group"
								>
									<div
										className={`flex items-center gap-3 ${
											openIndex === 7 && "font-bold"
										}`}
									>
										<RiClipboardFill className="text-brandDs w-5 h-5" />
										<h1>Courses</h1>
									</div>
									{openIndex === 7 ? (
										<IoIosArrowDown className="text-brandDs" />
									) : (
										<IoIosArrowForward className="group-hover:text-brandDs" />
									)}
								</div>
								{openIndex === 7 ? (
									<div className="mt-4 flex flex-col gap-3 text-sm text-[#444444] animation">
										<Link href={`/${locale}/admin/course/course-provider`}>
											<div
												className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
													pathName === `/${locale}/admin/course/course-provider`
														? "bg-[#f2f2f2]"
														: "bg-transparent"
												}  px-1 py-3 cursor-pointer`}
											>
												<CgListTree className="text-brandDs w-5 h-5" />{" "}
												<h1>Course Provider</h1>
											</div>
										</Link>
										<Link href={`/${locale}/admin/course/students`}>
											<div
												className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
													pathName === `/${locale}/admin/course/students`
														? "bg-[#f2f2f2]"
														: "bg-transparent"
												}  px-1 py-3 cursor-pointer`}
											>
												<CgListTree className="text-brandDs w-5 h-5" />{" "}
												<h1>Students</h1>
											</div>
										</Link>
									</div>
								) : null}
							</div>
							<div>
								<div
									onClick={() => handleToggle(8)}
									className="flex justify-between items-center gap-3 hover:font-bold hover:cursor-pointer group"
								>
									<div
										className={`flex items-center gap-3 ${
											openIndex === 8 && "font-bold"
										}`}
									>
										<RiClipboardFill className="text-brandDs w-5 h-5" />
										<h1>Job Provider</h1>
									</div>
									{openIndex === 8 ? (
										<IoIosArrowDown className="text-brandDs" />
									) : (
										<IoIosArrowForward className="group-hover:text-brandDs" />
									)}
								</div>
								{openIndex === 8 ? (
									<div className="mt-4 flex flex-col gap-3 text-sm text-[#444444] animation">
										<Link href={`/${locale}/admin/job/job-provider`}>
											<div
												className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
													pathName === `/${locale}/admin/job/job-provider`
														? "bg-[#f2f2f2]"
														: "bg-transparent"
												}  px-1 py-3 cursor-pointer`}
											>
												<CgListTree className="text-brandDs w-5 h-5" />{" "}
												<h1>Job Provider</h1>
											</div>
										</Link>
									</div>
								) : null}
							</div>
							<div>
								<div
									onClick={() => handleToggle(9)}
									className="flex justify-between items-center gap-3 hover:font-bold hover:cursor-pointer group"
								>
									<div
										className={`flex items-center gap-3 ${
											openIndex === 9 && "font-bold"
										}`}
									>
										<RiClipboardFill className="text-brandDs w-5 h-5" />
										<h1>Organizer</h1>
									</div>
									{openIndex === 9 ? (
										<IoIosArrowDown className="text-brandDs" />
									) : (
										<IoIosArrowForward className="group-hover:text-brandDs" />
									)}
								</div>
								{openIndex === 9 ? (
									<div className="mt-4 flex flex-col gap-3 text-sm text-[#444444] animation">
										<Link href={`/${locale}/admin/organizer/organizer-provider`}>
											<div
												className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
													pathName === `/${locale}/admin/organizer/organizer-provider`
														? "bg-[#f2f2f2]"
														: "bg-transparent"
												}  px-1 py-3 cursor-pointer`}
											>
												<CgListTree className="text-brandDs w-5 h-5" />{" "}
												<h1>Organizer Provider</h1>
											</div>
										</Link>
									</div>
								) : null}
							</div>
							<div>
								<div
									onClick={() => handleToggle(10)}
									className="flex justify-between items-center gap-3 hover:font-bold hover:cursor-pointer group"
								>
									<div
										className={`flex items-center gap-3 ${
											openIndex === 10 && "font-bold"
										}`}
									>
										<RiClipboardFill className="text-brandDs w-5 h-5" />
										<h1>Blogs</h1>
									</div>
									{openIndex === 10 ? (
										<IoIosArrowDown className="text-brandDs" />
									) : (
										<IoIosArrowForward className="group-hover:text-brandDs" />
									)}
								</div>
								{openIndex === 10 ? (
									<div className="mt-4 flex flex-col gap-3 text-sm text-[#444444] animation">
										<Link href={`/${locale}/admin/blogs/blog-list`}>
											<div
												className={`flex items-center gap-3 hover:bg-[#F2F2F2] ${
													pathName === `/${locale}/admin/blogs/blog-list`
														? "bg-[#f2f2f2]"
														: "bg-transparent"
												}  px-1 py-3 cursor-pointer`}
											>
												<CgListTree className="text-brandDs w-5 h-5" />{" "}
												<h1>Blogs List</h1>
											</div>
										</Link>
									</div>
								) : null}
							</div>
						</div>
					</main>
				</aside>
			</section>
		</>
	);
};

export default Sidebar;
