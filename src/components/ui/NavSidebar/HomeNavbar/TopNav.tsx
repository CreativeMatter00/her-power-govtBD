import { getUserInfo } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { IoClose, IoMenuOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import Logo from "../../logo/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../navigation-menu";
import LocalSwitcher from "../LocalSwitcher";

interface TopNavInfo {
  mobileNav: boolean;
  setMobileNav: Function;
}

const TopNav: React.FC<TopNavInfo> = ({ mobileNav, setMobileNav }) => {
  const t = useTranslations("Navbar");
  const tt = useTranslations("ShopNavbar");
  const locale = useLocale();
  const cookies = useCookies();
  const cart = useSelector((state: any) => state.Initial.cartUpdate);
  const [userType, setUserType] = useState<boolean | null>(null);
  const userPid = cookies.get("user_pid");
  const isSeller = cookies.get("isSeller");
  const [storedCartData, setStoredCartData] = useState<number>(0);
  const {
    data: userData,
  } = useQuery({
    queryKey: ["userInfo", userPid],
    queryFn: () => getUserInfo(userPid as string),
  });
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage?.loginDetails) {
      const loginDetails = JSON.parse(localStorage?.loginDetails);
      setUserType(loginDetails?.isSeller);
    }
  }, []);
  const getCartLength = () => {
    const numberOfProduct = JSON.parse(
      localStorage.getItem("cart") as string
    ) || {
      products: [],
    };
    setStoredCartData(numberOfProduct?.products?.length);
  };

  useEffect(() => {
      getCartLength();
    }, [cart]);
  const handleMobileSidebar = () => {
    setMobileNav(!mobileNav);
  };
  // console.log("DD",userInfo)
  return (
    <div className="flex justify-between items-center gap-3">
      <div className="flex items-center gap-3">
        {mobileNav ? (
          <IoClose
            fontSize={26}
            onClick={handleMobileSidebar}
            className="lg:hidden"
          />
        ) : (
          <IoMenuOutline
            fontSize={26}
            onClick={handleMobileSidebar}
            className="lg:hidden"
          />
        )}

        <Link href={`/${locale}`}>
          <Logo
            logoHeight="h-24"
            logoWidth="w-auto"
            text={true}
            textHeight="h-16"
            textWidth="w-auto"
          />
        </Link>
        
      </div>

      <div className="flex justify-center gap-6 text-[#252525] text-lg font-medium py-1.5 max-lg:hidden">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="list-none">
              <NavigationMenuTrigger className="text-center hover:underline underline-offset-8 decoration-black decoration-2 transition-all text-[#252525] text-lg font-medium">
                {t("categories")}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-4 flex flex-col gap-1 min-w-56">
                <NavigationMenuLink
                  href={`/${locale}/shop-now`}
                  className="hover:bg-gray-200 rounded-lg text-lg font-medium py-1 px-2"
                >
                  {t("shopNow")}
                </NavigationMenuLink>
                {/* <NavigationMenuLink
                  href={`/${locale}/course`}
                  className="hover:bg-gray-200 rounded-lg text-lg font-medium py-1 px-2"
                >
                  {t("course")}
                </NavigationMenuLink> */}
                <NavigationMenuLink
                  href={`/${locale}/career`}
                  className="hover:bg-gray-200 rounded-lg text-lg font-medium py-1 px-2"
                >
                  {t("career")}
                </NavigationMenuLink>
                <NavigationMenuLink
                  href={`/${locale}/meet-partners`}
                  className="hover:bg-gray-200 rounded-lg text-lg font-medium py-1 px-2"
                >
                  {t("Blogs")}
                </NavigationMenuLink>
                <NavigationMenuLink
                  href={`/${locale}/resource-library`}
                  className="hover:bg-gray-200 rounded-lg text-lg font-medium py-1 px-2"
                >
                  {t("Resource Library")}
                </NavigationMenuLink>
                <NavigationMenuLink
                  href={`/${locale}/events`}
                  className="hover:bg-gray-200 rounded-lg text-lg font-medium py-1 px-2"
                >
                  {t("events")}
                </NavigationMenuLink>
                <NavigationMenuLink
                  href={`/${locale}/success-stories`}
                  className="hover:bg-gray-200 rounded-lg text-lg font-medium py-1 px-2"
                >
                  {t("Success Stories")}
                </NavigationMenuLink>
                <NavigationMenuLink
                  href={`/${locale}/challenges`}
                  className="hover:bg-gray-200 rounded-lg text-lg font-medium py-1 px-2"
                >
                  {t("Challenges")}
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Link
          href={`/${locale}/course`}
          className="text-center hover:underline underline-offset-8 decoration-black decoration-2 transition-all mr-2"
        >
          {t("course")}
        </Link>

        <Link
          href={`/${locale}/contact`}
          className="text-center hover:underline underline-offset-8 decoration-black decoration-2 transition-all"
        >
          {t("contact")}
        </Link>
      </div>

      <div className="flex gap-6 max-lg:hidden items-center justify-center">
        <LocalSwitcher />

        {userPid ? (
          isSeller === "true" ? (
            <Link href={`/${locale}/shop-now/seller/dashboard`}>
              <div className="rounded-full">
                <Image
                  alt=""
                  src={
                    (userData && userData?.profile_photo) ||
                    "/assets/images/profile/profile.png"
                  }
                  height={32}
                  width={32}
                  className="h-8 w-8 object-cover rounded-full border-2 border-brandDs z-10"
                />
              </div>
            </Link>
          ) : (
            <Link href={`/${locale}/shop-now/profile`}>
              <div className="rounded-full bg-contain w-[32px] h-[32px] overflow-hidden">
                <Image
                  // src={userInfo.profile_photo}
                  src={
                    (userData && userData?.profile_photo) ||
                    "/assets/images/profile/profile.png"
                  }
                  height={32}
                  width={32}
                  className="h-8 w-8 object-cover rounded-full border-2 border-brandDs z-10"
                  alt="profile"
                />
              </div>
            </Link>
          )
        ) : (
          <Link href={`/${locale}/login`}>
            <button className="text-[#252525] h-fit border border-brandPrimary hover:bg-brandPrimary hover:text-white transition-all duration-300 px-6 py-0.5 rounded-3xl mt-1">
              {t("login")}
            </button>
          </Link>
        )}

        <Image
          src={`/assets/images/navbar/ICT Logo.png`}
          width={600}
          height={300}
          alt="ICT Logo"
          className="h-12 w-auto"
          priority
        />
      </div>
      <Link href={`/${locale}/shop-now/profile/cart`} className="lg:hidden">
                    <div className=" flex justify-center items-center gap-2 text-black group hover:underline underline-offset-8 decoration-bgPrimary decoration-2 cursor-pointer relative">
                      {storedCartData > 0 && (
                        <div className="absolute w-6 h-6 flex justify-center items-center bg-[#763B90] text-white  text-xs font-bold rounded-full -top-3 -right-3">
                          {storedCartData}
                        </div>
                      )}

                      {tt("cart")}
                      <FiShoppingCart
                        fontSize={24}
                        className="cursor-pointer"
                      />
                    </div>
                  </Link>
    </div>
  );
};

export default TopNav;
