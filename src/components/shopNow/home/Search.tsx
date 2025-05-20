"use client";

import { useCookies } from "next-client-cookies";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";


const Search = () => {
  const cookies = useCookies();
  const isSeller = cookies.get("isSeller");
  const t = useTranslations("ShopNowHome");

  return (
    <div className="bg-bgSecondary">
      <div className="container mx-auto">
        <SearchBar />
      </div>
      {isSeller !== "true" && (
        <div className="bg-brandDs py-8">
          <div className="container mx-auto ">
            <div className="text-white flex items-center">
              <div className="flex flex-col gap-8">
                <p className="text-3xl"> {t("earnTitle")} </p>
                <div className="max-w-[500px] mx-auto block md:hidden">
                  <Image
                    src="/assets/images/shop-now/hero/seller.png"
                    height={400}
                    width={400}
                    alt="become a seller"
                    className="h-auto w-full"
                  />
                </div>
                <p>{t("earnDescription")}</p>
                <Link href={"shop-now/seller/register"} className="w-fit">
                  <button className="border border-white rounded-full py-4 px-10 w-fit transition-all duration-300 hover:bg-white hover:text-brandDs">
                    {t("becomeASeller")}
                  </button>
                </Link>
              </div>
              <div className="w-[800px] hidden md:block">
                <Image
                  src="/assets/images/shop-now/hero/seller.png"
                  height={400}
                  width={400}
                  alt="become a seller"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
