import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CareerLoader = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[350px] w-full rounded-xl bg-gray-100" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[350px] bg-gray-100" />
            </div>
        </div>
    );
};

export default CareerLoader;
