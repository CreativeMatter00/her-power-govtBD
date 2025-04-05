/* eslint-disable react/no-unescaped-entities */

import { MdOutlineOndemandVideo } from "react-icons/md";
import {
  FaRegClock,
  FaRegClipboard,
  FaHeadphones,
  FaRegCheckCircle,
  FaGift,
  FaBook,
  FaFileAlt,
} from "react-icons/fa";
import InstructorCard from "./InstructorCard";
import Image from "next/image";
import { AiOutlineCheck } from "react-icons/ai";

const OrgCourseDetails = () => {
  const features = [
    {
      icon: <FaRegClock />,
      text: "36 LIVE Classes (50 mins lecture+ 30 mins Q/A)",
    },
    { icon: <FaRegClipboard />, text: "8 Practice Reading Mock Test" },
    { icon: <FaHeadphones />, text: "8 Practice Listening Mock Test" },
    { icon: <FaRegCheckCircle />, text: "2 Complete Mock Test" },
    { icon: <FaGift />, text: "12 Weeks Study Plan" },
    {
      icon: <FaFileAlt />,
      text: "10 Full Mock Test Questions to practice at home",
    },
    { icon: <FaBook />, text: "IELTS Book (Free)" },
  ];

  const instructors = [
    {
      name: "Munzereen Shahid",
      details:
        "MSc (English), University of Oxford (UK); BA, MA (English), University of Dhaka; IELTS: 8.5",
      image:
        "/assets/images/course/10 Minute School/Profile Image/Munzereen Shahid.jpg",
    },
    {
      name: "Fatima Farhana Prova",
      details: "Band Score: 8.5\nIELTS instructor, 10 Minute School",
      image:
        "/assets/images/course/10 Minute School/Profile Image/Fatima Farhana Prova.jpg",
    },
    {
      name: "Shulagna Sneha",
      details: "Content Specialist for English\n10 Minute School.\nIELTS: 8",
      image:
        "/assets/images/course/10 Minute School/Profile Image/Hasnain Nur Sezan.jpg",
    },
    {
      name: "Junaed Bin Samad (Dhiman)",
      details: "Band Score: 8.5\nIELTS instructor, 10 Minute School",
      image:
        "/assets/images/course/10 Minute School/Profile Image/Junaed Bin Samad (Dhiman).jpg",
    },
    {
      name: "Hasnain Nur Sezan",
      details: "Band Score: 8.0\nIELTS instructor, 10 Minute School",
      image:
        "/assets/images/course/10 Minute School/Profile Image/Shulagna Sneha.jpg",
    },
  ];

  return (
    <div className="">
      {/* <Image
        src={`/assets/images/course/IELTS Live Batch Main.png`}
        width={1920}
        height={300}
        alt="her-power Logo"
        className="h-[300px] w-auto"
        priority
      /> */}

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

      <div className="container flex flex-col gap-2 mt-6">
        <p className="text-justify text-xl my-2">
          If your goal is to study or work abroad, achieving a competitive band
          score on the IELTS exam is essential. That's why 10 Minute School is
          proud to introduce the 'IELTS Live Batch' Live Course. Designed for
          learners aiming to excel on the exam and pursue opportunities abroad,
          this course offers in-depth instruction on all four skills: Listening,
          Reading, Writing, and Speaking. With 36 interactive live classes led
          by experienced instructors, you'll receive expert guidance over 12
          weeks. Don't wait any longer – enroll now to reach your desired IELTS
          band score.
        </p>
        <div className="text-xl font-bold flex items-center gap-2">
          <MdOutlineOndemandVideo color="#59187B" /> Total Videos: 11
        </div>
        <div className="text-xl font-bold flex items-center gap-2">
          <FaRegClock color="#59187B" /> Course Remaining: 75 hours
        </div>

        <div className="flex flex-col gap-2 my-3">
          <p className="text-2xl font-bold mb-2">What is in this course</p>
          <ul className="space-y-4 ">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-3">
                <div className="text-lg">{feature.icon}</div>
                <span className="">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="my-3">
          <p className="text-2xl font-bold text-gray-800 mb-2">
            Course Instructors
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {instructors.map((instructor, index) => (
              <InstructorCard
                key={index}
                name={instructor.name}
                details={instructor.details}
                image={instructor.image}
              />
            ))}
          </div>
        </div>

        {/* <div className="my-3 mb-10">
          <p className="text-2xl font-bold text-gray-800 mb-2">
            What you will learn by doing the course
          </p>
          <div className="border border-gray-200 rounded-lg p-4 grid grid-cols-2 m gap-4 ">
            <div className="flex items-start gap-2  ">
              <AiOutlineCheck
                color="#59187B"
                fontSize={20}
                className="min-w-8 "
              />
              Learn probable IELTS question types and expert solution
              techniques.
            </div>
            <div className="flex items-start gap-2  ">
              <AiOutlineCheck
                color="#59187B"
                fontSize={20}
                className="min-w-8 "
              />
              Learn probable IELTS question types and expert solution
              techniques.
            </div>
            <div className="flex items-start gap-2  ">
              <AiOutlineCheck
                color="#59187B"
                fontSize={20}
                className="min-w-8 "
              />
              Learn probable IELTS question types and expert solution
              techniques.
            </div>
            <div className="flex items-start gap-2  ">
              <AiOutlineCheck
                color="#59187B"
                fontSize={20}
                className="min-w-8 "
              />
              Learn probable IELTS question types and expert solution
              techniques.
            </div>
            <div className="flex items-start gap-2  ">
              <AiOutlineCheck
                color="#59187B"
                fontSize={20}
                className="min-w-8 "
              />
              Learn probable IELTS question types and expert solution
              techniques.
            </div>
            <div className="flex items-start gap-2 ">
              <AiOutlineCheck
                color="#59187B"
                fontSize={20}
                className="min-w-8 "
              />
              Learn probable IELTS question types and expert solution
            </div>
            <div className="flex items-start gap-2  ">
              <AiOutlineCheck
                color="#59187B"
                fontSize={20}
                className="min-w-8 "
              />
              Learn probable IELTS question types and expert solution
              techniques.
            </div>
            <div className="flex items-start gap-2  ">
              <AiOutlineCheck
                color="#59187B"
                fontSize={20}
                className="min-w-8 "
              />
              Learn probable IELTS question types and expert solution
              techniques.
            </div>
          </div>
        </div> */}

        <div className="p-6  rounded-md shadow-md mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            What you will learn by doing the course
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ul className="list-none space-y-2">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✔️</span>
                Learn probable IELTS question types and expert solution
                techniques.
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✔️</span>
                Structure writing and speaking answers effectively for higher
                scores.
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✔️</span>
                Develop fluency in speaking English, understand accents, and
                tackle unfamiliar words to predict answers.
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✔️</span>
                Access a 12-week study plan for comprehensive IELTS preparation.
              </li>
            </ul>
            <ul className="list-none space-y-2">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✔️</span>
                Understand question types in Listening and Reading; apply
                tactics for higher scores.
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✔️</span>
                Practice with 2 complete academic mock tests and solutions.
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✔️</span>
                Follow step-by-step guidelines for speed reading and time
                management in IELTS.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgCourseDetails;

// export const ClockIcon = () => {
//   <svg
//     width="18"
//     height="18"
//     viewBox="0 0 18 18"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M9 1.5C4.8645 1.5 1.5 4.8645 1.5 9C1.5 13.1355 4.8645 16.5 9 16.5C13.1355 16.5 16.5 13.1355 16.5 9C16.5 4.8645 13.1355 1.5 9 1.5ZM9 15C5.69175 15 3 12.3082 3 9C3 5.69175 5.69175 3 9 3C12.3082 3 15 5.69175 15 9C15 12.3082 12.3082 15 9 15Z"
//       fill="black"
//     />
//     <path d="M9.75 5.25H8.25V9.75H12.75V8.25H9.75V5.25Z" fill="black" />
//   </svg>;
// };
