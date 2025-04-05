import EventHeader from "@/components/ui/eventHeader/EventHeader";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<EventHeader />
			{children}
		</div>
	);
};

export default layout;
