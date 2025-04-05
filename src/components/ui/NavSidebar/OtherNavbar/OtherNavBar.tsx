"use client";

import styles from "@/styles/NavSidebar.module.css";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MobileNavbar from "../MobileNav/MobileNavbar";
import TopNav from "../HomeNavbar/TopNav";

const OtherNavBar = () => {
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const t = useTranslations("Navbar");
  const locale = useLocale();

  const pathName = usePathname().toString();

  useEffect(() => {
    setMobileNav(false);
  }, [pathName]);

  return (
    <div>
      <nav
        className={`top-0 fixed w-full bg-[#FFFFFF] z-[99999999] ${styles.navShadow} divide-y divide-brandLsPrimary `}
      >
        <div className="container w-full px-4 ">
          <TopNav mobileNav={mobileNav} setMobileNav={setMobileNav} />
        </div>
        {/* <div className="container  w-full py-2 px-4 z-[9999999]"> */}
        {/* <div className="flex justify-between items-center ">
						<div className="flex items-center gap-3 lg:hidden">
							<IoMenuOutline fontSize={26} onClick={handleMobileSidebar} />

							<Image
								src={`/assets/images/navbar/ICT Logo.png`}
								width={45}
								height={25}
								alt="ICT Logo"
								className="h-auto"
								priority
							/>
						</div>

						<div className="flex items-start">
							<Link href={`/${locale}`}>
								<Image
									src={`/assets/images/navbar/Her Power Logo.gif`}
									width={140}
									height={60}
									alt="her-power Logo"
									className="h-16 w-auto max-lg:h-12"
									priority
								/>
							</Link>
						</div>

						<div className="flex gap-8 lg:hidden">
							<Image
								src={`/assets/images/navbar/mujib-sotoborso.png`}
								width={46}
								height={30}
								alt="mujib-sotoborso"
								className="h-fit"
								priority
							/>
						</div>

						<div className="flex justify-center gap-5  text-brandPrimary text-lg font-medium py-1.5 max-lg:hidden">
							<Link
								href={`/${locale}/shop-now`}
								className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
							>
								{t("shopNow")}
							</Link>

							<Link
								href={`/${locale}/course`}
								className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
							>
								{t("course")}
							</Link>
							<Link
								href={`/${locale}/events`}
								className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
							>
								{t("events")}
							</Link>
							<Link
								href={`/${locale}/talent-hunt`}
								className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
							>
								{t("career")}
							</Link>
							<Link
								href={`/${locale}/about-us`}
								className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
							>
								{t("aboutUs")}
							</Link>

							<Link
								href="/"
								className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
							>
								{t("contact")}
							</Link>
						</div>

						<div className="flex gap-6 items-center max-lg:hidden">
							<WishlistNav />
							<ShoppingCartNav />
							<LocalSwitcher />
							<LoginNav />
						</div>
					</div> */}
        {/* </div> */}
        <div
          className={`absolute top-16 h-[calc(100vh-64px)] bg-white lg:hidden z-[99999] duration-500 w-full ${
            mobileNav ? "right-0" : "max-md:right-[780px] max-lg:right-[1024px]"
          }`}
        >
          <MobileNavbar />
        </div>
      </nav>
    </div>
  );
};

export default OtherNavBar;
