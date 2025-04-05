"use client";

import { FaRegClock } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { MdOutlineDateRange } from "react-icons/md";
import { RiMapPinLine } from "react-icons/ri";

const details = [
  {
    icon: <RiMapPinLine color="#8B3392" />,
    text: "Dhaka, Bangladesh (On-site)",
  },
  { icon: <MdOutlineDateRange color="#8B3392" />, text: "Full-time" },
];

const JobProvider = [
  {
    icon: <FaRegClock color="#8B3392" />,
    text: "2 weeks from start date",
  },
  { icon: <FiMail color="#8B3392" />, text: "client@example.com" },
];

const page = () => {
  return (
    <div>
      {/* Job Provider Registration part */}
      <div className="container border-2 border-red-600 p-4 divide-y divide-[#DCDCDC] ">
        <div className="pb-5">
          <p className="text-black text-2xl font-bold">UI/UX Designer</p>
          <p className="text-black text-xl font-bold my-4">
            PixelCraft Ltd.{" "}
            <span className="font-normal">
              | A leading digital agency specializing in innovative web and app
              solutions
            </span>
          </p>
          <div className="flex gap-4 text-[#252525] max-md:flex-col items-start">
            {details.map((detail, index) => (
              <div
                key={index}
                className="inline-flex gap-1 text-xl font-bold justify-center items-center"
              >
                {detail.icon}
                {detail.text}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-5">
          <p>
            At PixelCraft Ltd., creativity meets functionality! We are looking
            for a talented UI/UX Designer who is passionate about creating
            user-centered designs and enhancing the overall digital experience
            for our clients. If you have an eye for clean and artful design and
            are excited about turning complex ideas into intuitive interfaces,
            we want to hear from you.
          </p>
        </div>
      </div>
      {/* Job Provider Registration */}

      <div className="container border-2 border-red-600 p-4 flex flex-col gap-5">
        <p className="text-black text-2xl font-bold">
          Logo Designer for Startup Brand Identity
        </p>
        <p>
          At PixelCraft Ltd., creativity meets functionality! We are looking for
          a talented UI/UX Designer who is passionate about creating
          user-centered designs and enhancing the overall digital experience for
          our clients. If you have an eye for clean and artful design and are
          excited about turning complex ideas into intuitive interfaces, we want
          to hear from you.
        </p>
        <div className="flex gap-4 text-[#252525] max-md:flex-col items-start">
          {JobProvider.map((detail, index) => (
            <div
              key={index}
              className="inline-flex gap-1 text-xl font-bold justify-center items-center "
            >
              {detail.icon}
              {detail.text}
            </div>
          ))}
        </div>
        <p className="text-base text-black">
          Please send examples of previous logo designs, especially any that
          align with a natural or eco-friendly theme. Let me know your approach
          to the project and why you’d be a great fit for GreenNest.
        </p>
      </div>
    </div>
  );
};

export default page;
