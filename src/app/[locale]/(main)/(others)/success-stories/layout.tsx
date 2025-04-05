import SuccessStoriesHeader from "@/components/ui/successStoriesHeader/SuccessStoriesHeader";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <SuccessStoriesHeader/>
      <div className="pt-[46px]"> </div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
