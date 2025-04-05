"use client";
import Link from "next/link";
import PreviousOrderCard from "./PreviousOrderCard";
import { useCookies } from "next-client-cookies";
import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "@/api/api";
import { format } from "date-fns";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useLocale, useTranslations } from "next-intl";
import { statusColors, statusLabels } from "@/utils/status";

interface ProductInfo {
  product_name: string;
  quantity: number;
}

interface Order {
  order_pid: string;
  order_id: number;
  total_amount: number;
  order_date: string;
  order_status: string;
  order_status_numb: number;
  products_info: ProductInfo[];
}

const PreviousOrder = () => {
  const t = useTranslations("talentHunt");

  const locale = useLocale();
  const cookies = useCookies();
  const customerPid = cookies.get("customer_pid");
  const {
    isLoading: isOrderLoading,
    error: orderError,
    data: orderData,
  } = useQuery({
    queryKey: ["orderData", customerPid],
    queryFn: async ({ queryKey }) => {
      const id = queryKey[1] as string;
      return await getOrderDetails(id);
    },
  });

  if (isOrderLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  // console.log("orderData", orderData);
  return (
    <>
      <div className="h-24 border-b border-brandLsPrimary flex flex-col justify-center">
        <div className="flex items-center container mx-auto gap-2">
          <Link href={`/${locale}/shop-now/profile`} className="text-link">
            {t("Profile")}
          </Link>
          /<p className="text-grey"> {t("Previous_Orders")} </p>
        </div>
      </div>
      <div className="container mx-auto py-8">
        <div className="mb-10">
          <p className="text-brandPrimary font-bold mb-6">
            {" "}
            {t("Previous_Orders")}{" "}
          </p>
          <div className="overflow-x-auto">
            <div style={{ minWidth: "900px" }}>
              <div>
                <div
                  className="grid gap-2 border-b border-greyTertiary text-greyPrimary p-2"
                  style={{ gridTemplateColumns: "1fr 1fr 3fr 1fr 1fr 1fr 2fr" }}
                >
                  <div>{t("SL_no")}</div>
                  <div>{t("Order_ID")}</div>
                  <div>{t("Products")}</div>
                  <div>{t("Total_Cost_BDT")}</div>
                  <div>{t("Order_Date")}</div>
                  <div>{t("Status")}</div>
                  <div>{t("Action")}</div>
                </div>
              </div>

              <div>
                {orderData?.data?.previewsOrder?.map(
                  (pastOrder: Order, index: number) => {
                    const formattedDate = format(
                      new Date(pastOrder.order_date),
                      "dd MMM, yyyy" // Format: 28 Apr, 2024
                    );

                    const status = pastOrder.order_status_numb;
                    return (
                      <div
                        key={index}
                        className="grid gap-2 py-4 border-b border-greyTertiary px-2 text-brandPrimary"
                        style={{
                          gridTemplateColumns: "1fr 1fr 3fr 1fr 1fr 1fr 2fr",
                        }}
                      >
                        <div> {index + 1} </div>
                        <div>{pastOrder.order_pid} </div>
                        <div>
                          {pastOrder.products_info.map((product, index) => (
                            <div key={index}>
                              <div>
                                {product.product_name} X {product.quantity}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div> {pastOrder.total_amount} </div>
                        <div> {formattedDate} </div>
                        <div className={statusColors[status]}>
                          {statusLabels[status]}
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/${locale}/shop-now/profile/orders/${pastOrder.order_pid}?status=${status}&date=${formattedDate}&previousOrder=true`}
                            className="text-link"
                          >
                            {t("View_Order")}
                          </Link>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviousOrder;
