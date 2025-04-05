"use client";
import { useQuery } from "@tanstack/react-query";
import AddNewVariant from "./AddVariant";
import EditProductInformation from "./EditProductInformation";
import EditVariant from "./EditVariant";
import { getProductDetails } from "@/api/api";
import { useParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";

const EditProductNew = () => {
  const params = useParams();
  const productId = params?.id;
  const {
    isLoading,
    error,
    data: productDetailData,
    refetch,
  } = useQuery({
    queryKey: ["productDetails", params.id],
    queryFn: () => getProductDetails(productId as string),
  });
  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );
  return (
    <>
      <section className="container p-4">
        <EditProductInformation
          productDetailData={productDetailData?.data}
          refetch={refetch}
        />
        <EditVariant
          variants={productDetailData?.data?.productvariants}
          refetch={refetch}
        />
        <AddNewVariant refetch={refetch} productId={productId} />
      </section>
      <ToastContainer />
    </>
  );
};

export default EditProductNew;
