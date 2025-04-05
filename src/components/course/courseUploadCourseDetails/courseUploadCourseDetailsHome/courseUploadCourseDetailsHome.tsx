"use client"
import CourseUploadDashboard from "../CourseUploadDashboard";
import CourseUploadHero from "./CourseUploadHero";
import CourseUploadHistoryList from "./CourseUploadHistoryList";
import AddToNewLesson from './AddToNewLesson';
import { useQuery } from "@tanstack/react-query";
import { getCourseDetailsById } from "@/api/api";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const CourseUploadCourseDetailsHome = () => {
  const t = useTranslations("resources_Library");
  const {id} = useParams()
  const { isLoading, error, data } = useQuery({
    queryKey: ["CourseDetails"],
    queryFn: () => getCourseDetailsById(Array.isArray(id) ? id[0] : id),
    enabled: !!id,
  });
  return (
    <div>
        <div className="flex justify-center py-10 container">
            <p className="text-[#763B90] text-3xl font-bold">{data?.course_title||"Title"}</p>
        </div>
        <div className="container">
            <AddToNewLesson/>
            <h1 className="text-[20px] font-bold text-[#763B90] mt-[61px]">{t("Dashboard Overview")}</h1>
            <CourseUploadDashboard/>
            <CourseUploadHistoryList/>
        </div>
    </div>
  );
};
export default CourseUploadCourseDetailsHome;
