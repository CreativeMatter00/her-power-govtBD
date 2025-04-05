// "use client";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "@/styles/Events.module.css";
import React from "react";

// ****************************************** EVENT INFORMATION TYPE DEFINITION **************************************
interface EventInfoType {
	eventTitle: string;
	eventStatus: string;
	eventDate: string;
	eventPlace: string;
}

// ********************************* PROPS TYPE DEFINITION =========================================
interface Props {
	allEvents: EventInfoType[];
}

const ArchiveTable: React.FC<Props> = ({ allEvents }) => {
	// console.log(allEvents);
	return (
		<>
			<section className="w-full my-8">
				<table className="w-full">
					<thead>
						{/* ====================================== COLUMN NAMES ======================================== */}
						<tr className="border-b border-brandLsPrimary mt-4 w-full text-start text-base text-greyPrimary">
							<th className="py-2 text-start">SL No.</th>
							<th className="py-2 text-start">Event Info</th>
							<th className="py-2 text-start">Edit</th>
							<th className="py-2 text-start">Delete</th>
							<th className="py-2 text-start">Action</th>
						</tr>
					</thead>

					<tbody className="my-8 text-brandPrimary">
						{allEvents.map((event, index) => (
							<tr key={index} className="border-b border-brandLsPrimary  ">
								{/* =============================================== COLUMN 1 INDEX ========================================= */}
								<td className="content-start py-4">
									<div className="text-base">{index + 1}</div>
								</td>
								{/* =============================================== COLUMN 2 EVENT'S INFO ====================================== */}
								<td className="content-start py-4">
									<div className="flex flex-col gap-8">
										<div className="flex flex-col gap-3">
											<h1 className="text-base font-bold">
												{/* ----------------- TITLE --------------------- */}
												{event.eventTitle}
											</h1>
											<p>
												<span className="text-sm">Status:</span> &nbsp;
												<span
													className={`text-base ${
														event.eventStatus === "Past"
															? "text-greyPrimary"
															: "text-link"
													}`}
												>
													{/* --------------------- STATUS ----------------- */}
													{event.eventStatus}
												</span>
											</p>
										</div>
										<div className="flex flex-col gap-3">
											<p>
												{/* ------------------------------ DATE ----------------------- */}
												<span className="text-sm">Date:</span>{" "}
												<span className="text-base">{event.eventDate}</span>
											</p>
											<p>
												{/* ---------------------------- LOCATION ------------------------- */}
												<span className="text-sm">Location:</span>{" "}
												<span className="text-base">{event.eventPlace}</span>
											</p>
										</div>
									</div>
								</td>
								{/* ================================================ COLUMN 3 ========================================== */}
								<td className="py-4 content-start">
									{/* ---------------------------------- DELETE BUTTON ------------------------ */}
									<button
										className={`bg-warning w-fit px-4 py-3 rounded-md ${styles.tableEditButtonShadow}`}
									>
										<GrEdit className="text-brandLsPrimary h-5 w-5" />
									</button>
								</td>
								{/* ================================================ COLUMN 4 ========================================== */}
								<td className="py-4 content-start">
									{/* ------------------------------------- EDIT BUTTON -------------------------- */}
									<button
										className={`bg-dangerPrimary px-4 py-3 rounded-md ${styles.tableDeleteButtonShadow}`}
									>
										<RiDeleteBin6Line className="text-brandLsPrimary h-5 w-5" />
									</button>
								</td>
								{/* ================================================ COLUMN 5 ========================================== */}
								<td className="py-4 content-start">
									{/* ------------------------------------- VIEW DETAILS ------------------------------ */}
									<div className="text-base text-link font-normal hover:underline underline-offset-2 decoration-2 mt-2.5">
										View event
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</>
	);
};

export default ArchiveTable;
