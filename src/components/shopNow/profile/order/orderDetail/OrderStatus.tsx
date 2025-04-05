import OrderDelivered from "@/components/shared/svg/OrderDelivered";
import OrderPlace from "@/components/shared/svg/OrderPlace";
import OrderProcessed from "@/components/shared/svg/OrderProcessed";
import { useTranslations } from "next-intl";
import { FaCheck } from "react-icons/fa6";
import { GoDash } from "react-icons/go";

interface OrderStatusProps {
  status: number;
}

const OrderStatus = ({ status }: OrderStatusProps) => {
  const t = useTranslations("talentHunt");

  const getColor = (step: number) =>
    status >= step ? "fill-success" : "fill-gray-400";
  const getIconColor = (step: number) =>
    status >= step ? "text-success" : "text-gray-400";

  return (
    <div>
      {/* Desktop View */}
      <ol className="items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base hidden md:flex">
        <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <div className="flex flex-col items-center gap-2">
              <OrderPlace color={getColor(1)} />
              <p className={status >= 1 ? "text-success" : "text-gray-500"}>
                {" "}
                {t("Order_Pending")}{" "}
              </p>
            </div>
          </span>
        </li>

        <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <div className="flex flex-col items-center gap-2">
              <OrderProcessed color={getColor(2)} />
              <p className={status >= 2 ? "text-success" : "text-gray-500"}>
                {" "}
                {t("Order_Processing")}{" "}
              </p>
            </div>
          </span>
        </li>

        <li className="flex items-center">
          <div className="flex flex-col items-center gap-2">
            <OrderDelivered color={getColor(3)} />
            <p className={status === 3 ? "text-success" : "text-gray-500"}>
              {" "}
              {t("Delivered")}{" "}
            </p>
          </div>
        </li>
      </ol>

      {/* Mobile View */}
      <ol className="overflow-hidden block md:hidden">
        <ul className="list-disc list-inside text-lg font-medium">
          <li className={`${getIconColor(1)} flex items-center gap-4`}>
            <FaCheck />
            <p> {t("Order_Pending")} </p>
          </li>
          <li className={`${getIconColor(2)} flex items-center gap-4`}>
            <FaCheck />
            <p> {t("Order_Processing")} </p>
          </li>
          <li className={`${getIconColor(3)} flex items-center gap-4`}>
            <GoDash />
            <p> {t("Delivered")} </p>
          </li>
        </ul>
      </ol>
    </div>
  );
};

export default OrderStatus;
