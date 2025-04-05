import { useTranslations } from "next-intl";
import SearchCourse from "../SearchCourse";
import CourseCatCard from "./CourseCatCard";
import CourseHero from "./CourseHero";

const CourseCategory = () => {
	const t = useTranslations("courses");
	return (
		<div className="pb-6 w-full">
			<CourseHero />

			<SearchCourse />

			<div className="transition-opacity duration-300 ease-in-out py-10 container">
				<div className="grid p-4 xl:gap-20 lg:gap-12 gap-8 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
					<CourseCatCard
						category="online-courses"
						img="/assets/images/course/category/Online Courses.png"
						courseName={t("onlineCourses")}
					/>
					<CourseCatCard
						category="physical-courses"
						img="/assets/images/course/category/Physical Courses.png"
						courseName={t("physicalCourses")}
					/>
					<CourseCatCard
						category="blended-courses"
						img="/assets/images/course/category/Blended Courses.png"
						courseName={t("blendedCourses")}
					/>
				</div>
			</div>
		</div>
	);
};

export default CourseCategory;

// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import CourseCatCard from "./CourseCatCard";

// const CourseCategory = () => {
//   const [activeTab, setActiveTab] = useState("Running Courses");
//   return (
//     <div className="container py-6 border">
//       <div className="flex gap-6 transition-all">
//         <button
//           className={`text-center text-xl font-medium text-brandDs hover:underline underline-offset-8 duration-2 ${
//             activeTab === "Running Courses" && "underline"
//           }`}
//           onClick={() => setActiveTab("Running Courses")}
//         >
//           Running Courses
//         </button>

//         <button
//           className={`text-center text-xl font-medium text-brandDs hover:underline underline-offset-8 duration-2 ${
//             activeTab === "Upcoming Courses" && "underline"
//           }`}
//           onClick={() => setActiveTab("Upcoming Courses")}
//         >
//           Upcoming Courses
//         </button>

//         <button
//           className={`text-center text-xl font-medium text-brandDs hover:underline underline-offset-8 duration-2 ${
//             activeTab === "Company Wise" && "underline"
//           }`}
//           onClick={() => setActiveTab("Company Wise")}
//         >
//           Company Wise
//         </button>
//       </div>
//       <div className="transition-opacity duration-300 ease-in-out py-10">
//         {activeTab === "Running Courses" && (
//           <div className="flex p-4  justify-center items-center flex-wrap">
//             <CourseCatCard
//               img="/assets/images/course/govt.png"
//               courseName="courseName"
//             />
//             <CourseCatCard
//               img="/assets/images/course/govt.png"
//               courseName="courseName"
//             />
//             <CourseCatCard
//               img="/assets/images/course/govt.png"
//               courseName="courseName"
//             />
//             <CourseCatCard
//               img="/assets/images/course/govt.png"
//               courseName="courseName"
//             />
//             <CourseCatCard
//               img="/assets/images/course/govt.png"
//               courseName="courseName"
//             />
//             <CourseCatCard
//               img="/assets/images/course/govt.png"
//               courseName="courseName"
//             />
//             <CourseCatCard
//               img="/assets/images/course/govt.png"
//               courseName="courseName"
//             />
//             <CourseCatCard
//               img="/assets/images/course/govt.png"
//               courseName="courseName"
//             />
//           </div>
//         )}
//         {activeTab === "Upcoming Courses" && <div>Upcoming Courses</div>}
//         {activeTab === "Company Wise" && <div>Company Wise</div>}
//       </div>
//     </div>
//   );
// };

// export default CourseCategory;
