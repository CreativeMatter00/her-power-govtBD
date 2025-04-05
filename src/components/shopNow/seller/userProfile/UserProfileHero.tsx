import { getSellerBasicInfo, getUserInfo, url } from "@/api/api";
import StarRating from "@/components/shared/RenderStars";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { LuPackagePlus } from "react-icons/lu";
import { toast, ToastContainer } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import { useCookies } from "next-client-cookies";

type IHeroProps = {
  active: string;
  setActive: Function;
  //   sellerId: string;
  userInfo: any;
};

const UserProfileHero: React.FC<IHeroProps> = ({
  active,
  setActive,
  //   sellerId,
  userInfo,
}) => {
  const t = useTranslations("talentHunt");
  const router = useRouter();
  const locale = useLocale();

  // console.log(userInfo);

  const sellerId = userInfo && userInfo?.enterpenure_pid;
  const userId = userInfo && userInfo?.user_pid;

  const {
    isLoading: isUserLoading,
    error: userError,
    data: userData,
    refetch: userDataRefetch,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(userId),
  });

  // console.log("user data for seller ", userData);
  // ? Get Seller Basic Information
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getSellerBasicInfo"],
    queryFn: () => getSellerBasicInfo(sellerId),
  });

  // console.log('JJJJ',data);

  // ? Handle Logout

  const cookies = useCookies();

  const handleLogout = () => {
    localStorage.clear();
    // cookies.remove("");
    document.cookie.split(";").forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    });

    // Clear cookies
    // const cookies = document.cookie.split(";");

    // for (let i = 0; i < cookies.length; i++) {
    //   const cookie = cookies[i];
    //   const eqPos = cookie.indexOf("=");
    //   const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //   document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    // }
    router.push("/");
  };

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something_went_wrong")}
      </div>
    );

  //? updating image functionalities

  const handleButtonClick = () => {
    // Trigger the hidden file input click when the button is clicked
    fileInputRef.current?.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      // console.log("File selected:", file);

      const imageData = new FormData();
      imageData.append("attachments", file);
      imageData.append("ref_pid", userData.user_pid);

      const printFormData = (formData: FormData) => {
        formData.forEach((value, key) => {
          // if (value instanceof File) {
          //   console.log(`${key}: File - ${value.name}`);
          // } else {
          //   console.log(`${key}: ${value}`);
          // }
        });
      };

      printFormData(imageData);

      try {
        const response = await axios.post(
          `${url}/api/admin/update-profile-photo`,
          imageData
        );
        userDataRefetch();
        if (response?.data?.meta?.status) {
          toast.success("Image updated successfully!", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Something went wrong", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      // console.log("No file selected");
    }
  };

  return (
    <div>
      <div className="bg-brandLsSecondary">
        {isLoading ? (
          <div className="w-screen h-screen flex justify-center items-center">
            <ScaleLoader color="#421957" height={70} radius={8} width={10} />
          </div>
        ) : (
          <div className="container mx-auto">
            <div className="flex max-md:flex-col max-md:justify-center justify-between items-center">
              <div className="flex items-center max-md:flex-col max-md:justify-center justify-start">
                <div className="flex flex-col items-center py-8">
                  <Image
                    src={
                      userData?.profile_photo || 
                      `/assets/images/profile/seller.png`
                    }
                    alt="user image"
                    width={180}
                    height={192}
                    className="h-48 w-48 object-cover rounded-full border-2 border-brandDs z-10"
                  />
                  {/* <BiSolidPlusCircle className="w-8 h-8 -mt-4 text-brandPrimary z-20" />S */}
                  <div className="z-20">
                    <input
                      type="file"
                      ref={fileInputRef} // Reference to the file input
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }} // Hides the default file input
                    />
                    <button
                      onClick={handleButtonClick} // Trigger file input click
                      className="-mt-4 bg-slate-200 opacity-70 p-2 flex items-center justify-center rounded-full"
                    >
                      <FaCamera size={18} />
                    </button>
                  </div>
                </div>
                <div className="ml-5 my-2 font-normal text-brandPrimary">
                  <h1 className="max-md:text-xl text-3xl mb-4">
                    {/* MD. Samiul Ahmed Protik */}

                    {data.shop_name}
                  </h1>
                  <div className="flex items-center gap-4 mb-2">
                    <StarRating rating={data.seller_avg_rating} />
                    <p className="text-brandPrimary text-xl">
                      <span> {data.seller_avg_rating} </span> / {data.seller_total_rating}{" "}
                    </p>
                    <p className="text-brandPrimary">
                      {" "}
                      ({t("Total")} {data.seller_total_rating} {t("ratings")}){" "}
                    </p>
                  </div>

                  <div className="flex items-center text-brandPrimary gap-1 mb-4">
                    <p className=" text-xl">
                      <BsFillPatchCheckFill />
                    </p>
                    <p className=" text-sm"> {t("Verified_Seller")} </p>
                  </div>

                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-0 lg:gap-8 text-brandPrimary">
                    <div>{data.total_followers} {t("Followers")}</div>
                    <div>
                      {data.positive_rating_percentage}%{" "}
                      {t("Positive_Seller_Ratings")}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="bg-dangerPrimary px-8 py-2 rounded-3xl text-sm text-bgPrimary"
                  onClick={handleLogout}
                >
                  {t("Logout")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto my-4">
        <div className="flex max-md:flex-col flex-row justify-end items-center gap-4">
          <div className="flex max-md:justify-between gap-4 max-md:w-full">
            {/* -------------- SHARE BUTTON ----------------- */}
            {/* --------------- REACT ICON  ---------------  */}
            {/* <div>
							<button className="border border-brandPrimary rounded-full p-2">
								<IoShareSocialOutline className="w-5 h-5 text-brandPrimary" />
							</button>
						</div> */}
            <div className="border border-brandPrimary rounded-full py-2 px-8">
              {/* -------------- VIEW ALL PRODUCTS ----------------- */}
              <Link href={`/${locale}/shop-now/seller/dashboard/all-product`}>
                <button className="flex justify-center items-center gap-2 text-base">
                  <IoEyeOutline className="h-5 w-6" />
                  {t("View_All_Products")}
                </button>
              </Link>
            </div>
          </div>
          <div className="bg-brandPrimary rounded-full py-2 max-md:w-full px-8">
            {/* ----------------- ADD NEW PRODUCT --------------- */}
            <Link href={`/${locale}/shop-now/seller/dashboard/add-product`}>
              <button className="flex justify-center items-center gap-2 text-base text-[#ffffff]">
                <LuPackagePlus className="h-5 w-6" />
                {t("Add_New_Product")}
              </button>
            </Link>
          </div>
        </div>

        {/* ----------------- TABS --------------- */}
        <div className="">
          <div className="my-4">
            <div className="border-b-2 border-brandLsPrimary flex items-center gap-4 py-2">
              <div
                className={`font-bold cursor-pointer ${
                  active === "dashboard" ? "text-brandDs" : "text-greyPrimary"
                }`}
                onClick={() => setActive("dashboard")}
              >
                {t("Dashboard")}
              </div>
              <div
                className={`font-bold cursor-pointer ${
                  active === "myAccount" ? "text-brandDs" : "text-greyPrimary"
                }`}
                onClick={() => setActive("myAccount")}
              >
                {t("My_Account")}
              </div>
              <div
                className={`font-bold cursor-pointer ${
                  active === "chat" ? "text-brandDs" : "text-greyPrimary"
                }`}
                onClick={() => setActive("chat")}
              >
                {t("Chat")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfileHero;
