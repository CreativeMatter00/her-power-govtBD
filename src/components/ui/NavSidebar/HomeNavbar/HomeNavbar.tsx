"use client";

import styles from "@/styles/NavSidebar.module.css";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobileNavbar from "../MobileNav/MobileNavbar";
import TopNav from "./TopNav";

const HomeNavbar = () => {
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const locale = useLocale();
  const pathName = usePathname().toString();

  useEffect(() => {
    setMobileNav(false);
  }, [pathName]);

  return (
    <div>
      <nav
        className={`top-0 fixed w-full bg-[#FBF5FD] z-40 ${styles.navShadow}`}
      >
        <div className="container w-full px-4 ">
          <TopNav mobileNav={mobileNav} setMobileNav={setMobileNav} />
        </div>

        <div
          className={`absolute top-16  h-[calc(100vh-64px)] bg-white lg:hidden z-[99999] duration-500 w-full ${
            mobileNav ? "right-0" : "max-md:right-[780px] max-lg:right-[1024px]"
          }`}
        >
          <MobileNavbar />
        </div>
      </nav>
    </div>
  );
};

export default HomeNavbar;

// "use client";

// import { useLocale, useTranslations } from "next-intl";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import LocalSwitcher from "../LocalSwitcher";
// import styles from "@/styles/NavSidebar.module.css";
// import { IoMenuOutline } from "react-icons/io5";
// import MobileNavbar from "../MobileNav/MobileNavbar";
// import { usePathname } from "next/navigation";
// import herPowerLottie from "../../../../../public/assets/data.json";
// import Logo from "../../logo/Logo";

// const HomeNavbar = () => {
//   const [mobileNav, setMobileNav] = useState<boolean>(false);
//   const t = useTranslations("Navbar");
//   const locale = useLocale();
//   const pathName = usePathname().toString();

//   const handleMobileSidebar = () => {
//     setMobileNav(!mobileNav);
//   };

//   useEffect(() => {
//     setMobileNav(false);
//   }, [pathName]);

//   return (
//     <div className=" ">
//       <nav
//         className={`top-0 fixed w-full bg-[#DDBBEB] z-[99999999] ${styles.navShadow}`}
//       >
//         <div className="container  w-full py-2 px-4">
//           <div className="flex justify-between items-start max-lg:items-center">
//             <div className="flex items-center gap-3">
//               <IoMenuOutline
//                 fontSize={26}
//                 onClick={handleMobileSidebar}
//                 className="lg:hidden"
//               />

//               <Link href={`/${locale}`}>
//                 <Image
//                   src={`/assets/images/navbar/ICT Logo.png`}
//                   width={90}
//                   height={100}
//                   alt="ICT Logo"
//                   className="h-auto max-lg:w-11"
//                   priority
//                 />
//               </Link>
//             </div>

//             <Logo
//               logoHeight="h-28"
//               logoWidth="w-auto"
//               text={true}
//               textHeight="h-16"
//               textWidth="w-[141px]"
//             />

//             <div className="flex gap-8 max-lg:hidden">
//               <LocalSwitcher />
//               <button className="text-[#252525] h-fit border border-[#252525] px-6 py-0.5 rounded-3xl mt-1">
//                 Login
//               </button>
//               <Image
//                 src={`/assets/images/navbar/mujib-sotoborso.png`}
//                 width={95}
//                 height={62}
//                 alt="mujib-sotoborso"
//                 className="h-fit"
//                 priority
//               />
//             </div>

//             <div className="flex gap-8 lg:hidden">
//               <Image
//                 src={`/assets/images/navbar/mujib-sotoborso.png`}
//                 width={46}
//                 height={30}
//                 alt="mujib-sotoborso"
//                 className="h-fit"
//                 priority
//               />
//             </div>
//           </div>

//           <div className="flex justify-center gap-8  text-[#5954CC] text-lg font-medium py-1.5 max-lg:hidden">
//             <Link
//               href={`/${locale}/shop-now`}
//               className="text-center hover:underline underline-offset-8 decoration-black decoration-2 transition-all"
//             >
//               {t("shopNow")}
//             </Link>
//             <Link
//               href={`/${locale}/course`}
//               className="text-center hover:underline underline-offset-8 decoration-black decoration-2 transition-all"
//             >
//               {t("course")}
//             </Link>
//             <Link
//               href={`/${locale}/events`}
//               className="text-center hover:underline underline-offset-8 decoration-black decoration-2 transition-all"
//             >
//               {t("events")}
//             </Link>
//             <Link
//               href={`/${locale}/talent-hunt`}
//               className="text-center hover:underline underline-offset-8 decoration-black decoration-2 transition-all"
//             >
//               {t("talentHunt")}
//             </Link>
//             <Link
//               href={`/${locale}/`}
//               className="text-center hover:underline underline-offset-8 decoration-black decoration-2 transition-all"
//             >
//               {t("aboutUs")}
//             </Link>
//             <Link
//               href={`/${locale}/`}
//               className="text-center hover:underline underline-offset-8 decoration-black decoration-2 transition-all"
//             >
//               {t("contact")}
//             </Link>
//           </div>
//         </div>
//         <div
//           className={`absolute top-16  h-[calc(100vh-64px)] bg-white lg:hidden z-[99999] duration-500 w-full ${
//             mobileNav ? "right-0" : "max-md:right-[780px] max-lg:right-[1024px]"
//           }`}
//         >
//           <MobileNavbar />
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default HomeNavbar;
