import { getCustomerOrderCount } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { FC } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

type userInfo = {
  userData: any;
};

const UserOrders: FC<userInfo> = ({ userData }) => {
  const t = useTranslations("talentHunt");
  const locale = useLocale();
  const customerId = userData.customer_pid;

  const {
    isLoading: isCustomerOrderCountLoading,
    error: customerOrderCountError,
    data: customerOrderCountData,
  } = useQuery({
    queryKey: ["sellerInfoDetails", customerId],
    queryFn: async ({ queryKey }) => {
      const customerId = queryKey[1] as string;
      return await getCustomerOrderCount(customerId);
    },
  });
  // console.log(customerOrderCountData?.data);

  if (isCustomerOrderCountLoading) {
    <p>{t("Not_loading_customer_order_count")}</p>;
  }
  if (customerOrderCountError) {
    <p>{t("Error_fetching_customer_order_count")}</p>;
  }
  if (isCustomerOrderCountLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );
  return (
    <>
      <div className="flex flex-col lg:flex-row max-md:justify-center justify-evenly items-center gap-4 my-6 text-base text-brandPrimary">
        <div className="flex justify-between items-center w-full border border-brandLsPrimary rounded-md px-4 py-2">
          <p>
            {t("All_Order")}:{" "}
            <span className="text-xl">
              {customerOrderCountData?.data?.all_orders}
            </span>
          </p>
          <Link href={`/${locale}/shop-now/profile/orders`}>
            <p className="text-link cursor-pointer">{t("View_Order_List")}</p>
          </Link>
        </div>
        <div className="flex justify-between items-center w-full border border-brandLsPrimary rounded-md px-4 py-2">
          <p>
            {t("My_Active_Order")}:{" "}
            <span className="text-xl">
              {" "}
              {/* {customerOrderCountData?.active_orders}{" "} */}
              {customerOrderCountData?.data?.active_orders}{" "}
            </span>
          </p>
          <Link href={`/${locale}/shop-now/profile/active-orders`}>
            <p className="text-link cursor-pointer">{t("View_Active_Order")}</p>
          </Link>
        </div>
        <div className="flex justify-between items-center w-full border border-brandLsPrimary rounded-md px-4 py-2">
          <p>
            {t("Previous_Order")}:
            <span className="text-xl">
              {customerOrderCountData?.data?.previous_orders}
            </span>
          </p>
          <Link href={`/${locale}/shop-now/profile/previous-orders`}>
            <p className="text-link cursor-pointer">
              {t("View_Previous_Order")}
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserOrders;
