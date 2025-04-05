"use client";

import { FC, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
import styles from "@/styles/Product.module.css";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import EmptyCart from "./EmptyCart";
import { url } from "@/api/api";
import { useDispatch, useSelector } from "react-redux";
import { handleCartUpdate } from "@/redux/Reducer/MainSlice";
import { useCookies } from "next-client-cookies";
import { usePathname, useRouter } from "next/navigation";

type ICartProps = {
  setActive: any;
  cartProducts: any;
  setCartProducts?: any;
};

const Cart: FC<ICartProps> = ({ setActive, cartProducts, setCartProducts }) => {
  const t = useTranslations("talentHunt");

  const locale = useLocale();
  const dispatch = useDispatch();
  const cookies = useCookies();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const router = useRouter();
  const pathName = usePathname();

  const [storedCartData, setStoredCartData] = useState<any>(
    JSON.parse(localStorage.getItem("cart") as string) || { products: [] }
  );

  const customerPid = cookies.get("customer_pid");

  const apiData = {
    cart_products:
      storedCartData?.products.map((product: any) => ({
        product_pid: product.id,
        varient_pid: product.variantId,
        quantity: product.quantity,
      })) || [],
  };

  // ? API Call
  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${url}/api/frontend/cart-calculation`,
          apiData
        );
        setCartProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchCartData();
  }, []);

  const increment = (e: React.MouseEvent, index: number, id: string) => {
    e.preventDefault();

    setCartProducts((prevState: any) => ({
      ...prevState,
      data: prevState.data.map((item: any, i: number) =>
        i === index ? { ...item, quantity: Number(item.quantity) + 1 } : item
      ),
    }));

    const updatedCart = {
      ...storedCartData,
      products: storedCartData.products.map((product: any, i: number) =>
        i === index ? { ...product, quantity: product.quantity + 1 } : product
      ),
    };

    setStoredCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decrement = (e: React.MouseEvent, index: number, id: string) => {
    e.preventDefault();

    setCartProducts((prevState: any) => ({
      ...prevState,
      data: prevState.data.map((item: any, i: number) =>
        i === index && Number(item.quantity) > 1
          ? { ...item, quantity: Number(item.quantity) - 1 }
          : item
      ),
    }));

    if (storedCartData.products[index].quantity > 1) {
      const updatedCart = {
        ...storedCartData,
        products: storedCartData.products.map((product: any, i: number) =>
          i === index ? { ...product, quantity: product.quantity - 1 } : product
        ),
      };

      setStoredCartData(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // ? Delete function
  const deleteProduct = (
    e: React.MouseEvent,
    index: number,
    id: string,
    variantId: string
  ) => {
    e.preventDefault();
    // console.log(id, variantId);
    // console.log("cart products: ", cartProducts);

    const updatedCart = {
      ...storedCartData,
      products: storedCartData.products.filter(
        (product: any) =>
          !(product.id === id && product?.variantId === variantId)
      ),
    };
    // console.log(updatedCart);

    setStoredCartData(updatedCart);
    setCartProducts((prevState: any) => ({
      ...prevState,
      data: prevState.data.filter((product: any, i: number) => {
        // console.log("Product for filter : ", product);
        return !(
          product.product_pid === id && product.varient_pid === variantId
        );
      }),
    }));
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    dispatch(handleCartUpdate());
  };

  // ? Calculate totals
  const calculateTotals = () => {
    if (Array.isArray(cartProducts?.data)) {
      const subtotal = cartProducts.data.reduce((acc: number, product: any) => {
        return acc + product.mrp * product.quantity;
      }, 0);
      const shippingFee = 80; 
      const total = subtotal + shippingFee;

      return { subtotal, total };
    }
    return { subtotal: 0, total: 80 };
  };

  const { subtotal, total } = useMemo(calculateTotals, [cartProducts]);

  // ? Empty Cart
  const deleteCart = (e: any) => {
    e.preventDefault();

    const updatedCart = { products: [] };
    setStoredCartData(updatedCart);
    setCartProducts({ data: [] });

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    dispatch(handleCartUpdate());
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    const redirectUrl = `/${locale}/login?redirect=${pathName}`;
    router.push(redirectUrl);
  };

  // if (error)
  //   return (
  //     <div className="text-center text-xl font-md py-8">
  //       Something went wrong. Please reload
  //     </div>
  //   );

  return (
    <form>
      {loading ? (
        <div className="flex items-center justify-center">
          <ScaleLoader color="#421957" height={70} radius={8} width={10} />
        </div>
      ) : (
        <div>
          {storedCartData && storedCartData?.products?.length < 1 ? (
            <div>
              <EmptyCart />
            </div>
          ) : (
            <div>
              <div className="flex justify-end mb-6 ">
                <div>
                  <button
                    className="p-2 flex items-center gap-2 bg-dangerSecondary hover:bg-dangerPrimary text-white rounded-sm"
                    onClick={deleteCart}
                  >
                    {t("Delete_All")} <RiDeleteBin5Line />
                  </button>
                </div>
              </div>

              <div className="py-4 px-10 border border-brandLsPrimary rounded-md hidden md:block ">
                <table className="w-full">
                  <thead>
                    <tr className="text-brandHover text-center border-b border-brandLsPrimary">
                      {/* <th className="pb-2"> Select </th> */}
                      <th className="pb-2"> {t("Image")} </th>
                      <th className="pb-2"> {t("Product_Name")} </th>
                      <th className="pb-2"> {t("Product_Variant")} </th>
                      <th className="pb-2"> {t("Quantity")} </th>
                      <th className="pb-2"> {t("Unit_Price")} </th>
                      {/* <th className="pb-2"> Update Product </th> */}
                      <th className="pb-2"> {t("Total")} </th>
                      <th className="pb-2"> {t("Delete")} </th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartProducts?.data?.map(
                      (product: any, index: number) => {
                        const total = product.mrp * product.quantity;
                        return (
                          <tr
                            className="text-center border-b border-brandLsPrimary"
                            key={index}
                          >
                            <td className="py-3">
                              <div className="w-[60px] h-[75px] flex items-center justify-center mx-auto">
                                <Image
                                  src={product.cart_img}
                                  height={100}
                                  width={100}
                                  alt={product.product_name}
                                  className="h-full w-auto object-contain mx-auto"
                                />
                              </div>
                            </td>
                            <td className="py-3 max-w-[120px]">
                              <Link
                                href={`/${locale}/shop-now/products/${product.product_pid}`}
                                className="text-link truncate block"
                              >
                                {product.product_name}
                              </Link>
                            </td>
                            <td className="py-3 max-w-[120px]">
                              {product.varient_pid}
                            </td>

                            <td className="py-3">
                              <div className="flex items-center gap-2 justify-center mx-auto">
                                <button
                                  className="bg-brandDs text-white text-lg h-8 w-8 flex items-center justify-center rounded-full"
                                  onClick={(e) => {
                                    decrement(e, index, product.product_pid);
                                  }}
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  className={`p-2 w-16 text-center font-bold border border-brandLsPrimary bg-transparent ${styles.counterShadow}`}
                                  readOnly
                                  value={Number(product.quantity)}
                                />
                                <button
                                  className="bg-brandDs text-white text-lg h-8 w-8 flex items-center justify-center rounded-full"
                                  onClick={(e) => {
                                    increment(e, index, product.product_pid);
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </td>

                            <td className="py-3">
                              <p className="text-brandPrimary">
                                {product.mrp}{t("tk")}
                              </p>
                              <p className="text-greyPrimary line-through">
                                {product.mrp_primary}{t("tk")}
                              </p>
                            </td>

                            <td className="py-3">
                              <p className="text-brandPrimary">{total}{t("tk")}</p>
                            </td>

                            <td>
                              <button
                                className="bg-dangerSecondary hover:bg-dangerPrimary text-white p-2 rounded-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  deleteProduct(
                                    e,
                                    index,
                                    product.product_pid,
                                    product?.varient_pid
                                  );
                                }}
                              >
                                <RiDeleteBin5Line />
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>

                <div className="w-full md:w-[400px] ml-auto text-brandDs p-4 mb-8">
                  <div className="flex justify-between w-full mb-2">
                    <p className="font-bold">
                      {t("Subtotal")}{" "}
                      <span className="font-normal">
                        {" "}
                        ({cartProducts?.data?.length} {t("Items")}){" "}
                      </span>
                    </p>
                    <p>
                      {subtotal}
                      {t("tk")}
                    </p>
                  </div>
                  <div className="flex justify-between w-full mb-2">
                    <p className="font-bold">{t("Shipping_Fee")}</p>
                    <p>80{t("tk")}</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="font-bold">{t("Total")}</p>
                    <p className="text-success font-bold">
                      {total}
                      {t("tk")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4 my-4">
                {!customerPid && (
                  <p className="text-center">
                    {t("For_Checkout_need_to")}{" "}
                    <button
                      onClick={handleLogin}
                      className="text-link underline font-bold"
                    >
                      {t("LOGIN")}
                    </button>{" "}
                    {t("first")}
                  </p>
                )}
                <button
                  type="submit"
                  className="text-bgPrimary font-medium bg-brandDs w-full py-3 rounded-full hover:bg-brandHover disabled:bg-greyPrimary"
                  onClick={() => setActive("checkout")}
                  disabled={!customerPid}
                >
                  {t("Proceed_to_Checkout")}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* <CartMobile products={products} /> */}
    </form>
  );
};

export default Cart;
