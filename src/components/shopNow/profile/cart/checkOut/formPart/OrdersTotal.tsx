// "use client";
import React, { useEffect } from "react";
import Order from "./Order";
import { useTranslations } from "next-intl";

//  ================================== ORDER DETAILS INTERFACE ===================================
interface OrderDetails {
  product_name: string;
  mrp_primary: string;
  mrp: number;
  quantity: number;
  total_price: number;
  cart_img: string;
}

// ================================= PROPS TYPE ===============================
interface Props {
  allOrders: OrderDetails[];
  getOrderSum: Function;
}

const OrdersTotal: React.FC<Props> = ({ allOrders, getOrderSum }) => {
  // console.log(allOrders);

  // ================================== CALCULATION SUBTOTAL ==================================
  const subTotal = allOrders?.reduce((acc, order) => {
    return acc + order.quantity * order.mrp;
  }, 0);

  // ========================== TOTAL NO OF PRODUCTS ============================
  const totalProducts = allOrders?.reduce((acc, order) => {
    return acc + order.quantity;
  }, 0);

  // ==================== SUBTOTAL WITH SHIPPING COST ===========================

  const shippingFee = 80;
  const total = subTotal + (shippingFee || 0);

  useEffect(() => {
    getOrderSum({ subTotal, totalProducts, total });
  }, [total]);

  const t = useTranslations("talentHunt");

  return (
    <>
      <div className="py-4">
        {/* ========================= SHOW ORDER LIST DETAILS ========================== */}
        <div>
          {allOrders?.map((order, index) => (
            <Order
              key={index}
              productImage={order.cart_img}
              productName={order.product_name}
              productQuantity={order.quantity}
              productUnitPrice={order.mrp}
            />
          ))}
        </div>

        {/* ========================= ALL COST FOR ORDER ======================== */}
        <div className="w-full flex items-center justify-end">
          <div className="w-full md:basis-1/2">
            <div className="flex justify-between border-b border-brandLsPrimary font-normal text-base pb-4 mb-1 w-full">
              <div className="flex flex-col gap-2 w-full px-4">
                <div className="flex justify-between items-center pt-4">
                  {/* ==================== SUBTOTAL COST ========================= */}
                  <div className="flex items-center gap-1">
                    <h1 className="text-brandDs">{t("Subtotal")}</h1>
                    <h3 className="text-greyPrimary">
                      ({totalProducts}
                      {t("Items")})
                    </h3>
                  </div>
                  <p className="text-brandPrimary">
                    {subTotal} {t("tk")}
                  </p>
                </div>
                {/* ======================== SHIPPING COST ====================== */}
                <div className="flex justify-between items-center w-full">
                  <h1 className="text-brandDs">{t("Shipping_Fee")}</h1>
                  <p className="text-brandPrimary">
                    {shippingFee || 0} {t("tk")}
                  </p>
                </div>
              </div>
            </div>
            {/* ========================== TOTAL COST ========================= */}
            <div className="flex justify-between items-center px-4 pt-4">
              <h1>{t("Total")}</h1>
              <p className="font-bold text-success">
                {total} {t("tk")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersTotal;
