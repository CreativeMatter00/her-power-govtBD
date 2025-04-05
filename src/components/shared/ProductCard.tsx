"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "./RenderStars";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleCartUpdate } from "@/redux/Reducer/MainSlice";
import { useCookies } from "next-client-cookies";

interface IProduct {
  id: string;
  name: string;
  sale: boolean;
  category_pid?: string;
  total_sale?: number;
  rating: number;
  image: string;
  variantId: string;
  price: number;
  oldPrice: number;
}

const ProductCard: React.FC<IProduct> = (props) => {
  // Get user token from local storage if needed for authentication
  const token = localStorage.getItem("token");
  const cookies = useCookies();
  const isSeller = cookies.get("isSeller");

  // Set up translations
  const locale = useLocale();
  const t = useTranslations("ProductCard");

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // const cartData = useSelector((state: any) => state.cart);

  const handleAddToCart = (id: string | number) => {
    const product = {
      id: String(id),
      quantity: 1,
      variantId: String(props.variantId),
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
    <div className="group max-w-[244px] mx-auto">
      <div className="relative rounded-xl w-full overflow-hidden">
        <div className="flex items-center w-[244px] h-[244px]">
          {props.image && (
            <Image
              src={props.image}
              height={250}
              width={250}
              alt="product"
              className="h-full w-auto object-contain mx-auto"
            />
          )}
        </div>
        {props.sale && (
          <div className="absolute left-2 top-2 text-white bg-sale py-2 px-4 font-bold text-sm">
            {t("sale")}
          </div>
        )}
        {
          isSeller!=="true" &&
        <div
          className="absolute bottom-0 lg:bottom-[-50px] group-hover:bottom-0 transition-all duration-300 cursor-pointer w-full text-white bg-brandPrimary opacity-80 py-2.5 text-center font-medium text-lg"
          onClick={() => handleAddToCart(props.id)}
        >
          {t("addToCart")}
        </div>
        }
      </div>
      <Link href={`/${locale}/shop-now/products/${props.id}`}>
        <div className="my-6">
          <p className="text-brandPrimary text-xl h-8 line-clamp-1 md:line-clamp-1 mb-2 hover:underline">
            {props.name}
          </p>
          <p className="text-base mb-2">
            <span className="text-grey"> {t("price")}: </span>
            <span className="text-brandDs font-bold mr-2">
              {props.price || "00"}
              {t("tk")}
            </span>
            <span className="text-greyPrimary line-through">
              {props.oldPrice}
              {t("tk")}
            </span>
          </p>
          <div className="flex items-center text-lg gap-1 text-warning">
            <StarRating rating={props.rating} />
            <p className="text-brandPrimary text-lg mx-1"> {props.rating}/5 </p>
          </div>
        </div>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default ProductCard;
