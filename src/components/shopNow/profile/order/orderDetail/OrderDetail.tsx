"use client";
import Link from "next/link";
import OrderStatus from "./OrderStatus";
import OrderedProducts from "./OrderedProducts";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSingleOrderDetails } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect, useState } from "react";

const OrderDetail = () => {
  const t = useTranslations("talentHunt");

  const locale = useLocale();
  const params = useParams();
  const { id } = params;
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const activeOrder = searchParams.get("activeOrder");
  const previousOrder = searchParams.get("previousOrder");

  const {
    isLoading: singleOrderDetailsLoading,
    isError: singleOrderDetailsError,
    data: singleOrderDetailsData,
    refetch,
    error,
  } = useQuery({
    queryKey: ["singleOrderDetails"],
    queryFn: () => getSingleOrderDetails(id.toString()),
  });

  const [statusString, setStatusString] = useState(1);

  useEffect(() => {
    if (singleOrderDetailsData) {
      setStatusString(singleOrderDetailsData?.data?.[0]?.order_status_numb || 1);
    }
  }, [singleOrderDetailsData]);

  if (singleOrderDetailsLoading)
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
          /
          {activeOrder && (
            <Link
              href={`/${locale}/shop-now/profile/active-orders`}
              className="text-link"
            >
              {t("Active_Orders")}
            </Link>
          )}
          {previousOrder && (
            <Link
              href={`/${locale}/shop-now/profile/previous-orders`}
              className="text-link"
            >
              {t("Previous_Orders")}
            </Link>
          )}
          {!activeOrder && !previousOrder && (
            <Link
              href={`/${locale}/shop-now/profile/orders`}
              className="text-link"
            >
              {t("Orders")}
            </Link>
          )}
          /
          <p className="text-grey">
            {" "}
            {t("Order_ID")} {id}{" "}
          </p>
        </div>
      </div>
      <div className="container mx-auto py-6">
        <OrderStatus status={statusString} />
        <OrderedProducts
          singleOrderDetailsData={singleOrderDetailsData?.data}
          orderId={id.toString()}
          status={statusString}
          date={date?.toString()}
          activeOrder={activeOrder}
          previousOrder={previousOrder}
        />
      </div>
    </>
  );
};

export default OrderDetail;
