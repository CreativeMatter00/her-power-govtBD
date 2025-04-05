import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";

// Define the Product type
type IProduct = {
  product_name: string;
  cart_img: string;
  quantity: number;
  mrp: number;
  total_price: number;
};

// Define the props for the Cart component
type ICartProps = {
  setActive: any;
  // products: IProduct[];
  products: any;
  confirmationDetails: any;
};

const Confirmation: FC<ICartProps> = ({
  setActive,
  products,
  confirmationDetails,
}) => {
  const locale = useLocale();
  const t = useTranslations("talentHunt");

  const formatDate = (dateString: string) => {
    const options: any = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  // ================================== CALCULATION SUBTOTAL ==================================
  const subTotal = products?.data?.reduce((acc: any, order: any) => {
    return acc + order.quantity * order.mrp;
  }, 0);

  // ========================== TOTAL NO OF PRODUCTS ============================
  const totalProducts = products?.data?.reduce((acc: any, order: any) => {
    return acc + order.quantity;
  }, 0);

  // ==================== SUBTOTAL WITH SHIPPING COST ===========================

  const shippingFee = 80;
  const total = subTotal + (shippingFee || 0);

  return (
    <div>
      {/* ---------------- Confirmation Message ---------------- */}

      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <div className="bg-success text-white rounded-full p-4">
          <AiOutlineLike className="text-5xl" />
        </div>
        <div className="text-3xl font-bold text-brandPrimary">
          <p> {t("Thank_you")} </p>
          <p>{t("Your_order_has_been_received")}</p>
        </div>

        <div className="text-brandPrimary">
          <p> {t("We_are_getting_started_on_your_order_right_away")} </p>
          <p>
            {t(
              "you_will_receive_an_order_confirmation_email_shortly_to_your_email"
            )}
          </p>
        </div>
      </div>

      <div className="flex justify-between py-4 border-b border-brandLsPrimary mb-4">
        <div>
          <p className="text-greyPrimary"> {t("Order_ID")}# </p>
          <p className="text-brandDs font-bold">
            {" "}
            {confirmationDetails?.order_pid}{" "}
          </p>
        </div>

        <div className="text-right">
          <p className="text-greyPrimary"> {t("Order_Date")} </p>
          <p className="text-brandDs font-bold">
            {formatDate(confirmationDetails?.order_date)}
          </p>
        </div>
      </div>

      {/* ---------------- Products ---------------- */}

      <div>
        {products?.data?.map((product: any, index: number) => {
          return (
            <div
              key={index}
              className="flex gap-8 border-b border-brandLsPrimary py-4"
            >
              <div>
                <Image
                  src={product.cart_img}
                  height={100}
                  width={100}
                  alt="product"
                  className="h-[100px] rounded-md"
                />
              </div>

              <div className="flex-grow text-brandPrimary">
                <p className=" font-bold"> {product.product_name} </p>
                <p>
                  {" "}
                  {t("Quantity")}: {product.quantity}{" "}
                </p>
              </div>

              <div className="text-right text-brandPrimary">
                {product.total_price} {t("Taka")}
              </div>
            </div>
          );
        })}

        <div className="w-full md:w-[400px] ml-auto text-brandDs p-4 mb-8">
          <div className="flex justify-between w-full mb-2">
            <p className="font-bold">
              {t("Subtotal")}
              {/* <span className="font-normal"> (3 Items) </span> */}
            </p>
            <p> {subTotal} </p>
          </div>
          <div className="flex justify-between w-full mb-2">
            <p className="font-bold">{t("Shipping_Fee")}</p>
            <p> {shippingFee} </p>
          </div>
          <div className="flex justify-between w-full">
            <p className="font-bold">{t("Total")}</p>
            {/* <p className="text-success font-bold"> {total} </p> */}
            <p className="text-success font-bold">
              {" "}
              {confirmationDetails?.total_amount}{" "}
            </p>
          </div>
        </div>

        {/* ---------------- Address ---------------- */}

        <div className="mb-10">
          <p className="pb-4 border-b border-brandLsPrimary">
            {t("Shipping_Details")}
          </p>
          <div className="py-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-brandDs mb-1"> {t("Customer_Detail")} </p>
                <p>
                  {" "}
                  {confirmationDetails?.fname} {confirmationDetails?.lname}{" "}
                </p>
                <p> {confirmationDetails?.email}</p>
                <p> {confirmationDetails?.mobile_no} </p>
              </div>
              <div>
                <p className="text-brandDs mb-1"> {t("Shipping_Address")} </p>
                {confirmationDetails?.shiping_location}
              </div>
              {/* <div>
								<p className="text-brandDs mb-1"> Billing Address </p>
								<p> House No: 1, Road: 1, Block A </p>
								<p> Mirpur Section 10 </p>
								<p> Dhaka - North </p>
								<p> Dhaka - 1216 </p>
							</div> */}
              <div>
                <p className="text-brandDs mb-1"> {t("Payment")} </p>
                <p>{t("Cash_on_delivery")} </p>
              </div>
            </div>
          </div>
        </div>
        {/* ---------------- Buttons ---------------- */}

        <div className="flex items-center justify-center flex-col md:flex-row gap-4">
          <button
            className="px-10 py-4 rounded-full border border-brandPrimary text-sm hover:bg-brandDs hover:text-white"
            onClick={() => setActive("checkout")}
          >
            {t("Checkout")}
          </button>
          <Link href={`/${locale}/shop-now/profile/active-orders`}>
          <button className="px-10 py-4 rounded-full border border-brandPrimary text-sm hover:bg-brandDs hover:text-white">
            {t("View_your_order")}
          </button>
          </Link>

          <Link href={`/${locale}/shop-now`}>
            <button className="px-10 py-4 rounded-full border border-brandPrimary bg-brandDs text-white text-sm hover:bg-brandHover">
              {t("Go_to_shop_now")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
