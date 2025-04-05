import MeetPartnerHeader from "@/components/ui/meetPartnerHeader/MeetPartnerHeader";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="">
			<MeetPartnerHeader />
			<div className="pt-[46px]"> </div>
			<div>{children}</div>
		</div>
	);
};

export default layout;
