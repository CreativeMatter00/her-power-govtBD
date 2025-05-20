'use client'
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface SearchForm {
  search: string;
}


const SearchBar = () => {
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
  )
}

export default SearchBar
