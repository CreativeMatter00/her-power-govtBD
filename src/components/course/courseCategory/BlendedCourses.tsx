"use client";

import Image from "next/image";
import CourseCard from "./CourseCard";
import { useQuery } from "@tanstack/react-query";
import { getBlendedCourses } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import CourseLoader from "@/components/shared/loader/CourseLoader";
import { useTranslations } from "next-intl";

const BlendedCourses = () => {
	const { isLoading, error, data } = useQuery({
		queryKey: ["getBlendedCourses"],
		queryFn: () => getBlendedCourses(),
	});
	const t = useTranslations("BlendedCourse");

	if (error)
		return (
			<div className="text-center text-xl font-md py-8">
				Something went wrong. Please reload
			</div>
		);

	return (
		<div className="container px-4  py-12">
			<div className="flex flex-col md:flex-row bg-[#006A4D] text-white rounded-lg justify-between p-8 gap-4">
				<div className="relative w-full overflow-hidden">
					<div
						className="bg-cover"
						style={{
							backgroundImage:
								"url('/assets/images/course/course details/Smart Bangladesh Map.png')",
							height: "400px",
							width: "400px",
						}}
					></div>
					<div className="absolute top-0 w-full">
						<p className="text-6xl font-bold mb-4 max-md:text-4xl">
							{t("heroTitle")} <br/> {t("heroTitle2")} 
						</p>
						{/* <button className="text-white py-2 px-8 rounded-[40px]  bg-[#00A24B] text-lg font-medium w-fit border border-[#00A24B] hover:bg-transparent hover:border-white">
              Enroll Now
            </button> */}
					</div>
				</div>

				<div className="md:w-1/2 flex justify-end items-center relative  max-lg:hidden">
					<Image
						height={416}
						width={416}
						className="h-[400px] w-[400px] lg:content-end rounded-xl "
						src={`/assets/images/course/course details/laptop-table her power.jpg`}
						alt="A computer background"
					/>
					<Image
						height={46}
						width={85}
						className="h-[46px] w-[85px] lg:content-end rounded-xl absolute top-2 right-4"
						src={`/assets/images/course/ICT Logo.png`}
						alt="A computer background"
					/>
				</div>
			</div>

			<div className="text-justify my-8  font-medium">
			{t("description")}
			</div>

			<div className="my-12">
				<p className="text-3xl font-bold mb-6">{t("courses")}</p>
				{isLoading ? (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{Array.from({ length: 8 }).map((_, index) => (
							<div key={index} className="mx-auto">
								<CourseLoader />
							</div>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{data.data.map((course: any) => (
							<CourseCard
								key={course.course_pid}
								id={course.course_pid}
								title={course.course_title}
								image={course.thumbnail}
								providerName={course.providor_name}
								providerId={course.providor_pid}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default BlendedCourses;
