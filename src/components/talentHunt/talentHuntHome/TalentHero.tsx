import React from "react";

const TalentHero = () => {
  return (
    <div
      className="relative h-[300px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/assets/images/course/IELTS Live Batch Main.png')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex items-center justify-between h-full px-6 container">
        <div className="text-white">
          <span className="bg-red-500 px-2 py-1 text-xs font-semibold rounded-full">
            Live
          </span>
          <h1 className="text-2xl font-bold mt-2">IELTS Live Batch</h1>
        </div>
        <div className="text-right">
          <p className="text-white text-lg font-bold">
            <sup className="text-base font-semibold">TK</sup> 8500
          </p>
          <button className="mt-2 px-4 py-2 bg-purple-900 text-white font-semibold rounded-full hover:bg-purple-700">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentHero;
