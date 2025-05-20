"use client";

import { api } from "@/api/api";
import StarRating from "@/components/shared/RenderStars";
import { useCookies } from "next-client-cookies";
import { useLocale } from "next-intl";
import Link from "next/link";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { toast } from "react-toastify";

type IFollowedStoresCard = {
  name: string;
  id: string;
  entrepreneurId: string;
  rating: number;
  noOfRatings: number;
  followers: number;
  positiveRatingPercentage: string;
  refetch: any;
};

const FollowedStoresCard = (props: IFollowedStoresCard) => {
  const locale = useLocale();
  const cookies = useCookies();
  const customerId = cookies.get("customer_pid") || "";

//   const userData = JSON.parse(localStorage.getItem("loginDetails") || "{}");
//   const customerId = userData.customer_pid;

  const letter = props.name.charAt(0);

  // ? Store unfollow api

  const handleUnfollow = async () => {
    try {
      const response = await api.delete(
        `/api/admin/follower/${customerId},${props.entrepreneurId}`
      );
      // console.log("Response:", response?.data);
      // console.log("Response:", response?.data?.meta?.status);
      if (!response?.data?.meta?.status) {
        // console.log(response?.data?.meta?.status);
        toast.success("Unfollowed successfully!", {
          position: "bottom-left",
          autoClose: 3000,
        });
      }

      // toast.success("Store unfollowed successfully.", {
      // 	position: "bottom-left",
      // 	autoClose: 3001,
      // 	hideProgressBar: false,
      // 	closeOnClick: true,
      // 	pauseOnHover: true,
      // 	draggable: true,
      // 	progress: undefined,
      // 	theme: "light",
      // });
      props.refetch();
    } catch (error) {
      toast.error("Something went wrong", {
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

  return (
    <div className="bg-bgSecondary border border-brandLsPrimary rounded-md p-4 mb-4">
      <div className="flex gap-4">
        <div className="w-10 h-10 lg:w-[86px] lg:h-20 flex items-center justify-center text-white text-lg lg:text-5xl rounded-full bg-green-500 ">
          {letter}
        </div>

        <div className="w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-1 lg:gap-4 mb-2.5">
            <p className="text-brandPrimary text-xl md:text-3xl">
              {props.name}
            </p>
            <div className="flex items-center text-xl text-warning">
              <StarRating rating={props.rating} />
            </div>
            <div className="flex gap-2">
              <p className="text-brandPrimary px-auto lg:px-4">
                {props.rating} / 5
              </p>
              <p className="text-brandPrimary">
                (Total {props.noOfRatings} Ratings)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-2.5">
            <div className="flex items-center gap-1">
              <p className="text-link text-xl">
                <BsFillPatchCheckFill />
              </p>
              <p className="text-brandPrimary text-sm"> Verified Seller </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-2 justify-between w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-0 lg:gap-8 text-brandPrimary">
              <div>
                <span className="text-link"> {props.followers} </span> Followers
              </div>
              <div>
                <span className="text-success">
                  {props.positiveRatingPercentage}&nbsp;
                </span>
                Positive Seller Ratings
              </div>
            </div>

            <div className="flex gap-4">
              <button className="text-link text-base" onClick={handleUnfollow}>
                Unfollow
              </button>
              <Link
                href={`/${locale}/shop-now/seller-profile/${props.entrepreneurId}`}
                className="text-link text-base"
              >
                Visit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowedStoresCard;
