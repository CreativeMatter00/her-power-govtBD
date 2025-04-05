import ChallengesHeader from "@/components/ui/challengesHeader/ChallengesHeader";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <ChallengesHeader/>
      <div className="pt-[46px]"> </div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
