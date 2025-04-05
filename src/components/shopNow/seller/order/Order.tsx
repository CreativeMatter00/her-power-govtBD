import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "next-intl";
import Image from "next/image";

const products = [
  {
    image: "/assets/images/shop-now/product/1.jpg",
    title: "Pink Flower Vase",
    qty: 2,
    unitPrice: 1200,
    totalPrice: 2400,
  },
  {
    image: "/assets/images/shop-now/product/2.jpg",
    title: "DIY Rattan Style Lamp",
    qty: 1,
    unitPrice: 1200,
    totalPrice: 1200,
  },
  {
    image: "/assets/images/shop-now/product/3.jpg",
    title: "Pink Flower Vase",
    qty: 3,
    unitPrice: 1200,
    totalPrice: 3600,
  },
];

const Order = () => {
  const t = useTranslations("talentHunt");

  return (
    <div className="container mx-auto py-6">
      <div className="mb-4">
        <p className="font-bold text-brandDs mb-2">
          {" "}
          {t("Order_Progression")}{" "}
        </p>
        <p className="text-brandPrimary">
          {" "}
          Tic on the current state of the order{" "}
        </p>
      </div>

      {/* ORDER PROGRESSION  */}

      <div className="flex flex-wrap gap-4 mb-20">
        <div className="flex items-center space-x-2 rounded-lg shadow-lg pl-2">
          <Checkbox id="processed" />
          <label
            htmlFor="processed"
            className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 p-6 text-brandPrimary"
          >
            {t("Order_Processed")}
          </label>
        </div>

        <div className="flex items-center space-x-2 rounded-lg shadow-lg pl-2">
          <Checkbox id="shipped" />
          <label
            htmlFor="shipped"
            className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 p-6 text-brandPrimary"
          >
            {t("Order_Shipped")}
          </label>
        </div>

        <div className="flex items-center space-x-2 rounded-lg shadow-lg pl-2">
          <Checkbox id="route" />
          <label
            htmlFor="route"
            className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 p-6 text-brandPrimary"
          >
            Order En Route
          </label>
        </div>

        <div className="flex items-center space-x-2 rounded-lg shadow-lg pl-2">
          <Checkbox id="delivered" />
          <label
            htmlFor="delivered"
            className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 p-6 text-brandPrimary"
          >
            {t("Order_Delivered")}
          </label>
        </div>
      </div>

      {/* ORDER DETAIL  */}

      <div>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between pb-5 border-b border-brandDs">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <p className="text-xl font-bold text-brandPrimary">
              {" "}
              {t("Order_ID")}# HPO001{" "}
            </p>
            <p className="text-warning text-sm"> {t("In_Progress")} </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <p className="text-greyPrimary">
              {" "}
              {t("Estimated_delivery_date")}:{" "}
            </p>
            <p className="text-brandPrimary"> 30 April, 2024 </p>
          </div>
        </div>

        <div>
          <div>
            <div
              className="grid gap-2 text-brandPrimary font-bold pt-4 pb-8"
              style={{ gridTemplateColumns: "3fr 4fr 1fr 1fr 1fr" }}
            >
              <div> {t("Image")} </div>
              <div> {t("Product_Name")} </div>
              <div> {t("Qty")} </div>
              <div> {t("Unit_Price")} </div>
              <div> {t("Total")} </div>
            </div>

            {products.map((product, index) => {
              return (
                <div
                  className="grid gap-2 text-brandPrimary py-4 border-b border-brandDs"
                  style={{ gridTemplateColumns: "3fr 4fr 1fr 1fr 1fr" }}
                  key={index}
                >
                  <div>
                    <Image
                      src={product.image}
                      height={300}
                      width={300}
                      className="max-h-[150px] w-auto"
                      alt="product"
                    />
                  </div>
                  <div className="text-link "> {product.title} </div>
                  <div> {product.qty} </div>
                  <div> {product.unitPrice} </div>
                  <div> {product.totalPrice} </div>
                </div>
              );
            })}
          </div>
          <div className="w-full md:w-[400px] ml-auto text-brandDs p-4 mb-8">
            <div className="flex justify-between w-full mb-2">
              <p className="font-bold">
                Subtotal <span className="font-normal"> (3 Items) </span>
              </p>
              <p> 4000tk. </p>
            </div>
            <div className="flex justify-between w-full mb-2">
              <p className="font-bold">{t("Shipping_Fee")}</p>
              <p> 80tk. </p>
            </div>
            <div className="flex justify-between w-full">
              <p className="font-bold">{t("Total")}</p>
              <p className="text-success font-bold"> 4080tk. </p>
            </div>
          </div>
        </div>

        <div className="my-10">
          <div className="bg-bgSecondary border border-brandLsPrimary rounded-lg py-4 px-6">
            <div className="flex justify-between">
              <div>
                <p className="text-dangerPrimary font-bold mb-2">
                  {t("Do_cancel_order")}
                </p>

                <p className="text-brandPrimary">
                  {t("Cancelling_order_will_notify_the_buyer_via_email_and")}
                </p>
              </div>

              <div>
                <button className="bg-dangerPrimary text-white py-4 px-10 rounded-full">
                  {" "}
                  {t("Cancel_Order")}{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
