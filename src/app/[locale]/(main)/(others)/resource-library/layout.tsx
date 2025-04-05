import ResourceLibraryHeader from "@/components/ui/resourceLibraryHeader/ResourceLibraryHeader";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <ResourceLibraryHeader />
      <div className="pt-[46px]"> </div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
