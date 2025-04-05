import React from "react";
import HeadingPart from "../talentHuntHome/HeadingPart";
import DeveloperTypes from "./DeveloperTypes";
import Hero from "./Hero";
import DeveloperList from "./DeveloperList";
import FreelancerList from "./freelancerList/FreelancerList";

const CategoryId = () => {
  return (
    <div className="container ">
      <HeadingPart />
      <Hero />
      <DeveloperTypes />
      <DeveloperList />
      <FreelancerList />
    </div>
  );
};

export default CategoryId;
