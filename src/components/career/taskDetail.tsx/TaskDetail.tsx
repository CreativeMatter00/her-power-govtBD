"use client";

import { getTaskDetailById } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { FaRegClock } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import ScaleLoader from "react-spinners/ScaleLoader";

const TaskDetail = () => {
	const t = useTranslations("career");

	const param = useParams();
	// console.log(param.id);

	// =========== DATA FETCHING =========

	const { isLoading, data, error } = useQuery({
		queryKey: ["getJobDetailById", param.id],
		queryFn: ({ queryKey }) => getTaskDetailById(queryKey[1] as string),
	});

	// console.log(data);

	if (error)
		return (
			<div className="text-center text-xl font-md py-8">
				{t("Something_went_wrong")}
			</div>
		);

	return (
		<div className="container p-4 flex flex-col gap-5">
			{isLoading ? (
				<div className="flex items-center justify-center">
					<ScaleLoader color="#421957" height={70} radius={8} width={10} />
				</div>
			) : (
				<div className="py-4 overflow-hidden break-words">
					<p className="text-black text-2xl font-bold">{data.jobtitle}</p>
					<div className="py-4 overflow-hidden">
						<p dangerouslySetInnerHTML={{ __html: data.jobdescription }}></p>
					</div>

					<div className="flex gap-4 text-[#252525] max-md:flex-col items-start">
						<div className="flex gap-1 text-xl font-bold justify-center items-center ">
							{" "}
							<FaRegClock color="#252525" /> {data.duration}{" "}
						</div>
						<div className="flex gap-1 text-xl font-bold justify-center items-center ">
							{" "}
							<FiMail color="#252525" /> {data.email}{" "}
						</div>
					</div>
					<p className="text-base text-black py-2">{data.remarks}</p>
				</div>
			)}
		</div>
	);
};

export default TaskDetail;
