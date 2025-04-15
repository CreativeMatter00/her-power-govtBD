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
        className={`fixed top-0 w-full bg-[#FBF5FD] z-40 ${styles.navShadow}`}
      >
        <div className="container w-full px-4">
          <TopNav mobileNav={mobileNav} setMobileNav={setMobileNav} />
        </div>
      </nav>
      <div
        className={`fixed top-24 bottom-0 w-full bg-white lg:hidden z-[99999] duration-500 ${
          mobileNav ? "right-0" : "max-md:right-[780px] max-lg:right-[1024px]"
        }`}
      >
        <MobileNavbar />
      </div>
    </div>
  );
};

export default HomeNavbar;