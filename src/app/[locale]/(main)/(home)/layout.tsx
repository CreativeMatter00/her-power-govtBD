import HomeNavbar from "@/components/ui/NavSidebar/HomeNavbar/HomeNavbar";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <HomeNavbar />
      <div className="mt-24">{children}</div>
    </div>
  );
}

export default layout;
