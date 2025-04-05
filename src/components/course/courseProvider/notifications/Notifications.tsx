import Image from "next/image";
// ------------------ REACT ICONS ----------------------------
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";

const Notifications = () => {
	// ------------ ARRAY OF OBJECTS OF STATIC DATA -----------
	const notifications = [
		{
			date: "Today",
			singleNotifications: [
				{
					profilePhoto: "/assets/images/course/course admin/proPic1.png",
					status: "Natasha Tasnim follow you",
					time: "30min",
				},
				{
					profilePhoto: "/assets/images/course/course admin/proPic2.png",
					status: "Your video have been uploaded",
					time: "4h",
				},
				{
					profilePhoto: "/assets/images/course/course admin/proPic3.png",
					status: "Afia Zaman buy IELTS Live Batch",
					time: "5h 11min",
				},
			],
		},
		{
			date: "Yesterday",
			singleNotifications: [
				{
					profilePhoto: "/assets/images/course/course admin/proPic1.png",
					status: "Natasha Tasnim follow you",
					time: "30min",
				},
				{
					profilePhoto: "/assets/images/course/course admin/proPic2.png",
					status: "Your video have been uploaded",
					time: "4h",
				},
				{
					profilePhoto: "/assets/images/course/course admin/proPic3.png",
					status: "Afia Zaman buy IELTS Live Batch",
					time: "5h 11min",
				},
			],
		},
	];
	return (
		<>
			<section className="bg-brandLsSecondary">
				<main className="container p-4">
					<div>
						{notifications.map((notification, index) => (
							<div key={index}>
								{/* -------------- NOTIFICATION DATE ------------------- */}
								<h1 className="font-bold text-base text-black my-6">
									{notification.date}
								</h1>
								{/* ----------------- ALL NOTIFICATION OF A PARTICULAR DATE ------------- */}
								<div>
									{notification.singleNotifications.map(
										(signgleNotification, index) => (
											<div
												key={index}
												className="border border-[#e3dee4] flex justify-between items-center px-1 md:px-4 py-2"
											>
												{/* ------------- left side --------------- */}
												<div className="flex items-center gap-2 md:gap-4">
													{/* --------------- PRIFILE IMAGE ---------------- */}
													<Image
														src={signgleNotification.profilePhoto}
														alt="profile picture"
														width={40}
														height={40}
														className="w-6 md:w-10 h-6 md:h-10 rounded-full border border-brandPrimary"
													/>
													{/* ------------ NOTIFICATION STATUS ------------- */}
													<p className="font-bold text-sm md:text-lg text-[#252525]">
														{signgleNotification.status}
													</p>
												</div>
												{/* ---------------- right side ------------------- */}
												<div className="flex items-center gap-1 md:gap-4">
													{/* ----------------- TIME --------------------- */}
													<p className="font-normal text-[10px] md:text-sm">
														{signgleNotification.time}
													</p>
													<button>
														{/* -------------- HORIZONTAL 3 DOTS BUTTON ------------------------*/}
														<BsThreeDots className="border border-[#252525] w-5 h-5 rounded-full hidden md:block " />
														{/* -------------------- VERTICAL 3 DOTS BUTTON ---------------------- */}
														<BsThreeDotsVertical className="w-3 md:w-5 h-3 md:h-5 block md:hidden" />
													</button>
												</div>
											</div>
										)
									)}
								</div>
							</div>
						))}
					</div>
				</main>
			</section>
		</>
	);
};

export default Notifications;
