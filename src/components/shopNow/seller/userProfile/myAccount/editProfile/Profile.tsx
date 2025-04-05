"use client";
import { useState } from "react";
import MyProfile from "./MyProfile";
import EditProfileForm from "./EditProfileForm";
import EditPassword from "./EditPassword";

import { useQuery } from "@tanstack/react-query";
import { getSellerInfo } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useCookies } from "next-client-cookies";
import { useTranslations } from "next-intl";

const Profile = () => {
  const t = useTranslations("talentHunt");
  const cookies = useCookies();
  const userId = cookies.get("user_pid") || "";
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [editPassword, setEditPassword] = useState<boolean>(false);

  const handleProfileInformaiton = () => {
    setEditProfile(!editProfile);
    setEditPassword(false);
  };

  const {
    isLoading,
    error,
    data: sellerInfoData,
    refetch,
  } = useQuery({
    queryKey: ["sellerInfoDetails", userId],
    queryFn: async ({ queryKey }) => {
      const userId = queryKey[1] as string;
      return await getSellerInfo(userId);
    },
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
        <div className="mb-3">
          {!editProfile ? (
            <button
              className="mt-6 border border-brandPrimary rounded-full px-6 py-1"
              onClick={() => setEditProfile(true)}
            >
              <h1 className="text-xl font-normal text-brandPrimary hover:text-link">
                {t("Edit_your_profile")}
              </h1>
            </button>
          ) : (
            <div className="flex gap-6 mt-6">
              <button
                className="mt-6 border border-brandPrimary rounded-full px-6 py-1"
                onClick={handleProfileInformaiton}
              >
                <h1 className="text-xl font-normal text-brandPrimary hover:text-link">
                  {t("Profile_Informaiton")}
                </h1>
              </button>{" "}
              <button
                className="mt-6 border border-brandPrimary rounded-full px-6 py-1"
                onClick={() => setEditPassword(true)}
              >
                <h1
                  className={`text-xl font-normal  hover:text-link ${
                    editPassword ? "text-link" : "text-brandPrimary"
                  }`}
                >
                  {t("Change_Password")}
                </h1>
              </button>
            </div>
          )}
        </div>

        {/* ======================== PROFILE INFO , EDIT FORM ========================= */}
        {editProfile ? (
          <>
            {!editPassword ? (
              <EditProfileForm
                setEditProfile={setEditProfile}
                sellerInfoData={sellerInfoData}
                refetch={refetch}
              />
            ) : (
              <EditPassword
                setEditPassword={setEditPassword}
                setEditProfile={setEditProfile}
                userId={userId}
              />
            )}
          </>
        ) : (
          <MyProfile sellerInfoData={sellerInfoData} />
        )}
      </section>
    </>
  );
};

export default Profile;
