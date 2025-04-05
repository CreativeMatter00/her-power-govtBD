import Sidebar from "@/components/course/courseProvider/sidebar/Sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container p-4">
      <main className="flex items-start gap-6 w-full">
        <Sidebar />
        <div className="basis-full">{children}</div>
      </main>
    </div>
  );
};

export default layout;
