import CourseNavbar from "@/components/ui/courseNavbar/CourseNavbar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="">
			<CourseNavbar />
			<div className="pt-[46px]"> </div>
			<div>{children}</div>
		</div>
	);
};

export default layout;
