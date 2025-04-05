// -------------- FOR SHADOW --------------------
import { getSellerOrderInfo } from "@/api/api";
import styles from "@/styles/CourseAdmin.module.css";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC } from "react";
import { GoDotFill } from "react-icons/go";
import ScaleLoader from "react-spinners/ScaleLoader";

// -------------------------- ARRAY OF STATIC OBJECTS ----------------

const Dashboard: FC<{ sellerId: string; data: any }> = ({ sellerId, data }) => {
  const t = useTranslations("talentHunt");

  return (
    <div>
      {/* -------------- BUTTONS ----------------- */}

      <div className="container mx-auto"></div>

      {/* -------------- BUTTONS ----------------- */}

      {/* -------------- DASHBOARD ----------------- */}

      <div
        className="container mx-auto grid gap-8 py-10 border-b border-brandLsPrimary"
        style={{ gridTemplateColumns: "2fr 1fr" }}
      >
        <div className="my-4">
          {/* --------------------------- TITLE --------------- */}
          <h1 className="text-brandDs font-bold text-xl">
            {t("Dashboard_Overview")}
          </h1>

          {/* --------------------------- OVERVIEW CARDS --------------- */}
          <div className="mt-2">
            <div className="grid grid-cols-2 gap-8">
              <div
                className={`basis-full bg-white px-2 lg:px-5 py-3 border-2 border-brandLsPrimary ${styles.dashboardCard} rounded-xl`}
              >
                <div className="flex flex-col lg:gap-2 justify-center">
                  {/* ================ OVERVIEW TITLE ================ */}
                  <div>
                    <h1 className="text-sm lg:text-base font-bold text-[#a5a5a5]">
                      {t("Today_Sales")}
                    </h1>
                  </div>

                  {/* ======================== AMOUNT, ICONS ===================== */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                      {/* ---------------- TK ICON IMAGE -------------------- */}

                      <Image
                        src={`/assets/images/course/course admin/tk-icon.png`}
                        alt=""
                        width={20}
                        height={26}
                        className="w-auto h-6"
                      />

                      {/* ======================= AMOUNT ================== */}
                      <p className="text-xl lg:text-4xl text-brandPrimary font-normal">
                        {data?.data?.todays_order.toLocaleString("en-IN")||"0"}
                      </p>
                    </div>

                    <div>
                      <div
                        className={`flex items-center justify-center rounded-full `}
                      >
                        <Image
                          src={`/assets/images/shop-now/seller-dashboard/1.png`}
                          alt=""
                          width={56}
                          height={56}
                          className={`w-14 h-14`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`basis-full bg-white px-2 lg:px-5 py-3 border-2 border-brandLsPrimary ${styles.dashboardCard} rounded-xl`}
              >
                <div className="flex flex-col lg:gap-2 justify-center">
                  {/* ================ OVERVIEW TITLE ================ */}
                  <div>
                    <h1 className="text-sm lg:text-base font-bold text-[#a5a5a5]">
                      {t("Total_Sales_This_Month")}
                    </h1>
                  </div>

                  {/* ======================== AMOUNT, ICONS ===================== */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                      {/* ---------------- TK ICON IMAGE -------------------- */}

                      <Image
                        src={`/assets/images/course/course admin/tk-icon.png`}
                        alt=""
                        width={20}
                        height={26}
                        className="w-auto h-6"
                      />

                      {/* ======================= AMOUNT ================== */}
                      <p className="text-xl lg:text-4xl text-brandPrimary font-normal">
                        {data?.data?.current_month_order.toLocaleString(
                          "en-IN"
                        )||"0"}
                      </p>
                    </div>

                    <div>
                      <div
                        className={`flex items-center justify-center rounded-full `}
                      >
                        <Image
                          src={`/assets/images/shop-now/seller-dashboard/2.png`}
                          alt=""
                          width={56}
                          height={56}
                          className={`w-14 h-14`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`basis-full bg-white px-2 lg:px-5 py-3 border-2 border-brandLsPrimary ${styles.dashboardCard} rounded-xl`}
              >
                <div className="flex flex-col lg:gap-2 justify-center">
                  {/* ================ OVERVIEW TITLE ================ */}
                  <div>
                    <h1 className="text-sm lg:text-base font-bold text-[#a5a5a5]">
                      {t("Total_Orders")}
                    </h1>
                  </div>

                  {/* ======================== AMOUNT, ICONS ===================== */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                      {/* ---------------- TK ICON IMAGE -------------------- */}

                      {/* <Image
														src={`/assets/images/course/course admin/tk-icon.png`}
														alt=""
														width={20}
														height={26}
														className="w-auto h-6"
													/> */}

                      {/* ======================= AMOUNT ================== */}
                      <p className="text-xl lg:text-4xl text-brandPrimary font-normal">
                        {data?.data?.all_order.toLocaleString("en-IN")||"0"}
                      </p>
                    </div>

                    <div>
                      <div
                        className={`flex items-center justify-center rounded-full `}
                      >
                        <Image
                          src={`/assets/images/shop-now/seller-dashboard/3.png`}
                          alt=""
                          width={56}
                          height={56}
                          className={`w-14 h-14`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`basis-full bg-white px-2 lg:px-5 py-3 border-2 border-brandLsPrimary ${styles.dashboardCard} rounded-xl`}
              >
                <div className="flex flex-col lg:gap-2 justify-center">
                  {/* ================ OVERVIEW TITLE ================ */}
                  <div>
                    <h1 className="text-sm lg:text-base font-bold text-[#a5a5a5]">
                      {t("Total_Revenue")}
                    </h1>
                  </div>

                  {/* ======================== AMOUNT, ICONS ===================== */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                      {/* ---------------- TK ICON IMAGE -------------------- */}

                      <Image
                        src={`/assets/images/course/course admin/tk-icon.png`}
                        alt=""
                        width={20}
                        height={26}
                        className="w-auto h-6"
                      />

                      {/* ======================= AMOUNT ================== */}
                      <p className="text-xl lg:text-4xl text-brandPrimary font-normal">
                        {data?.data?.total_sale.toLocaleString("en-IN")||"0"}
                      </p>
                    </div>

                    <div>
                      <div
                        className={`flex items-center justify-center rounded-full `}
                      >
                        <Image
                          src={`/assets/images/shop-now/seller-dashboard/4.png`}
                          alt=""
                          width={56}
                          height={56}
                          className={`w-14 h-14`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-4">
          {/* --------------------------- TITLE --------------- */}
          <h1 className="text-brandDs font-bold text-xl">
            {t("Order_Management")}
          </h1>

          {/* -------------- ORDER MANAGEMENT ----------------- */}

          <div className="mt-2">
            <div
              className={`py-5 px-6 border-2 border-brandLsPrimary ${styles.dashboardCard} rounded-xl`}
            >
              <div className="flex items-center justify-between py-4 border-b border-greyTertiary">
                <div className="flex items-center gap-1">
                  <GoDotFill className="text-[#1EB0FF] text-3xl" />
                  <p className="font-bold text-greyPrimary">
                    {t("Processed_Orders")}
                  </p>
                </div>

                <div className="text-3xl text-brandPrimary">
                  {" "}
                  {data?.data?.total_processing_order ||"0"}{" "}
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-greyTertiary">
                <div className="flex items-center gap-1">
                  <GoDotFill className="text-[#FF6E1D] text-3xl" />
                  <p className="font-bold text-greyPrimary">
                    {t("Pending_Orders")}
                  </p>
                </div>

                <div className="text-3xl text-brandPrimary">
                  {" "}
                  {data?.data?.total_pending_order ||"0"}{" "}
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-greyTertiary">
                <div className="flex items-center gap-1">
                  <GoDotFill className="text-[#831EFF] text-3xl" />
                  <p className="font-bold text-greyPrimary">
                    {t("Completed_Orders")}
                  </p>
                </div>

                <div className="text-3xl text-brandPrimary">
                  {" "}
                  {data?.data?.total_complete_order ||"0"}{" "}
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-greyTertiary">
                <div className="flex items-center gap-1">
                  <GoDotFill className="text-[#40C900] text-3xl" />
                  <p className="font-bold text-greyPrimary">
                    {t("Cancelled_Orders")}
                  </p>
                </div>

                <div className="text-3xl text-brandPrimary">
                  {" "}
                  {data?.data?.total_cancel_order ||"0"}{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// {overviews.map((overview, index) => (

// 	<div
// 		key={index}
// 		className={`basis-full bg-white px-2 lg:px-5 py-3 border-2 border-brandLsPrimary ${styles.dashboardCard} rounded-xl`}
// 	>
// 		<div className="flex flex-col lg:gap-2 justify-center">

// 				<h1 className="text-sm lg:text-base font-bold text-[#a5a5a5]">
// 					{overview.overViewTitle}
// 				</h1>
// 			</div>

// 			<div className="flex justify-between items-center mt-4">
// 				<div className="flex items-center gap-2">

// 					{overview?.tkIcon && (
// 						<Image
// 							src={`/${overview.tkIcon}`}
// 							alt=""
// 							width={20}
// 							height={26}
// 							className="w-auto h-6"
// 						/>
// 					)}

// 					<p className="text-xl lg:text-4xl text-brandPrimary font-normal">
// 						{overview.amount}
// 					</p>
// 				</div>

// 				<div>
// 					<div
// 						className={`flex items-center justify-center rounded-full `}
// 					>
// 						<Image
// 							src={`/${overview.overviewIconImage}`}
// 							alt=""
// 							width={56}
// 							height={56}
// 							className={`w-14 h-14`}
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</div>
// ))}
