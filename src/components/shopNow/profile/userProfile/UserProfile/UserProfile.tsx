"use client";

import { useQuery } from "@tanstack/react-query";
import PasswordForm from "../passwordForm/PasswordForm";
import { ShareNotification } from "../ShareNotification/ShareNotification";
import UserDetailedInfo from "../UserDetailedInfo/UserDetailedInfo";
import UserForm from "../UserForm/UserForm";
import UserInfo from "../UserInfo/UserInfo";
import UserOrders from "../UserOrders/UserOrders";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { getUserInfo } from "@/api/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTranslations } from "next-intl";

const UserProfile = () => {
  const t = useTranslations("talentHunt");

  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [editPassword, setEditPassword] = useState<boolean>(false);
  const userInfo = JSON.parse(localStorage.getItem("loginDetails") || "{}");
  const userId = userInfo.user_pid;

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(userId),
  });

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something_went_wrong")}
      </div>
    );

  const handleProfileInformation = () => {
    setEditProfile(!editProfile);
    setEditPassword(false);
  };
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <ScaleLoader color="#421957" height={70} radius={8} width={10} />
        </div>
      ) : (
        <section>
          {/* ======================================== BORDER ========================================= */}
          {/* <div className="bg-brandPrimary w-full h-36 text-brandLsPrimary"></div> */}
          {/* ====================================== USER PROFILE ===================================== */}

          <UserInfo userData={data} refetch={refetch} />

          {/* ======================================== BORDER ========================================= */}
          <div className="border-b border-brandLsPrimary w-full mb-4"></div>

          <main className="container">
            {/* =============================== NOTIFICATION ============================== */}
            <ShareNotification />
            {/* ================================ ORDERS ============================== */}
            <UserOrders userData={data} />
            <div>
              {editProfile ? (
                <div className="flex gap-6 items-center">
                  <div>
                    {/* ======================== SHOW PROFILE INFORMATION ============= */}
                    <button
                      type="button"
                      onClick={() => setEditProfile(!editProfile)}
                      className={`text-xl text-brandPrimary hover:text-link font-normal my-3 cursor-pointer`}
                    >
                      <div className="border border-brandPrimary rounded-3xl px-6 py-2">
                        <div className="flex items-center gap-2">
                          <FaRegEdit /> <p>{t("Profile_Information")}</p>
                        </div>
                      </div>
                    </button>
                  </div>
                  <div>
                    {/* =================== CHANGE PASSWORD ======================= */}
                    <button
                      type="button"
                      onClick={() => setEditPassword(true)}
                      className={`text-xl ${
                        editPassword ? "text-link" : "text-brandPrimary"
                      } hover:text-link font-normal my-3 cursor-pointer`}
                    >
                      <div className="border border-brandPrimary rounded-3xl px-6 py-2">
                        <div className="flex items-center gap-2">
                          <FaRegEdit /> <p>{t("Change_Password")}</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                // ========================== EDIT PROFILE =========================
                <button
                  type="button"
                  onClick={handleProfileInformation}
                  className={`text-xl text-brandPrimary hover:text-link font-normal my-3 cursor-pointer`}
                >
                  <div className="border border-brandPrimary rounded-3xl px-6 py-2">
                    <div className="flex items-center gap-2">
                      <FaRegEdit /> <p>{t("Edit_your_profile")}</p>
                    </div>
                  </div>
                </button>
              )}

              {editProfile ? (
                <div>
                  {editPassword ? (
                    <PasswordForm
                      setEditPassword={setEditPassword}
                      setEditProfile={setEditProfile}
                      userId={userId}
                    />
                  ) : (
                    <UserForm
                      setEditProfile={setEditProfile}
                      userData={data}
                      refetch={refetch}
                    />
                  )}
                </div>
              ) : (
                <UserDetailedInfo userData={data} />
              )}
            </div>
            <ToastContainer />
          </main>
        </section>
      )}
    </>
  );
};

export default UserProfile;
