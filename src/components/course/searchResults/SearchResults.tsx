"use client";

import { getSearchedCourses } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import ScaleLoader from "react-spinners/ScaleLoader";
import CourseCard from "../courseCategory/CourseCard";
import SearchCourse from "../SearchCourse";

const SearchResults = () => {
	const searchParams = useSearchParams();

	const search = searchParams.get("searchQuery");

	const { isLoading, data, error } = useQuery({
		queryKey: ["searchEvents", search],
		queryFn: ({ queryKey }) => getSearchedCourses(queryKey[1] as string),
	});

	// console.log("data", data);

	if (error)
		return (
			<div className="text-center text-xl font-md py-8">
				Something went wrong. Please reload
			</div>
		);

	return (
		<div className="container mx-auto">
			<SearchCourse/>
			<div className="pb-2 border-b border-brandLsPrimary">
				Showing results for : {search}
			</div>
			{isLoading ? (
				<div className="flex items-center justify-center">
					<ScaleLoader color="#421957" height={70} radius={8} width={10} />
				</div>
			) : (
				<div className="py-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{data.map((course: any) => (
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
				</div>
			)}
		</div>
	);
};

export default SearchResults;
