"use client"
import { getCourseLessons, getCourseLessonById, getCourseDetailsById } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { IoPlayOutline } from "react-icons/io5";
import ReactPlayer from "react-player";
import { useParams } from 'next/navigation';


interface ICourseLesson {
  session_pid: string;
  course_pid: string;
  providor_pid: string | null;
  session_title: string;
  session_description: string;
  video_code: string;
  video_url: string;
}
const Video = () => {
  const {id} = useParams()
  const [selectedId, setSelectedId] = useState<null | string>(null);
  const { isLoading, error, data: courseLessonData } = useQuery({
    queryKey: ["CourseLessons"],
    queryFn: () => getCourseLessons(Array.isArray(id) ? id[0] : id),
    enabled: !!id,
  });
  const { data: courseData, isLoading: isAppLoading } = useQuery({
    queryKey: ["getCourseLessonById", selectedId],
    queryFn: () => getCourseLessonById(selectedId),
    enabled: !!selectedId,
  });
  const { data } = useQuery({
    queryKey: ["CourseDetails"],
    queryFn: () => getCourseDetailsById(Array.isArray(id) ? id[0] : id),
    enabled: !!id,
  });
  useEffect(() => {
    if (courseLessonData && courseLessonData.length > 0) {
      setSelectedId(courseLessonData[0].session_pid); 
    }
  }, [courseLessonData]);

  const handleClick = (id: string) => {
    // console.log("id->", id)
    setSelectedId(id);
  };
  // console.log("courseData->", courseData)
  const loading = isLoading ||  isAppLoading
  // console.log(loading)
  return (
    <div className="bg-white">
      <div className="container mx-auto grid grid-cols-4 gap-8 py-8">
        <div className="col-span-3 h-96 flex flex-col gap-2 w-full">
          <div className="w-full text-start font-bold text-xl">
            {data?.course_title||"Title"}
          </div>
          {loading ? <div className="w-full h-96  animate-pulse bg-slate-50"> </div> : <div className="flex-1 w-full h-96 overflow-hidden rounded-[10px] relative">
            {courseData && courseData[0] && <ReactPlayer url={courseData[0]?.video_url} controls width="100%" height="100%" />}
          </div>}
        </div>

        <div className="col-span-1 w-full h-96 rounded-[10px] flex flex-col border-[0.5px] border-[#252525] mb-1">
          <div className="w-full p-3 bg-brandLsSecondary rounded-t-[10px]">
            Lessons
          </div>
          <div className="flex-1 flex flex-col w-full  overflow-hidden overflow-y-scroll ">
            {courseLessonData?.map((course: ICourseLesson, index: number) => {
              return (
                <div
                  className="flex w-full items-start gap-2  p-2 hover:bg-brandLsSecondary"
                  key={index}
                  onClick={() => handleClick(course?.session_pid) }
                >
                  <p>{index + 1}.</p>
                  <div className="flex-1">{course.session_title}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
