import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CourseLoader = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[300px] w-[300px] rounded-xl bg-gray-100" />
        </div>
    );
};

export default CourseLoader;
