"use client";

import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import HomePage from "./homepage/HomePage";
import SearchedProducts from "./allProducts/SearchedProducts";
import Profile from "./profile/Profile";
import AllProductsPage from "./allProducts/AllProductsPage";
import { register } from "module";
import { useForm } from "react-hook-form";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

interface SearchForm {
  search: string;
}

const  SellerProducts = () => {
  const [active, setActive] = useState("homepage");
  const { register, handleSubmit, watch, reset } = useForm<SearchForm>();
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const local = useLocale();
  
  const onSubmit = (data: SearchForm) => {
    // console.log("got", data.search);
    router.push(
      `/${local}/shop-now/seller-profile/searched-products?productName=${data.search}&entrepreneurId=${id}`
    );
    reset();
  };

  return (
    <div>
      <div className="bg-bgSecondary py-2">
        <div className="container mx-auto w-full flex justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`font-bold hover:cursor-pointer ${
                active === "homepage" ? "text-brandDs" : "text-greyPrimary"
              }`}
              onClick={() => setActive("homepage")}
            >
              Homepage
            </div>
            <div
              className={`font-bold hover:cursor-pointer ${
                active === "allProducts" ? "text-brandDs" : "text-greyPrimary"
              }`}
              onClick={() => setActive("allProducts")}
            >
              All Products
            </div>
            <div
              className={`font-bold hover:cursor-pointer ${
                active === "profile" ? "text-brandDs" : "text-greyPrimary"
              }`}
              onClick={() => setActive("profile")}
            >
              Profile
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center border border-brandDs rounded-full basis-1/4 p-0.5 w-full"
          >
            <div className="basis-full">
              <input
                type="text"
                {...register("search")}
                placeholder="Search..."
                className=" py-1.5 px-4 outline-none bg-transparent "
              />
            </div>
            <button className="flex justify-center items-center w-10 h-10 bg-brandDs rounded-full">
              <IoIosSearch className="text-bgSecondary w-5 h-5 font-bold" />
            </button>
          </form>
        </div>
      </div>
      {active === "homepage" && <HomePage />}
      {active === "allProducts" && <AllProductsPage />}
      {active === "profile" && <Profile />}
    </div>
  );
};

export default SellerProducts;
