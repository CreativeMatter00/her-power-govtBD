"use client";

import styles from "@/styles/NavSidebar.module.css";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdLogin } from "react-icons/md";
import LocalSwitcher from "../LocalSwitcher";
import { IoMenuOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MobileNavbar from "../MobileNav/MobileNavbar";
import LoginNav from "../LoginNav";
import WishlistNav from "../WishlistNav";
import ShoppingCartNav from "../ShoppingCartNav";
import HomeNavbar from "../HomeNavbar/HomeNavbar";
import TopNav from "../HomeNavbar/TopNav";
import { useSelector } from "react-redux";
import { useCookies } from "next-client-cookies";
import { useQuery } from "@tanstack/react-query";
import { getWishlistProducts } from "@/api/api";

const ShopNavbar = () => {
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const t = useTranslations("ShopNavbar");
  const locale = useLocale();
  const cookies = useCookies();
  const pathName = usePathname().toString();
  const cart = useSelector((state: any) => state.Initial.cartUpdate);
  const isSeller = cookies.get("isSeller");
  const customerId = cookies.get("customer_pid") || "";
  const wishlist = useSelector((state: any) => state.Initial.wishlistUpdate);
  const [storedCartData, setStoredCartData] = useState<number>(0);
  const [storedWishListData, setStoredWishListData] = useState<number>(0);

  const {
    isLoading,
    error,
    data: WishListData,
    refetch,
  } = useQuery({
    queryKey: ["getWishlistProducts"],
    queryFn: () => getWishlistProducts(customerId),
  });

  const getCartLength = () => {
    const numberOfProduct = JSON.parse(
      localStorage.getItem("cart") as string
    ) || {
      products: [],
    };
    setStoredCartData(numberOfProduct?.products?.length);
  };

  const getWishListLength = () => {
    const numberOfProduct = JSON.parse(
      localStorage.getItem("wishlist") as string
    ) || {
      products: [],
    };

    if (numberOfProduct.products.length < 1) {
      setStoredWishListData(WishListData?.data.length);
    } else {
      setStoredWishListData(numberOfProduct?.products?.length);
    }
  };

  useEffect(() => {
    getCartLength();
    getWishListLength();
  }, [cart, wishlist, WishListData]);

  useEffect(() => {
    setMobileNav(false);
  }, [pathName]);

  return (
    <div>
      <nav
        className={`top-0 fixed w-full bg-[#FFFFFF] z-[99999999] ${styles.navShadow} divide-y divide-brandLsPrimary`}
      >
        <div className="container px-4">
          <TopNav mobileNav={mobileNav} setMobileNav={setMobileNav} />
        </div>
        <div className=" max-lg:hidden bg-[#763B90] ">
          <div className="container">
            <div className="flex justify-between py-3 px-8">
              <div className="flex justify-center gap-8 text-bgPrimary text-base font-medium py-1.5">
                <Link
                  href={`/${locale}/shop-now/explore-by-category/all`}
                  className="text-center hover:underline underline-offset-8 decoration-bgPrimary decoration-2 transition-all hover:text-bgPrimary"
                >
                  {t("categories")}
                </Link>
                {isSeller !== "true" && (
                  <Link
                    href={`/${locale}/shop-now/seller/register`}
                    className="text-center hover:underline underline-offset-8 decoration-bgPrimary decoration-2 transition-all"
                  >
                    {t("becomeASeller")}
                  </Link>
                )}
                <Link
                  href={`/${locale}/shop-now/all-products`}
                  className="text-center hover:underline underline-offset-8 decoration-bgPrimary decoration-2 transition-all "
                >
                  {t("allProducts")}
                </Link>
              </div>
              {isSeller !== "true" && (
                <div className="flex gap-8 items-center">
                  <Link href={`/${locale}/shop-now/profile/wishlist`}>
                    <div className=" flex justify-center items-center gap-2 text-bgPrimary group hover:underline underline-offset-8 decoration-bgPrimary decoration-2 cursor-pointer relative">
                      {storedWishListData > 0 && (
                        <div className="absolute w-6 h-6 flex justify-center items-center bg-white text-[#763B90]  text-xs font-bold rounded-full -top-3 -right-3">
                          {storedWishListData}
                        </div>
                      )}
                      {t("wishlist")}
                      <FaRegHeart
                        fontSize={24}
                        className="cursor-pointer hover:underline underline-offset-8 decoration-bgPrimary decoration-2"
                      />
                    </div>
                  </Link>

                  <Link href={`/${locale}/shop-now/profile/cart`}>
                    <div className=" flex justify-center items-center gap-2 text-bgPrimary group hover:underline underline-offset-8 decoration-bgPrimary decoration-2 cursor-pointer relative">
                      {storedCartData > 0 && (
                        <div className="absolute w-6 h-6 flex justify-center items-center bg-white text-[#763B90]  text-xs font-bold rounded-full -top-3 -right-3">
                          {storedCartData}
                        </div>
                      )}

                      {t("cart")}
                      <FiShoppingCart
                        fontSize={24}
                        className="cursor-pointer"
                      />
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

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

export default ShopNavbar;
