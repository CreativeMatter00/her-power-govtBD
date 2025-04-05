/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import styles from "@/styles/Order.module.css";
import { statusColors, statusLabels } from "@/utils/status";

type IOrderCard = {
  image: string;
  productName: string;
  qty: number;
  unitPrice: number;
  total: number;
  orderStatus: number;
};

const OrderCard = (props: IOrderCard) => {
  return (
    <div
      className={`text-brandPrimary py-4 border-b border-brandDs ${styles.orderCard}`}
      // style={{ gridTemplateColumns: "2fr 5fr 1fr 1fr 1fr" }}
    >
      <div>
        <img
          src={props.image}
          // height={150}
          // width={150}
          alt="product"
          className="h-12 w-auto md:h-24"
        />
      </div>
      <div className="text-link">
        <p>{props.productName}</p>
        <p className="text-brandPrimary md:hidden"> Qty:{props.qty} </p>
      </div>
      <div className={statusColors[props.orderStatus]}>
        {statusLabels[props.orderStatus]}
      </div>
      <div className="text-brandPrimary hidden md:block text-center">
        {props.qty}
      </div>
      <div className="text-brandPrimary text-center">{props.unitPrice}tk.</div>
      <div className="text-brandPrimary text-center"> {props.total}tk. </div>
    </div>
  );
};

export default OrderCard;
