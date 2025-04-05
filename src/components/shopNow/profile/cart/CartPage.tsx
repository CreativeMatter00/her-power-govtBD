"use client";

import { useState } from "react";
import CartStepper from "./CartStepper";
import Cart from "./Cart";
import Checkout from "./checkOut/Checkout";
import Confirmation from "./Confirmation";
import { useDispatch } from "react-redux";
import { handleCartUpdate } from "@/redux/Reducer/MainSlice";
import { useTranslations } from "next-intl";

const CartPage = () => {
  const t = useTranslations("talentHunt");

  const [active, setActive] = useState("cart");
  const dispatch = useDispatch();

  const [cartProducts, setCartProducts] = useState<any>({ data: [] });

  const [confirmationDetails, setConfirmationDetails] = useState<any>();

  const resetAll = () => {
    const cart = { products: [] };
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(handleCartUpdate());
  };

  return (
    <div>
      <div className="container mx-auto py-10">
        {
          cartProducts?.data?.length >0 && 
        <CartStepper active={active} />
        }
        {active === "cart" && (
          <Cart
            setActive={setActive}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
        )}
        {active === "checkout" && (
          <Checkout
            setActive={setActive}
            cartProducts={cartProducts}
            setConfirmationDetails={setConfirmationDetails}
            resetAll={resetAll}
          />
        )}
        {active === "confirmation" && (
          <Confirmation
            setActive={setActive}
            products={cartProducts}
            confirmationDetails={confirmationDetails}
          />
        )}
      </div>
    </div>
  );
};

export default CartPage;
