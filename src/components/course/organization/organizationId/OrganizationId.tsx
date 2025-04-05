"use client";
import Image from "next/image";
import OrgCourseCard from "./OrgCourseCard";
import { useParams } from "next/navigation";
import CourseCard from "../../courseCategory/CourseCard";
import { useQuery } from "@tanstack/react-query";
import { fetchData, getCourseProviderInfoById, getCoursesByProviderId } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";

const OrganizationId = () => {
	const params = useParams();
	const { id } = params;
	// const userId = cookies.get("user_pid");
	const { isLoading: providerIsLoading, data: providerData, error: providerError } = useQuery({
		queryKey: ["getCourseProviderInfoById", id],
		queryFn: () => fetchData(`admin/provider-details/${id}`),
	});
	// console.log("providerData", providerData)
	const { isLoading: courseIsLoading, error: courseError, data: providerCourses, refetch } = useQuery({
		queryKey: ["getCoursesByProviderId", id],
		queryFn: () => getCoursesByProviderId(id as string),
	});

	return (
		<div className="">
			<div className="bg-[#006A4D]">
				<div className="container">
					<div className="flex justify-between py-10 px-4 items-center">
						<div className="flex gap-4">
							<div className="bg-white  w-36 h-36  rounded-full flex justify-center items-center border-4 border-[#763B90] overflow-hidden">
								<Image
									src={`/assets/images/course/organization/mentor.jpg`}
									width={100}
									height={100}
									alt="organization logo"
									className="w-full h-full"
									priority
								/>
							</div>
							<div className="flex items-center">
								<div className="text-white flex flex-col gap-0.5">
									<p className="text-5xl font-bold ">Mehedi Hasan</p>
									<p className="text-2xl pl-0.5">E-Learning Providers</p>
									<p className="pl-0.5">12 Courses</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container py-16 ">
				{courseIsLoading ? (
					<div className="flex items-center justify-center">
						<ScaleLoader color="#421957" height={70} radius={8} width={10} />
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						{providerCourses.map((course: any) => (
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

export default OrganizationId;
