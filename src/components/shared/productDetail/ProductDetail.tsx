"use client";

import SellerChat from "./SellerChat";
import YouMayAlsoLike from "../YouMayAlsoLike";
import ProductReview from "../ProductReview";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  api,
  getAllReviews,
  getProductDetails,
  getProductDetailsChat,
  getProductDetailWithCustomerId,
  url,
} from "@/api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import InitialInformation from "./InitialInformation";
import ProductRating from "./ProductRating";
import { PiChatsFill } from "react-icons/pi";
import InputField from "../input/InputField";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRef, useState } from "react";
import EventsPagination from "../EventsPagination";

interface IChatInfo {
  product_pid: string;
  message_sender_pid: string;
  message_recever_pid: string;
  review_content: string;
}

interface IFromInput {
  chat: string;
}

const ProductDetail = () => {
  // ======== Translation ========
  const t = useTranslations("ProductDetails");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [seeAllReview, setSeeAllReview] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFromInput>();

  // ========== Param and API ===========
  const param = useParams();
  const productId = Array.isArray(param.id) ? param.id[0] : param.id;
  // ================== LOGIN DETAILS ============
  // const userInfo = JSON.parse(localStorage.getItem("loginDetails") || "{}");
  // const customerId = userInfo.customer_pid;

  const userInfo =
    (typeof window !== "undefined" && localStorage.getItem("loginDetails")) ||
    "{}";
  // console.log(userInfo);
  const userInfoParsed = JSON.parse(userInfo);
  const customerId = userInfoParsed.customer_pid;

  // ================== PRODUCT DETAIL DATA FETCHING ================
  const {
    isLoading,
    error,
    data: productDetailData,
    refetch,
  } = useQuery({
    queryKey: ["productDetails", param.id, customerId],
    queryFn: async ({ queryKey }) => {
      const productId = queryKey[1] as string;
      const customerId = queryKey[2] as string | undefined;

      if (customerId) {
        return await getProductDetailWithCustomerId(productId, customerId);
      } else {
        return await getProductDetails(productId);
      }
    },
  });

  // =============== CHAT DATA FETCHING ==============

  const { isLoading:isChatLoading, data:chatData, error:chatError } = useQuery({
    queryKey: ["getProductDetailsChat", currentPage],
    queryFn: () => getProductDetailsChat(productId,currentPage),
  });
  // console.log(chatData);

  const {
    isLoading: allReviewLoading,
    isError: allReviewError,
    data: allReview,
  } = useQuery({
    queryKey: ["seeAllReview", productId],
    queryFn: () => getAllReviews(productId),
    enabled: seeAllReview,
  });

  // console.log("allReview", allReview);

  // ================================= Scroll to the ratings section ===================================
  const ratingsRef = useRef<HTMLDivElement>(null);

  const scrollToRatings = () => {
    if (ratingsRef.current) {
      ratingsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading || isChatLoading || allReviewLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  const onSubmit = async (data: { chat: string }) => {
    if (!data.chat.trim()) {
      toast.error("Chat cannot be empty.", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const chatInfo: IChatInfo = {
      product_pid: param.id as string,
      message_sender_pid: customerId,
      message_recever_pid: productDetailData?.data?.enterpenure_pid,
      review_content: data.chat,
    };

    try {
      const response = await api.post(
        `/api/admin/chat-with-seller`,
        chatInfo,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      refetch();
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
 
  const handleNextPage = () => {
    if (chatData?.data?.chatinfo?.current_page < chatData?.data?.chatinfo?.last_page) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (chatData?.data?.chatinfo?.current_page > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  return (
    <div className="">
      <ToastContainer />
      {/* =============== INITIAL INFORMATION ================== */}
      <InitialInformation
        data={productDetailData}
        scrollToRatings={scrollToRatings}
      />

      {/*-----------PRODUCT DESCRIPTION----------- */}
      <div className="container mx-auto px-4 py-6">
        <div
          className="py-8"
          dangerouslySetInnerHTML={{
            __html: productDetailData?.data?.description,
          }}
        />

        {/*-----------PRODUCT RATINGS----------- */}
        {/* <ProductRating data={productDetailData} /> */}
        <div ref={ratingsRef}>
          {" "}
          {/* Step 2: Attach ref here */}
          <ProductRating data={productDetailData} />
        </div>

        {/*----------- PRODUCT REVIEWS ----------- */}
        <ProductReview
          productData={productDetailData}
          seeAllReview={seeAllReview}
          allReview={allReview}
          setSeeAllReview={() => setSeeAllReview(true)}
          refetch={refetch}
        />

        {/* ----------- CHAT WITH SELLER ----------- */}
        {customerId && (
        <div className="mb-20">
          <div className="text-brandDs font-bold text-xl mb-4">
            <div className="flex items-center gap-4">
              {t("chatWithSeller")} <PiChatsFill />
            </div>
          </div>

          {/* ====================== SELLER CHAT ======================== */}

            <div className="mt-6 mb-8">
              {/* ======================== CHAT FORM ======================= */}
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="flex gap-4 items-start">
                  <InputField
                    type="text"
                    labelName="Send a chat"
                    placeholderText="Ask question here..."
                    mandatory={false}
                    inputName="chat"
                    register={register}
                    errors={errors}
                  />
                  <button
                    type="submit"
                    className="mt-7 bg-brandDs px-6 py-2 text-white rounded"
                  >
                    {t("Send")}
                  </button>
                </div>
              </form>
            </div>

          {/* ====================== CHAT HISTORY ======================== */}
          <SellerChat chatData={chatData?.data?.chatinfo?.data} />
          {
            chatData?.data?.chatinfo?.data.length && 
            <EventsPagination
              currentPage={currentPage}
              hasPreviousPage={chatData?.data?.chatinfo?.current_page > 1}
              hasNextPage={chatData?.data?.chatinfo?.current_page < chatData?.data?.chatinfo?.last_page}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
          }
        </div>
      )}
      </div>

      {/*-----------YOU MAY ALSO LIKE----------- */}
      <div className="pb-16 border-b border-brandLsPrimary">
        <div className="text-brandPrimary text-xl mb-6 container mx-auto">
          <p> {t("youMayAlsoLike")} </p>
        </div>

        <div className="container mx-auto">
          <YouMayAlsoLike data={productDetailData?.data?.you_may_also_like} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
