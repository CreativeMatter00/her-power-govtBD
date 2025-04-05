"use client";
import Link from "next/link";
import ActiveOrderCard from "./activeOrder/ActiveOrderCard";
import PastOrderCard from "./previousOrder/PreviousOrderCard";
import { useQuery } from "@tanstack/react-query";
import { getOrderDetails, url } from "@/api/api";
import { format } from "date-fns";
import ScaleLoader from "react-spinners/ScaleLoader";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { statusColors, statusLabels } from "@/utils/status";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "next-client-cookies";

interface IProductInfo {
  product_name: string;
  product_pid: string;
  quantity: number;
}
interface IOrder {
  order_pid: string;
  order_id: number;
  total_amount: number;
  order_date: string;
  order_status: string;
  order_status_numb: number;
  products_info: IProductInfo[];
}

const Order = () => {
  const t = useTranslations("talentHunt");

  const cookies = useCookies();
  // const userInfo = JSON.parse(localStorage.getItem("loginDetails") || "{}");
  const customerId = cookies.get("customer_pid");
  const pathName = usePathname();
  const locale = useLocale();

  // =============== CHAT DATA FETCHING ==============
  const {
    isLoading: isOrderLoading,
    error: orderError,
    data: orderData,
    refetch,
  } = useQuery({
    queryKey: ["orderData", customerId],
    queryFn: async ({ queryKey }) => {
      const id = queryKey[1] as string;
      return await getOrderDetails(id);
    },
  });
  // console.log(orderData?.data);
  const handleProductRemove = async (orderPid: string, productPid: string) => {
    try {
      const apiUrl = `${url}/api/admin/cancel-order`;

      const response = await axios.post(apiUrl, {
        order_pid: orderPid,
        product_pid: productPid,
      });
      // console.log(response);
      if (response.statusText === "OK") {
        toast.success("Successfully Product Canceled!", {
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

  const handleCancelOrder = async (orderPid: string) => {
    // console.log(orderPid);
    try {
      const cancelOrderUrl = `${url}/api/admin/cancel-whole-order`;
      const response = await axios.post(cancelOrderUrl, {
        order_pid: orderPid,
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
          /<p className="text-grey"> {t("Orders")} </p>
        </div>
      </div>
      <div className="container mx-auto py-6">
        <div className="mb-10">
          <p className="text-brandPrimary font-bold mb-6">{"Active_Orders"}</p>
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
                  (activeOrder: IOrder, index: number) => {
                    const formattedDate = format(
                      new Date(activeOrder.order_date),
                      "dd MMM, yyyy" // Format: 28 Apr, 2024
                    );
                    const status = activeOrder.order_status_numb; // Fetching the status number
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
                          {activeOrder.products_info.map(
                            (product: IProductInfo, index: number) => (
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
                        {/* <div className="text-warning">Processing</div> */}
                        <div className={statusColors[status]}>
                          {statusLabels[status]}
                        </div>
                        <div className="flex items-center gap-12">
                          <div className="flex gap-2">
                            <Link
                              href={`${pathName}/${activeOrder.order_pid}?status=${status}&date=${formattedDate}`}
                              className="text-link"
                            >
                              {t("View_Order")}
                            </Link>
                          </div>
                          <div className="flex gap-2">
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

        <div className="mb-10">
          <p className="text-brandPrimary font-bold mb-6"> Previous Orders </p>
          <div className="overflow-x-auto">
            <div style={{ minWidth: "900px" }}>
              <div>
                <div
                  className="grid gap-2 border-b border-greyTertiary text-greyPrimary p-2"
                  style={{ gridTemplateColumns: "1fr 1fr 3fr 1fr 1fr 1fr 2fr" }}
                >
                  <div> SL no. </div>
                  <div> Order ID </div>
                  <div> Products </div>
                  <div> Total Cost (BDT) </div>
                  <div> Order Date </div>
                  <div> Status </div>
                  <div> Action </div>
                </div>
              </div>

              <div>
                {orderData?.data?.previewsOrder?.map(
                  (pastOrder: IOrder, index: number) => {
                    const formattedDate = format(
                      new Date(pastOrder.order_date),
                      "dd MMM, yyyy" // Format: 28 Apr, 2024
                    );

                    const status = pastOrder.order_status_numb; // Fetching the status number

                    return (
                      <div
                        key={index}
                        className="grid gap-2 py-4 border-b border-greyTertiary px-2 text-brandPrimary"
                        style={{
                          gridTemplateColumns: "1fr 1fr 3fr 1fr 1fr 1fr 2fr",
                        }}
                      >
                        <div> {index + 1} </div>
                        <div> HP{pastOrder.order_pid} </div>
                        <div>
                          {pastOrder?.products_info?.map(
                            (product: IProductInfo, index: number) => (
                              <div key={index}>
                                <div>
                                  {product.product_name} X {product.quantity}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                        <div> {pastOrder.total_amount} </div>
                        <div> {formattedDate} </div>
                        <div className="">
                          <div className={statusColors[status]}>
                            {statusLabels[status]}
                          </div>
                        </div>
                        <div className="flex items-center gap-12">
                          <div className="flex gap-2">
                            <Link
                              href={`${pathName}/${pastOrder.order_pid}?status=${status}&date=${formattedDate}`}
                              className="text-link"
                            >
                              View Order
                            </Link>
                          </div>
                          <div className="flex gap-2">
                            <button
                              // onClick={() =>
                              // 	handleCancelOrder(pastOrder.order_pid)
                              // }
                              className="text-dangerPrimary"
                            >
                              Cancel Order
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

export default Order;
