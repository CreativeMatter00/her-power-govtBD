import OtherNavBar from "@/components/ui/NavSidebar/OtherNavbar/OtherNavBar";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <OtherNavBar />
      <div className="mt-24">{children}</div>
    </div>
  );
}

export default layout;
