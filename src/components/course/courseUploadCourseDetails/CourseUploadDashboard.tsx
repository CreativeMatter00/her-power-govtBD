import { useTranslations } from 'next-intl';
import Image from 'next/image'
import React from 'react'

export default function CourseUploadDashboard() {
  const t = useTranslations("talentHunt");
  return (
    <div>
        <div className="mt-2">
            <div className="grid grid-cols-4 gap-[18px]">
              <div
                className={`basis-full bg-white px-2 lg:px-5 py-3 border-2 border-brandLsPrimary rounded-xl`}
              >
                <div className="flex flex-col lg:gap-2 justify-center">
                  {/* ================ OVERVIEW TITLE ================ */}
                  <div>
                    <h1 className="text-sm lg:text-base font-bold text-[#a5a5a5]">
                      {t("Today_Sales")}
                      {/* {(Today Course Sales)} */}
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
                        {"0"}
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
                className={`basis-full bg-white px-2 lg:px-5 py-3 border-2 border-brandLsPrimary rounded-xl`}
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
                        {"0"}
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
                className={`basis-full bg-white px-2 lg:px-5 py-3 border-2 border-brandLsPrimary  rounded-xl`}
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
                      <p className="text-xl lg:text-4xl text-brandPrimary font-normal">
                        {"0"}
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
                className={`basis-full bg-white px-2 lg:px-5 py-3 border-2 border-brandLsPrimary rounded-xl`}
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
                        {"0"}
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
  )
}
