"use client";

import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface SearchForm {
  search: string;
}

const Search = () => {
  const cookies = useCookies();
  const isSeller = cookies.get("isSeller");
  const t = useTranslations("ShopNowHome");
  const { register, handleSubmit, reset } = useForm<SearchForm>();
  const local = useLocale();
  const router = useRouter();
  const onSubmit = (data: SearchForm) => {
    if (data.search) {
      router.push(
        `/${local}/shop-now/searched-products?productName=${data.search}`
      );
      reset();
    }
  };

  return (
    <div className="bg-bgSecondary">
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center flex-col md:flex-row gap-2 md:gap-8 py-8"
        >
          <input
            type="text"
            {...register("search")}
            placeholder={t("searchForProducts")}
            className="my-6 py-2 px-4 text-xl flex-grow rounded-full w-full bg-white border border-brandPrimary"
          />
          <button className="w-48 bg-brandPrimary text-white py-2 rounded-full font-medium text-lg hover:bg-brandHover">
            {t("search")}
          </button>
        </form>
      </div>
    {
      isSeller!=="true" && 
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
    }
    </div>
  );
};

export default Search;
