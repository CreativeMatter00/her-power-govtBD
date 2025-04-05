import ShopNavbar from "@/components/ui/NavSidebar/ShopNavbar/ShopNavbar";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
	return (
		<div>
			<ShopNavbar />
			<div className="mt-[64px] md:mt-[156px]">{children}</div>
		</div>
	);
}

export default layout;
