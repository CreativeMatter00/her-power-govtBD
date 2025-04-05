/* eslint-disable react/no-unescaped-entities */

"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import { format } from "date-fns";
import ImageInput from "./input/ImageInput";
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";
import { useForm } from "react-hook-form";
import axios from "axios";
import { url } from "@/api/api";

interface ProductReviewProps {
  productData: Record<string, any>;
  refetch: Function;
  setSeeAllReview: () => void;
  allReview?: any;
  seeAllReview: boolean;
}

interface IFormData {
  review_content: string;
}

const ProductReview: React.FC<ProductReviewProps> = ({
  productData,
  refetch,
  setSeeAllReview,
  allReview,
  seeAllReview,
}) => {
  const t = useTranslations("ProductDetails");
  const locale = useLocale();
  // console.log(productData);
  const userInfo = JSON.parse(localStorage.getItem("loginDetails") || "{}");
  // console.log(userInfo);
  //   console.log(object)

  const [selectedImages, setSelectedImages] = useState<any>([]);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [ratingError, setRatingError] = useState<string | null>(null);

  const handleRating = (value: number) => {
    setRatingValue(value);
    setRatingError(null);
  };

  const getRatingText = (value: number) => {
    switch (value) {
      case 1:
        return "Very Poor";
      case 2:
        return "Poor";
      case 3:
        return "Moderate";
      case 4:
        return "Good";
      case 5:
        return "Very Good";
      default:
        return "";
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>();

  const onSubmit = async (data: { review_content: string }) => {
    // console.log(data);
    if (ratingValue === 0) {
      setRatingError("Rating is required.");
      return; // Prevent form submission
    }

    const reviewData = new FormData();

    reviewData.append("product_pid", productData?.data.product_pid);
    reviewData.append("customer_pid", userInfo.customer_pid);
    reviewData.append("enterpenure_pid", productData?.data.enterpenure_pid);
    reviewData.append("rating_marks", ratingValue.toString());
    reviewData.append("review_content", data.review_content);

    if (selectedImages.length > 0) {
      selectedImages.slice(0, 6).forEach((image: File, index: number) => {
        reviewData.append(`attachments[]`, image);
      });
    }

    try {
      const response = await axios.post(
        `${url}/api/frontend/review-rating`,
        reviewData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log("API Response:", response.data);
      // alert("Review submitted successfully");
      refetch();
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      // alert("Failed to submit review");
    }
  };

  return (
    <div className="mb-10">
      <div className="mb-6">
        <p className="font-bold text-xl text-brandDs mb-6">
          {t("customerReviews")}

          {locale === "bn" ? (
            <span className="text-sm">
              {" "}
              ({productData?.data?.total_rating}টি রেটিং){" "}
            </span>
          ) : (
            <span className="text-sm">
              {" "}
              {productData?.data?.total_rating > 0 ? (
                <>({productData?.data?.total_rating} reviews)</>
              ) : (
                <>(0 reviews)</>
              )}
            </span>
          )}
        </p>
      </div>

      {/* ============================= POST REVIEW =========================== */}
      {productData?.data?.eligible_for_review && (
        <div className="mr-16 ">
          {/* ======================== REVIEW FORM ======================= */}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ======================== REVIEW RATING ====================== */}
            <div className="flex gap-4 items-start">
              <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
                Rating: <span className="text-dangerPrimary">*</span>
              </label>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} onClick={() => handleRating(star)}>
                    {star <= ratingValue ? (
                      <GoStarFill className="text-brandPrimary cursor-pointer " />
                    ) : (
                      <GoStar className="text-brandPrimary cursor-pointer " />
                    )}
                  </span>
                ))}
              </div>
              <p>
                {ratingValue > 0 && (
                  <p className="text-greyPrimary text-sm">
                    ({getRatingText(ratingValue)})
                  </p>
                )}
              </p>
            </div>
            {ratingError && (
              <p className="text-dangerPrimary text-sm pl-6">{ratingError}</p>
            )}

            {/* ====================== TEXT REVIEW ========================= */}
            <div className="flex gap-8 w-full">
              <div className="w-1/2">
                <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
                  Review:
                </label>
                <textarea
                  rows={8}
                  className="mt-1 block outline-none placeholder:text-greyPrimary text-base py-2 px-4 border border-brandLsPrimary rounded-md w-full bg-white resize-none"
                  placeholder="Write a review here..."
                  {...register("review_content")}
                />
              </div>
              {/* =============================  REVIEW IMAGE ====================== */}
              <div className="h-52 w-1/2">
                <ImageInput
                  labelName="Select Image"
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                  fieldHeight="h-52"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-3 bg-brandDs px-6 py-2 text-white rounded"
              >
                Review
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-4">
        {productData?.data?.total_rating > 0 ? (
          <>
            {seeAllReview && allReview && (
              <>
                {allReview.data?.map((review: any, index: number) => {
                  const formattedDate = format(
                    new Date(review.rating_date),
                    "dd MMM, yyyy" // Format: 28 Apr, 2024
                  );
                  return (
                    <div
                      key={index}
                      className="border-b border-brandLsPrimary mb-4"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        {/* ====================== LEFT SIDE =================== */}
                        <div className="h-8 px-2 bg-success text-white flex items-center justify-center gap-2 rounded-md">
                          <p>{review.rating_marks}</p>
                          <FaStar />
                        </div>

                        {/* ========================= RIGHT SIDE ========================= */}
                        <div className="w-full">
                          <p className="text-brandPrimary">
                            {review.review_content}
                          </p>

                          <div className="w-full">
                            <div className="flex gap-4 my-6">
                              {review?.attachments?.map(
                                (attachment: any, index: number) => {
                                  return (
                                    <div key={index} className="">
                                      <a
                                        href={attachment.full_file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Image
                                          src={attachment.full_file_url}
                                          alt=""
                                          width={120}
                                          height={120}
                                          className="h-32 w-32"
                                        />
                                      </a>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                          <div className="text-greyPrimary text-sm mb-4">
                            <span> {review.customer_name} | </span>
                            <span> {formattedDate} </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            {!seeAllReview && !allReview && (
              <>
                {productData?.data?.reviewratings?.map(
                  (review: any, index: number) => {
                    const formattedDate = format(
                      new Date(review.rating_date),
                      "dd MMM, yyyy" // Format: 28 Apr, 2024
                    );
                    return (
                      <div
                        key={index}
                        className="border-b border-brandLsPrimary mb-4"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          {/* ====================== LEFT SIDE =================== */}
                          <div className="h-8 px-2 bg-success text-white flex items-center justify-center gap-2 rounded-md">
                            <p>{review.rating_marks}</p>
                            <FaStar />
                          </div>

                          {/* ========================= RIGHT SIDE ========================= */}
                          <div className="w-full">
                            <p className="text-brandPrimary">
                              {review.review_content}
                            </p>

                            <div className="w-full">
                              <div className="flex gap-4 my-6">
                                {review?.attachments?.map(
                                  (attachment: any, index: number) => {
                                    return (
                                      <div key={index} className="">
                                        <a
                                          href={attachment.full_file_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <Image
                                            src={attachment.full_file_url}
                                            alt=""
                                            width={120}
                                            height={120}
                                            className="h-32 w-32"
                                          />
                                        </a>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                            <div className="text-greyPrimary text-sm mb-4">
                              <span> {review.customer_name} | </span>
                              <span> {formattedDate} </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
                <button onClick={setSeeAllReview} className="text-link hover:underline">See All</button>
              </>
            )}
          </>
        ) : (
          <>
            <p className="mt-4">{t("There is no review for this product")}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductReview;
