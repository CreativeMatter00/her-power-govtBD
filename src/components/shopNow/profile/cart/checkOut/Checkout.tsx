"use client";
import { useForm } from "react-hook-form";
import HeadingPart from "./HeadingPart";
import BillingDetails from "./formPart/BillingDetails";
import CouponCode from "./formPart/CouponCode";
import Payment from "./formPart/Payment";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckOutSchema from "./CheckOutSchema";
import OrdersTotal from "./formPart/OrdersTotal";
import { FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo, url } from "@/api/api";
import CheckBoxInput from "./checkOutInputs/CheckBoxInput";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { handleCartUpdate } from "@/redux/Reducer/MainSlice";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTranslations } from "next-intl";
// 	============================ FORM INPUT SCHEMA ===========================
interface FormInputs {
  firstName: string;
  address: string;
  area: string;
  city: string;
  zipCode: string;
}
//  ================================== ORDER DETAILS TYPE DEFINITION  ===================================
interface OrderDetails {
  productImage: string;
  productName: string;
  productQuantity: number;
  productUnitPrice: number;
  shippingFee: number;
}
type ICheckoutProps = {
  setActive: any;
  cartProducts: any;
  setConfirmationDetails: any;
  resetAll: () => void;
};
// =================================== CHECKOUT COMPONENT ============================
const Checkout: FC<ICheckoutProps> = ({
  setActive,
  cartProducts,
  setConfirmationDetails,
  resetAll,
}) => {
  // console.log("cartProducts", cartProducts);

  const t = useTranslations("talentHunt");

  // ========================== FORM VALIDATION =======================
  const resolver = yupResolver(CheckOutSchema);
  // ======================== INITIALIZED ACTIVE STATE FOR PAYMENT METHOD ==============================
  const [activeTab, setActiveTab] = useState("onlinePayment");
  const [showBillingForm, setShowBillingForm] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [orderSummary, setOrderSummary] = useState({
    subTotal: 0,
    totalProducts: 0,
    total: 0,
  });
  const handleOrderSummary = (summary: {
    subTotal: number;
    totalProducts: number;
    total: number;
  }) => {
    setOrderSummary(summary);
  };
  // ? ================= USEFORM =================
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  // ? ================= Fetch user data =================

  const {
    isLoading,
    error,
    data: userData,
    refetch,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(userId),
  });
  // console.log("userData", userData);

  // ======================== SUBMIT FUNCTION =========================

  // console.log("cartProducts", cartProducts);

  const customerDeliverAddress = `
  				${userData?.customer_address},
                ${userData?.customer_area_name},
                ${userData?.customer_city_name},
                ${userData?.customer_zip_postal_code}`;

  const onSubmit = async (data: FormInputs) => {
    // alert(JSON.stringify(data));
    // console.log("CheckoutDetails: ", data);
    const newShippingAddress = `${data?.address}, ${data?.area}, ${data?.city}, ${data?.zipCode}`;
    const formattedOrders = cartProducts?.data.map((item: any) => ({
      //   ...item,
      enterpenure_pid: item?.enterpenure_pid,
      product_pid: item?.product_pid,
      varient_pid: item?.varient_pid,
      quantity: item?.quantity,
      mrp_price: item?.mrp,
      disc_pct: item?.disc_pct,
      disc_amt: 0,
      vat_pct: 0,
      vat_amt: 0,
      delivery_charge: 80,
    }));
    // console.log(formattedOrders);
    const formattedSubmit = {
      customer_pid: userData?.customer_pid,
      shiping_location: showBillingForm
        ? newShippingAddress
        : customerDeliverAddress,
      total_amount: orderSummary?.total,
      orders: formattedOrders,
    };
    try {
      const response = await axios.post(
        `${url}/api/admin/order`,
        // `test`,
        formattedSubmit
      );
      setConfirmationDetails(response?.data?.data);
      // console.log(response);
      if (response?.data?.meta?.status === true) {
        // ? Add to cart toast notification
        toast.success("Order Placed successfully!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        resetAll();
      }
      refetch();
      reset();
      setActive("confirmation");
    } catch (error) {
      console.error("Error submitting form:", error);
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
  };
  const userInfo = JSON.parse(localStorage.getItem("loginDetails") || "{}");
  const userId = userInfo.user_pid;
  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );
  // ? API Call
  return (
    <section className="bg-bgPrimary">
      <form onSubmit={handleSubmit(onSubmit)} className="container p-4">
        {/* <div> */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ======================== LEFT SIDE COMPONENTS ====================== */}
          ​
          <div className="basis-full lg:basis-1/2">
            {/* ================================= USER DATA ======================= */}
            <div className="border border-brandLsPrimary rounded-md mb-6 p-4">
              <div>
                <p>
                  <span className="font-bold"> {t("Name")}: </span>{" "}
                  {userData?.fname}
                  &nbsp; {userData?.lname}
                </p>
                <p>
                  <span className="font-bold"> {t("Address")}: </span>
                  {userData?.customer_address}, &nbsp;
                  {userData?.customer_area_name}, &nbsp;
                  {userData?.customer_city_name}, &nbsp;
                  {userData?.customer_zip_postal_code}
                </p>
              </div>
            </div>
            {/* ============================ CHECK BOX ================================= */}
            <div className="font-bold mb-4">
              <CheckBoxInput
                setShowBillingForm={setShowBillingForm}
                showBillingForm={showBillingForm}
                inputText={t("Use_a_different_shipping_address")}
                fontWeightClass="font-bold"
              />
              {/* </button> */}
            </div>
            {/* ============================== BILLING DETAILS FORM ==================== */}
            {showBillingForm && (
              <div className="border border-brandLsPrimary rounded-lg px-4 lg:px-10 pt-4 pb-6">
                {/* =========================== BILLING DETAILS =========================== */}
                <div className="flex justify-between items-center border-b border-brandLsPrimary pb-1">
                  <HeadingPart heading={t("Billing_Details")} option="" />
                  {/* ========================= CREATE ACCOUNT OPTION =========================== */}
                  {/* <p className="text-base text-link font-normal">
								Create an account
							</p> */}
                </div>
                <BillingDetails register={register} errors={errors} />
              </div>
            )}
          </div>
          ​
          {/* ============================ RIGHT SIDE COMPONENTS ================================ */}
          <div className="max-md:basis-full lg:basis-1/2">
            <div className="flex flex-col">
              {/* ========================= COUPON CODE COMPONENT ========================= */}
              {/* <div className="border border-brandLsPrimary rounded-lg px-4 lg:px-10 pt-4 pb-6">
                <div className="flex justify-between items-center border-b border-brandLsPrimary pb-1">
                  <HeadingPart
                    heading={t("Coupon_Code")}
                    option={t("Optional")}
                  />
                </div>
                <CouponCode register={register} errors={errors} />
              </div> */}
              {/* =============================== YOUR ORDER ============================== */}
              <div className="border border-brandLsPrimary rounded-lg px-4 lg:px-10 pt-4 pb-6">
                <div className="flex justify-between items-center border-b border-brandLsPrimary pb-1">
                  <HeadingPart heading="Your Order" />
                </div>
                <OrdersTotal
                  allOrders={cartProducts?.data}
                  getOrderSum={handleOrderSummary}
                />
              </div>
              ​
              {/* ============================ PAYMENT =================================== */}
              {/* <div className="border border-brandLsPrimary rounded-lg px-4 lg:px-10 pt-4 pb-6">
								<div className="flex justify-between items-center border-b border-brandLsPrimary pb-1">
									<HeadingPart heading="Payment" />
								</div>
								<Payment activeTab={activeTab} setActiveTab={setActiveTab} />
							</div> */}
              ​
              {/* ================================== PLACE ORDER ================================== */}
              <div className="w-full flex flex-col gap-4">
                <button
                  className="text-brandPrimary border border-brandPrimary font-medium bg-bgPrimary w-full py-3 rounded-full hover:bg-brandLsSecondary"
                  onClick={() => setActive("cart")}
                >
                  {t("Go_Back_to_Cart")}
                </button>
                <button
                  type="submit"
                  className="text-bgPrimary font-medium bg-brandDs w-full py-3 rounded-full hover:bg-brandHover"
                  //   onClick={() => setActive("confirmation", products)}
                  //   onClick={() => setActive("confirmation")}
                >
                  {t("Place_Order")}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </form>
      <ToastContainer />
    </section>
  );
};
export default Checkout;
