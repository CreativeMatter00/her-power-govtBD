"use client";
import { url } from "@/api/api";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import styles from "@/styles/Product.module.css";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Controller, useForm, FieldErrors } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import StarRating from "../RenderStars";
import "react-toastify/dist/ReactToastify.css";
import { calculateAge } from "../../../utils/calculateAge";
import { useCookies } from "next-client-cookies";
import { addToCart } from "@/redux/Reducer/CartSlice";
import { handleCartUpdate, handleWishlistUpdate } from "@/redux/Reducer/MainSlice";
import { addToWishList } from "@/redux/Reducer/WishListSlice";

// ============= ALL FETCHED DATA DEFINITION ================
interface IData {
  data: Record<string, any>;
  scrollToRatings: () => void;
}

interface IProductVariant {
  varient_pid: string;
  varient_name: string;
  mrp_primary: number;
  disc_pct: number;
  mrp: number;
}

const InitialInformation: React.FC<IData> = ({ data, scrollToRatings }) => {
  const [selectedVariant, setSelectedVariant] = useState<any>({
    product_pid: data?.data?.productvariants[0]?.product_pid,
    varient_pid: data?.data?.productvariants[0]?.varient_pid,
    mrp_primary: data?.data?.productvariants[0]?.mrp_primary,
    disc_pct: data?.data?.productvariants[0]?.disc_pct,
    mrp: data?.data?.productvariants[0]?.mrp,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    control,
  } = useForm<any>();

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const age = calculateAge(data?.data?.entrepreneurs?.cre_date);
  const [number, unit] = age.split(" ");
  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const [value, setValue] = useState<number>(1);

  const increment = () => {
    setValue(value + 1);
  };

  const decrement = () => {
    value > 1 && setValue(value - 1);
  };

  const t = useTranslations("ProductDetails");
  const locale = useLocale();
  const cookies = useCookies();
  const isSeller = cookies.get("isSeller");
  const dispatch = useDispatch();
  const addToWishlist = async () => {
    const userData = JSON.parse(localStorage.getItem("loginDetails") || "{}");

    if (!userData || Object.keys(userData).length === 0) {
      toast.error("You need to login first", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const product = {
      id: selectedVariant?.product_pid,
      quantity: value,
      variantId: selectedVariant?.varient_pid,
      // customer_pid: userData.customer_pid,
    };

    const wishList = localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist") as string)
      : { products: [] };
    wishList.products=wishList.products||[]
    const existingProductIndex = wishList.products.findIndex(
      (p: { id: string; varientId: string }) =>
        p.id === product?.id &&
        p.varientId === product.variantId
    );

    if (existingProductIndex >= 0) {
      wishList.products[existingProductIndex].quantity += product?.quantity;
    } else {
      wishList.products.push(product);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishList));
    // dispatch(addToWishList(product));
    dispatch(handleWishlistUpdate());
    try {
      const formData = new FormData();
      formData.append("customer_pid", userData.customer_pid);
      formData.append("product_pid", product.id);
      formData.append("varient_pid", product.variantId);
      const response = await axios.post(`${url}/api/admin/wishlist`, formData);
      if (response?.data?.meta?.http_status === 201) {
        toast.success("Product added to wishlist", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error: any) {
      console.error("Error adding to wishlist:", error);
      if (error?.response?.status === 409) {
        toast.error("Product already exists in wishlist", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Something went wrong", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };



  const handleAddToCart = () => {
    const product = {
      id: selectedVariant?.product_pid,
      quantity: value,
      variantId: selectedVariant?.varient_pid,
    };

    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") as string)
      : { products: [] };

    cart.products = cart.products || [];

    const existingProductIndex = cart.products.findIndex(
      (p: { id: string; variantId: string }) =>
        p.id === product.id && p.variantId === product.variantId
    );

    if (existingProductIndex >= 0) {
      cart.products[existingProductIndex].quantity += product.quantity;
    } else {
      cart.products.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(handleCartUpdate());
    toast.success("Product added to cart successfully!", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div>
      <div className="py-10 bg-bgSecondary">
        <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
          >
            <CarouselContent>
              {data?.data?.attachments.map((product: any, index: number) => (
                <CarouselItem
                  key={index}
                  className="h-[660px] w-[450px] flex items-center justify-center"
                >
                  <Image
                    src={product.file_url}
                    height={660}
                    width={450}
                    alt="product"
                    className="w-auto h-full mx-auto object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 bg-bgSecondary text-brandDs border border-brandLsPrimary" />
            <CarouselNext className="right-1 bg-bgSecondary text-brandDs border border-brandLsPrimary" />
            <div className="max-w-[600px] overflow-x-auto mx-auto">
              <div className="flex justify-center mt-4">
                {data?.data?.attachments.map((product: any, index: number) => (
                  <Image
                    key={index}
                    src={product.file_url}
                    height={200}
                    width={75}
                    alt="image"
                    className={`mx-auto max-h-[100px] max-w-[70px] w-auto object-contain ${
                      index + 1 === current
                        ? "border border-red-500"
                        : "border border-brandLsPrimary"
                    }`}
                    onClick={() => api && api.scrollTo(index)}
                  />
                ))}
              </div>
            </div>
          </Carousel>

          <div>
            <div>
              <p className="text-5xl text-brandPrimary mb-4">
                {data?.data?.product_name}
              </p>
              <div className="flex items-center gap-2 mb-10"></div>
            </div>

            <div className="flex gap-10 items-end mb-2">
              <p className="text-brandDs"> {t("price")} </p>
              <p className="text-brandPrimary font-bold text-4xl">
                {selectedVariant?.mrp} Tk
              </p>
            </div>

            <div className="flex items-center gap-2 mb-8">
              <div className="w-16">
                {data?.data?.is_sale && (
                  <div className="bg-gradient-to-b from-[#FF8F3E] to-[#CC5A08] rounded-md py-2 px-4 font-bold text-white">
                    {t("sale")}
                  </div>
                )}
              </div>
              <p className="text-grey text-sm line-through">
                {selectedVariant?.mrp_primary} Tk
              </p>
              <p className="text-brandPrimary">{selectedVariant?.disc_pct}%</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex gap-1 text-warning">
                  <StarRating rating={data?.data?.avg_rating} />
                </div>

                <div className="text-xl text-brandPrimary">
                  {data?.data?.avg_rating}/{data?.data?.total_rating}
                </div>

                <div className="text-sm text-brandPrimary">
                  (Total {data?.data?.total_rating} Ratings)
                </div>
              </div>
              <p className="text-link cursor-pointer" onClick={scrollToRatings}>
                {t("seeCustomerReviews")}
              </p>
            </div>

            <div className="flex gap-4 items-center mb-4">
              <p className="text-brandDs"> {t("seller")}: </p>
              {data?.data?.entrepreneurs && (
                <Link
                  href={`/${locale}/shop-now/seller-profile/${data?.data?.entrepreneurs?.enterpenure_pid}`}
                  className="text-link hover:underline"
                >
                  {data?.data?.entrepreneurs.shop_name}
                </Link>
              )}
            </div>

            <div className="flex gap-4 pb-6 border-b border-brandLsPrimary">
              <div>
                <p
                  className="text-grey text-sm mb-2"
                  dangerouslySetInnerHTML={{
                    __html: t.raw("sellerInHerPower"),
                  }}
                ></p>
                <div className="flex items-end text-brandPrimary gap-2">
                  <p className="text-3xl"> {number} </p>
                  <p className=""> {unit} </p>
                </div>
              </div>
              <div className="border-l border-brandLsPrimary"></div>
              <div>
                <p
                  className="text-grey text-sm mb-2"
                  dangerouslySetInnerHTML={{
                    __html: t.raw("sellerAverageRating"),
                  }}
                ></p>
                <div className="flex items-center text-brandPrimary gap-2">
                  <p className="text-3xl"> {data?.data?.avg_rating} </p>
                  <p className="text-warning text-2xl">
                    <FaStar />
                  </p>
                </div>
              </div>
            </div>

            <div className="py-4 mb-4">
              <div className="">
                <label className="text-brandDs">{t("Product Variant")}: </label>

                {data?.data?.productvariants.length < 2 ? (
                  data?.data?.productvariants?.[0]?.varient_name
                ) : (
                  <div>
                    <Controller
                      control={control}
                      name="selected_variant"
                      defaultValue={data?.data?.productvariants[0].varient_pid}
                      render={({ field }) => {
                        return (
                          <Select
                            {...field}
                            value={selectedVariant.varient_pid}
                            onValueChange={(value) => {
                              const selected = data?.data?.productvariants.find(
                                (variant: IProductVariant) =>
                                  variant.varient_pid === value
                              );
                              setSelectedVariant({
                                product_pid: selected.product_pid,
                                varient_pid: selected.varient_pid,
                                mrp_primary: selected.mrp_primary,
                                disc_pct: selected.disc_pct,
                                mrp: selected.mrp,
                              });

                              field.onChange(value);
                            }}
                          >
                            <SelectTrigger className="mt-1 flex outline-none placeholder:text-[#CACACA] text-base py-3 px-4 border border-brandLsPrimary rounded w-1/2 bg-white">
                              <SelectValue
                                className="text-sm"
                                placeholder={
                                  data?.data?.productvariants?.varient_name ||
                                  "Product Category"
                                }
                              />
                            </SelectTrigger>

                            <SelectContent>
                              {data?.data?.productvariants?.map((item: any) => (
                                <SelectItem
                                  key={item.varient_pid}
                                  className="border-b-2 border-brandLsPrimary text-sm text-brandPrimary"
                                  value={item.varient_pid}
                                >
                                  {item.varient_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        );
                      }}
                    />
                    {errors.selected_variant && (
                      <p className="text-red-500 text-sm mt-2 ml-6">
                        {String(errors.selected_variant?.message)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {isSeller!=="true" && (
              <div className="py-4 mb-4">
                <div className="text-brandDs">
                  <p className="text-sm mb-2"> {t("quantity")} </p>

                  <div className="flex items-center gap-4">
                    <button
                      className="bg-brandDs text-white text-2xl h-12 w-12 flex items-center justify-center rounded-full"
                      onClick={decrement}
                    >
                      -
                    </button>

                    <input
                      type="number"
                      className={`p-2 w-16 text-center text-lg font-bold border border-brandLsPrimary bg-transparent ${styles.counterShadow}`}
                      readOnly
                      value={value}
                    />
                    <button
                      className="bg-brandDs text-white text-2xl h-12 w-12 flex items-center justify-center rounded-full"
                      onClick={increment}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isSeller!=="true" && (
              <div className="flex flex-col md:flex-row items-center gap-4">
                <button
                  type="submit"
                  className="px-10 py-4 bg-brandPrimary border border-brandPrimary text-white font-medium rounded-full"
                  onClick={() => handleAddToCart()}
                >
                  {t("addToCart")}
                </button>

                <button
                  className="px-10 py-4 bg-transparent text-brandPrimary border border-brandPrimary font-medium rounded-full"
                  onClick={() => addToWishlist()}
                >
                  {t("addToWishlist")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default InitialInformation;