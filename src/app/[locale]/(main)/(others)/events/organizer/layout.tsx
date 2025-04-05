import DashboardSidebar from "@/components/ui/DashboardSidebar/DashboardSidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="container p-4">
			<main className="flex items-start gap-6 w-full">
				<DashboardSidebar />

				<div className="basis-full mt-16">{children}</div>
			</main>
		</div>
	);
};

export default layout;
