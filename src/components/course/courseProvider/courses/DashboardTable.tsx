"use client";

import { api, getCoursesByProviderId } from "@/api/api";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { MdOutlineEdit, MdRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import ScaleLoader from "react-spinners/ScaleLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisteredStudentTable from "./RegisteredStudentTable";

const DashboardTable = () => {
	const t=useTranslations("course")
	const cookies = useCookies();
	const providerId = cookies.get("providor_pid");
	const locale = useLocale();
	const pathName = usePathname();
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [selectedStudentId,setSelectedStudentId]=useState("");
	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["getCoursesByProviderId"],
		queryFn: () => getCoursesByProviderId(providerId as string),
	});

	const handleRemove = async (id: string) => {
		// console.log("remove", id)
		const response = await api.delete(`/api/admin/course/${id}`)
		if (response?.data.meta.status) {
			toast.success("Course deleted successfully!", {
				position: "bottom-left",
				autoClose: 3001,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			refetch();
		}
	}

	if (error)
		return (
			<div className="text-center text-xl font-md py-8">
				Something went wrong. Please reload
			</div>
		);

	return (
		<>
			<section className="">
				{/* ====================== COURSE HISTORY TABLE TITLE ==================== */}
				<h1 className="font-bold text-base text-brandDs py-4">
					{t("Uploaded Courses")}
				</h1>
				{isLoading ? (
					<div className="flex items-center justify-center">
						<ScaleLoader color="#421957" height={70} radius={8} width={10} />
					</div>
				) : data?.length === 0 ? (
					<div className="text-center py-5 text-gray-500">
						{t("This provider has not uploaded any course yet")}
					</div>
				) : (
					<div className="w-full">
						<table className="w-full text-base">
							{/* =================== ALL COLUMNS OF TABLE ======================= */}
							<thead>
								<tr className="text-[#a5a5a5] font-normal space-x-3">
									<th className="border-b py-3">{t("SL")}</th>
									<th className="border-b py-3">{t("Course Type")}</th>
									<th className="border-b py-3">{t("Course Name")}</th>
									<th className="border-b py-3">{t("Thumbnail")}</th>
									<th className="border-b py-3">{t("Edit")}</th>
									<th className="border-b py-3">{t("View Students")}</th>
									<th className="border-b py-3">{t("Upload")}</th>
									<th className="border-b py-3">{t("Delete")}</th>
								</tr>
							</thead>
							<tbody>
								{data.map((course: any, index: number) => (
									<tr
										key={index}
										className="text-base text-brandPrimary border-b border-brandLsPrimary"
									>
										<td className="text-center py-3">{course.course_pid}</td>
										<td className="text-base text-center py-3">
											{course.course_type}
										</td>
										<td className="text-base text-center py-3">
											{course.course_title}
										</td>
										<td className="text-base text-center py-3">
											<Image
												src={course.thumbnail}
												alt="course"
												width="200"
												height="100"
												className="w-[200px] h-auto"
											/>
										</td>
										<td className="py-3">
											<div className="flex justify-center items-center">
												<Link
													// href={`/${locale}/course/course-provider/edit-course/${course?.course_pid}`}
													href={{ pathname: `/${locale}/course/course-provider/edit-course/${course?.course_pid}`, query: { redirect: pathName } }}
												>
													<div className="flex justify-center items-center rounded-md h-8 w-10 bg-warning">
														<MdOutlineEdit className="w-6 h-6 text-brandLsPrimary cursor-pointer" />
													</div>
												</Link>
											</div>
										</td>
										<td className="py-3">
											<div className="flex justify-center items-center">
												<div onClick={() =>{ setIsDialogOpen(!isDialogOpen); setSelectedStudentId(course?.course_pid)}} className="flex justify-center items-center rounded-md h-8 w-10 bg-success">
													<MdRemoveRedEye className="w-6 h-6 text-brandLsPrimary cursor-pointer" />
												</div>
											</div>
										</td>
										<td className="py-3">
											<div className="flex justify-center items-center">
											<Link
													href={`/${locale}/course-upload-course-details/${course?.course_pid}`}
												>
												<div className="flex justify-center items-center rounded-md h-8 w-10 bg-rose-500">
													<FaUpload className="w-6 h-6 text-brandLsPrimary cursor-pointer" />
												</div>
													
												</Link>
											</div>
										</td>
										<td className="py-3">
											<div className="flex justify-center items-center">
												<div
													onClick={() => handleRemove(course?.course_pid)}
													className="flex justify-center items-center rounded-md h-8 w-10 bg-dangerSecondary">
													<RiDeleteBin6Line className="w-6 h-6 text-brandLsPrimary cursor-pointer" />
												</div>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogContent className="w-[80vw] bg-white h-auto  max-h-[80vw] overflow-hidden overflow-y-scroll">

						<RegisteredStudentTable id={selectedStudentId} />

					</DialogContent>
				</Dialog>
				<ToastContainer />
			</section>
		</>
	);
};

export default DashboardTable;
