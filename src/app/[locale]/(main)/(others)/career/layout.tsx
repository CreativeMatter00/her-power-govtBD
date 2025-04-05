import CareerHeader from "@/components/ui/careerHeader/CareerHeader";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <CareerHeader />
      <div className="pt-16">
      {children}</div>
    </div>
  );
};

export default layout;
