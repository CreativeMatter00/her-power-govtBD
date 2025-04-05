import Image from "next/image";
// ---------------- REACT ICONS ---------------
import { IoBookOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
// -------------- FOR SHADOW --------------------
import styles from "@/styles/CourseAdmin.module.css";

const Overview = () => {
	// -------------------------- ARRAY OF STATIC OBJECTS ----------------
	const overviews = [
		{
			overViewTitle: "Today Course Sales",
			tkIcon: "assets/images/course/course admin/tk-icon.png",
			amount: "15,000",
			overviewIconImage: null,
			overviewIcon: <IoBookOutline className="text-[#59187B] w-6 h-6" />,
			iconBG: "brandLsPrimary",
		},
		{
			overViewTitle: "Total Sales This Month",
			tkIcon: "assets/images/course/course admin/tk-icon.png",
			amount: "85,550",
			overviewIconImage: "assets/images/course/course admin/total-sales.png",
			overviewIcon: null,
			iconBG: "warning",
		},
		{
			overViewTitle: "Total Video Upload",
			tkIcon: null,
			amount: "35",
			overviewIconImage: null,
			overviewIcon: <IoVideocamOutline className="text-[#59187B] w-6 h-6" />,
			iconBG: "brandLsPrimary",
		},
		{
			overViewTitle: "Total Revenue",
			tkIcon: "assets/images/course/course admin/tk-icon.png",
			amount: "6,47,500",
			overviewIconImage: "assets/images/course/course admin/revenue.png",
			overviewIcon: null,
			// iconBg: "#b5dca3",
			iconBG: "success",
		},
	];
	return (
		<>
			<section className="my-4">
				{/* --------------------------- TITLE --------------- */}
				<h1 className="text-brandDs font-bold text-xl">Dashboard Overview</h1>

				{/* --------------------------- OVERVIEW CARDS --------------- */}
				<main className="mt-2">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
						{overviews.map((overview, index) => (
							// ======================== OVERVIEW CARD ===========================
							<div
								key={index}
								className={`basis-full bg-[#FEFCFF] px-2 lg:px-5 py-3 border-2 border-brandLsPrimary ${styles.dashboardCard} rounded-xl`}
							>
								<div className="flex flex-col lg:gap-2 justify-center">
									{/* ================ OVERVIEW TITLE ================ */}
									<div>
										<h1 className="text-sm lg:text-base font-bold text-[#a5a5a5]">
											{overview.overViewTitle}
										</h1>
									</div>

									{/* ======================== AMOUNT, ICONS ===================== */}
									<div className="flex justify-between items-center mt-4">
										<div className="flex items-center gap-2">
											{/* ---------------- TK ICON IMAGE -------------------- */}
											{overview?.tkIcon && (
												<Image
													src={`/${overview.tkIcon}`}
													alt=""
													width={20}
													height={26}
													className="w-auto h-6"
												/>
											)}
											{/* ======================= AMOUNT ================== */}
											<p className="text-xl lg:text-4xl text-brandPrimary font-normal">
												{overview.amount}
											</p>
										</div>

										{/* ================ BOTTOM RIGHT SIDE ICON ================= */}
										<div>
											{/* <div className="bg-[#b5dca3] rounded-full p-3">
												{overview.overViewTitle === "Total Video Upload" && (
													<IoVideocamOutline fontSize={24} />
												)}
												{overview.overViewTitle === "Today Course Sales" && (
													<IoBookOutline fontSize={24} />
												)}
												{overview.overViewTitle ===
													"Total Sales This Month" && (
													<Image
														src={`/assets/images/course/course admin/total-sales.png`}
														alt=""
														width={20}
														height={26}
														className="w-auto h-6"
													/>
												)}
												{overview.overViewTitle === "Total Revenue" && (
													<Image
														src={`/assets/images/course/course admin/revenue.png`}
														alt=""
														width={20}
														height={26}
														className="w-auto h-6"
													/>
												)}
											</div> */}
											<div
												className={`bg-${overview.iconBG} flex items-center justify-center rounded-full w-10 h-10 `}
											>
												{overview?.overviewIconImage ? (
													<Image
														src={`/${overview.overviewIconImage}`}
														alt=""
														width={22}
														height={22}
														className={`w-auto h-6`}
													/>
												) : (
													overview?.overviewIcon && (
														<p>{overview.overviewIcon}</p>
													)
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</main>
			</section>
		</>
	);
};

export default Overview;
