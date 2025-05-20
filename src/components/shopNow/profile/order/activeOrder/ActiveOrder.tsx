"use client";
import { api, getOrderDetails } from "@/api/api";
import { statusColors, statusLabels } from "@/utils/status";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ScaleLoader from "react-spinners/ScaleLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActiveOrder = () => {
  const t = useTranslations("talentHunt");

  const locale = useLocale();
  const cookies = useCookies();
  const customerPid = cookies.get("customer_pid");
  const pathName = usePathname();
  const {
    isLoading: isOrderLoading,
    error: orderError,
    data: orderData,
    refetch,
  } = useQuery({
    queryKey: ["orderData", customerPid],
    queryFn: async ({ queryKey }) => {
      const id = queryKey[1] as string;
      return await getOrderDetails(id);
    },
  });

  const handleProductRemove = async (orderPid: string, productPid: string) => {
    try {
      const apiUrl = `/api/admin/cancel-order`;

      const response = await api.post(apiUrl, {
        order_pid: orderPid,
        product_pid: productPid,
      });
      // console.log(response);
      if (response.statusText === "OK") {
        // alert("Successfully Product Canceled!");
        toast.success("successfully Product Canceled!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        refetch();
      }
    } catch (error) {
      // alert("Product Canceled Failed");
      toast.error("Product Canceled Failed", {
        position: "bottom-left",
        autoClose: 3001,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  // console.log("orderData", orderData);

  const handleCancelOrder = async (orderId: string) => {
    // console.log(orderId);
    try {
      const cancelOrderUrl = `/api/admin/cancel-whole-order`;
      const response = await api.post(cancelOrderUrl, {
        order_pid: orderId,
      });
      // console.log(response);
      if (response.statusText === "OK") {
        toast.success("Order Successfully Canceled!", {
          position: "bottom-left",
          autoClose: 3001,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        refetch();
      }
    } catch (error) {
      toast.error("Order Canceled Failed", {
        position: "bottom-left",
        autoClose: 3001,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  if (isOrderLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <>
      <div className="h-24 border-b border-brandLsPrimary flex flex-col justify-center">
        <div className="flex items-center container mx-auto gap-2">
          <Link href={`/${locale}/shop-now/profile`} className="text-link">
            {t("Profile")}
          </Link>
          /<p className="text-grey"> {t("Active_Orders")} </p>
        </div>
      </div>
      <div className="container mx-auto py-6">
        <div className="mb-10">
          <p className="text-brandPrimary font-bold mb-6">
            {t("Active_Orders")}
          </p>
          <div className="overflow-x-auto">
            <div style={{ minWidth: "900px" }}>
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

              <div>
                {orderData?.data?.processingOrders?.map(
                  (activeOrder: any, index: number) => {
                    const formattedDate = format(
                      new Date(activeOrder.order_date),
                      "dd MMM, yyyy" // Format: 28 Apr, 2024
                    );

                    const status = activeOrder.order_status_numb;
                    return (
                      <div
                        key={index}
                        className="grid gap-2 py-4 border-b border-greyTertiary px-2 text-brandPrimary"
                        style={{
                          gridTemplateColumns: "1fr 1fr 3fr 1fr 1fr 1fr 2fr",
                        }}
                      >
                        <div>{index + 1}</div>
                        <div>{activeOrder.order_pid}</div>
                        <div>
                          {activeOrder?.products_info.map(
                            (product: any, index: number) => (
                              <div key={index}>
                                <div className="grid grid-cols-5 gap-5">
                                  <p className="col-span-3">
                                    {product.product_name} X {product.quantity}
                                  </p>{" "}
                                  <button
                                    onClick={() =>
                                      handleProductRemove(
                                        activeOrder.order_pid,
                                        product.product_pid
                                      )
                                    }
                                    className="text-dangerPrimary"
                                  >
                                    {t("Cancel")}
                                  </button>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                        <div>{activeOrder.total_amount}</div>
                        <div>{formattedDate}</div>
                        <div className={statusColors[activeOrder.order_status_numb]}>
                          {statusLabels[activeOrder.order_status_numb]}
                        </div>
                        <div className="flex gap-8">
                          <div className="flex gap-2">
                            <Link
                              href={`/${locale}/shop-now/profile/orders/${activeOrder.order_pid}?status=${activeOrder.order_status_numb}&date=${formattedDate}&activeOrder=true`}
                              className="text-link"
                            >
                              {t("View_Order")}
                            </Link>
                          </div>
                          <div>
                            <button
                              onClick={() =>
                                handleCancelOrder(activeOrder.order_pid)
                              }
                              className="text-dangerPrimary"
                            >
                              {t("Cancel_Order")}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ActiveOrder;
