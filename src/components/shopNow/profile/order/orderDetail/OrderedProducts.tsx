import { calculateOrderSummary } from "@/utils/calculateOrderSummary";
import OrderCard from "./OrderCard";
import styles from "@/styles/Order.module.css";
import { statusColors, statusLabels } from "@/utils/status";
import { useTranslations } from "next-intl";

interface OrderData {
  delivery_charge: number;
  file_url: string;
  mrp_price: number;
  order_pid: string;
  order_status: string;
  order_status_numb: number;
  product_name: string;
  product_pid: string;
  quantity: number;
  sales_amount: number;
}

interface OrderedProductsProps {
  singleOrderDetailsData: OrderData[];
  orderId: string;
  status: number;
  date: string | undefined;
  activeOrder: any;
  previousOrder: any;
}

const OrderedProducts = ({
  singleOrderDetailsData,
  orderId,
  status,
  date,
  activeOrder,
  previousOrder,
}: OrderedProductsProps) => {
  const t = useTranslations("talentHunt");

  const orderSummary = calculateOrderSummary(singleOrderDetailsData);
  // console.log("singleOrderDetails", singleOrderDetailsData);
  return (
    <div className="mt-10 md:mt-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-brandDs">
        <div className="flex items-center gap-4">
          <p className="font-bold text-xl text-brandPrimary">
            {t("Order_ID")}# {orderId}
          </p>
          <div className={statusColors[status]}>{statusLabels[status]}</div>
        </div>
        <div className="flex items-center gap-4">
          <p className=" text-greyPrimary"> {t("Order_date")}: </p>
          <p className=" text-brandPrimary">{date}</p>
        </div>
      </div>

      <div
        className={`text-brandPrimary font-bold py-4 ${styles.orderCard}`}
        // style={{ gridTemplateColumns: "2fr 5fr 1fr 1fr 1fr" }}
      >
        <div> {t("Image")} </div>
        <div> {t("Product_Name")} </div>

        <div> {t("Status")} </div>
        <div className="hidden md:block text-center"> {t("Qty")} </div>
        <div className="text-center"> {t("Unit_Price")} </div>
        <div className="text-center"> {t("Total")} </div>
      </div>
      <div>
        {singleOrderDetailsData?.map((product, index) => {
          return (
            <OrderCard
              key={index}
              image={product.file_url}
              productName={product.product_name}
              qty={product.quantity}
              unitPrice={product.mrp_price}
              total={product.sales_amount}
              orderStatus={product?.order_status_numb}
            />
          );
        })}
      </div>

      <div className="w-full md:w-[400px] ml-auto text-brandPrimary p-4 mb-8">
        <div className="flex justify-between w-full">
          <p className="font-bold">
            {t("Subtotal")}{" "}
            <span className="font-normal">
              {" "}
              ({orderSummary.length} {t("Items")}){" "}
            </span>
          </p>
          <p>
            {" "}
            {orderSummary.subtotal}
            {t("tk")}{" "}
          </p>
        </div>
        <div className="flex justify-between w-full">
          <p className="font-bold">{t("Shipping_Fee")}</p>
          <p>
            {" "}
            {orderSummary.shippingFee}
            {t("tk")}{" "}
          </p>
        </div>
        <div className="flex justify-between w-full">
          <p className="font-bold">{t("Total")}</p>
          <p>
            {orderSummary.total}
            {t("tk")}{" "}
          </p>
        </div>
      </div>
      {/* {status !== 3 && (
        <button className="p-4 rounded-full bg-dangerPrimary text-white font-medium text-base hover:bg-dangerSecondary">
          Cancel Order
        </button>
      )} */}
    </div>
  );
};

export default OrderedProducts;
