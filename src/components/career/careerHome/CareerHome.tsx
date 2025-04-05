import React from "react";
import Hero from "./Hero";
import Jobs from "./Jobs";
import Tasks from "./Tasks";

const CareerHome = () => {
  return (
    <div className="space-y-8 pb-10">
      <Hero />
      <Jobs />
      <Tasks />
    </div>
  );
};

export default CareerHome;
