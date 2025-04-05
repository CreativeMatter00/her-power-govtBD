import React from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "@/styles/Events.module.css";
import { formattedDateOrTime } from "@/hooks/formattedDateOrTime";
import axios from "axios";
import { url } from "@/api/api";
import { useLocale } from "next-intl";
import Link from "next/link";
import { toast } from "react-toastify";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

// Updated path if needed

interface EventInfoType {
	event_title: string;
	status: string;
	start_datetime: string;
	eventPlace: string;
	event_pid: string;
}

interface Props {
	allEvents: EventInfoType[];
	refetchEvents: () => void;
}

const DashboardTable: React.FC<Props> = ({ allEvents, refetchEvents }) => {
	const locale = useLocale();

	const handleDeleteEvent = async (id: string) => {
		try {
			const response = await axios.delete(
				`${url}/api/admin/event/newEvent/${id}`
			);

			if (response?.data?.status === true) {
				toast.success("Event deleted successfully", {
					position: "bottom-left",
					autoClose: 3000,
				});
				refetchEvents();
			} else {
				toast.error("Failed to delete. Please try again.", {
					position: "bottom-left",
					autoClose: 3000,
				});
			}
		} catch (error) {
			console.error("Error deleting event:", error);
			toast.error("An error occurred. Please try again.", {
				position: "bottom-left",
				autoClose: 3000,
			});
		}
	};

	return (
		<>
			<section className="w-full my-8">
				<table className="w-full">
					<thead>
						<tr className="border-b border-brandLsPrimary mt-4 w-full text-start text-base text-greyPrimary">
							<th className="py-2 text-start">SL No.</th>
							<th className="py-2 text-start">Event Info</th>
							<th className="py-2 text-start">Edit</th>
							<th className="py-2 text-start">Delete</th>
							<th className="py-2 text-start">Action</th>
						</tr>
					</thead>
					<tbody className="my-8 text-brandPrimary">
						{allEvents?.map((event, index) => (
							<tr key={index} className="border-b border-brandLsPrimary">
								<td className="content-start py-4">
									<div className="text-base">{index + 1}</div>
								</td>
								<td className="content-start py-4">
									<div className="flex flex-col gap-8">
										<div className="flex flex-col gap-3">
											<h1 className="text-base font-bold">
												{event.event_title}
											</h1>
											<p>
												<span className="text-sm">Status:</span> &nbsp;
												<span
													className={`text-base ${event.status === "Coming up"
														? "text-link"
														: " text-greyPrimary"
														}`}
												>
													{event.status}
												</span>
											</p>
										</div>
										<div className="flex flex-col gap-3">
											<p>
												<span className="text-sm">Date:</span>{" "}
												<span className="text-base">
													{formattedDateOrTime(event.start_datetime, "date")}
												</span>
											</p>
										</div>
									</div>
								</td>
								<td className="py-4 content-start">
									<button
										className={`bg-warning w-fit px-4 py-3 rounded-md ${styles.tableEditButtonShadow}`}
									>
										<GrEdit className="text-brandLsPrimary h-5 w-5" />
									</button>
								</td>
								<td className="py-4 content-start">


									<AlertDialog>
										<AlertDialogTrigger asChild>
											<button
												className={`bg-dangerPrimary px-4 py-3 rounded-md ${styles.tableDeleteButtonShadow}`}

											>
												<RiDeleteBin6Line className="text-brandLsPrimary h-5 w-5" />
											</button>
										</AlertDialogTrigger>
										<AlertDialogContent className="bg-white">
											<AlertDialogHeader>
												<AlertDialogTitle>
													Confirm Remove
												</AlertDialogTitle>
												<AlertDialogDescription>
													Are you sure you want to remove this Job? Once
													confirmed, this action cannot be undone.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => handleDeleteEvent(event.event_pid)}
													className="bg-brandDs text-brandLsPrimary"
												>
													Confirm
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</td>
								<td className="py-4 content-start">
									<Link
										href={`/${locale}/events/event/${event.event_pid}`}
										className="text-base text-link font-normal hover:underline underline-offset-2 decoration-2 mt-2.5"
									>
										View event
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</>
	);
};

export default DashboardTable;
