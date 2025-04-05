"use client";

import { useQuery } from "@tanstack/react-query";
import { getStudentEnrolledCourse } from "@/api/api";
import { useCookies } from "next-client-cookies";
import CourseCard from "../../courseCategory/CourseCard";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTranslations } from "next-intl";

const StudentCourse = () => {
	const t=useTranslations("course")
	const cookies = useCookies();
	const student_pid = cookies.get("student_pid");
	const { isLoading, error, data } = useQuery({
		queryKey: ["getStudentEnrolledCourse"],
		queryFn: () => getStudentEnrolledCourse(student_pid as string),
	});

	// console.log("data", data);

	if (error)
		return (
			<div className="text-center text-xl font-md py-8">
				{t("Something went wrong. Please reload")}
			</div>
		);

	return (
		<div className="container px-4">
			<p className="text-3xl font-bold mb-6">{t("Enrolled Courses")}</p>
			{isLoading ? (
				<div className="flex items-center justify-center">
					<ScaleLoader color="#421957" height={70} radius={8} width={10} />
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{data?.data?.map((course: any, index: number) => (
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
	);
};

export default StudentCourse;
