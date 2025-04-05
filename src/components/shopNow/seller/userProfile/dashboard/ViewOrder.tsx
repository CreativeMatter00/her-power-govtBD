"use client";

import React, {  useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Image from "next/image";
import {
  sellerOrderDetails,
  getProductDetails,
  url,
} from "../../../../../api/api";
import ScaleLoader from "react-spinners/ScaleLoader";

interface IEditProps {
  viewData: any;
  setEditModalOpen: any;
  refetch: any;
}

interface IProductDetails {
  file_url: string;
  order_pid: string;
  product_name: string;
  product_pid: string;
  quantity: number;
  mrp_price: number;
  delivery_charge: number;
  sales_amount: number;
  order_status: string;
}

const ViewOrder: React.FC<IEditProps> = ({
  viewData,
  setEditModalOpen,
  refetch,
}) => {
  const [productDetailsMap, setProductDetailsMap] = useState<{
    [key: string]: any;
  }>({});

  const {
    isLoading,
    isError,
    data: singleOrderDetails,
  } = useQuery({
    queryKey: ["singleOrderDetails"],
    queryFn: () => sellerOrderDetails(viewData?.order_pid),
  });

  // console.log("data", singleOrderDetails);

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Edit Order : {viewData?.order_pid || "Order ID"}
      </h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            {/* <th className="py-2 px-4">Order PID</th> */}
            <th className="py-2 pl-0 pr-2">Product Image</th>
            <th className="py-2 pl-0 pr-2">Product Name</th>
            <th className="py-2 pl-0 pr-2">Product PID</th>
            <th className="py-2 pl-0 pr-2">Quantity</th>
            <th className="py-2 pl-0 pr-2">MRP Price</th>
            <th className="py-2 pl-0 pr-2">Delivery Charge</th>
            <th className="py-2 pl-0 pr-2">Sales Amount</th>
            <th className="py-2 pl-0 pr-2">Current Status</th>
          </tr>
        </thead>
        <tbody>
          {singleOrderDetails?.map((product: IProductDetails) => {
            const productDetails = productDetailsMap[product.product_pid];

            return (
              <tr key={product?.order_pid} className="border-b">
                {/* <td className="py-2 px-4">{product?.order_pid}</td> */}
                <td className="py-2 px-4">
                  {(
                    <Image
                      src={product?.file_url || "/default-image.png"}
                      height={80}
                      width={80}
                      className="w-24 h-12 object-cover"
                      alt="Product Image"
                    />
                  )}
                </td>
                <td className="py-2 px-4">
                  {product?.product_name.slice(0, 15) || "Loading..."} ...
                </td>

                <td className="py-2 pl-8">{product?.product_pid}</td>

                <td className="py-2 pl-8">{product?.quantity}</td>
                <td className="py-2 pl-8">{product?.mrp_price}</td>
                <td className="py-2 pl-8">{product?.delivery_charge}</td>
                <td className="py-2 pl-8">{product?.sales_amount}</td>
                <td className="py-2 pl-8">{product?.order_status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default ViewOrder;
