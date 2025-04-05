"use client";
import ProfileInformation from "./ProfileInformation";
import { useCookies } from "next-client-cookies";
import { useQuery } from "@tanstack/react-query";
import { getJobProviderDetailsById, getUserInfo } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";

const Profile = () => {
  const cookies = useCookies();
  const userPid = cookies.get("user_pid");
  const providerId = cookies.get("jobProvider_pid");

  const {
    isLoading: isUserLoading,
    error: userError,
    data: userData,
  } = useQuery({
    queryKey: ["userInfo", userPid],
    queryFn: () => getUserInfo(userPid as string),
  });
  const { isLoading, error, data } = useQuery({
    queryKey: ["providerInfo", providerId],
    queryFn: () => getJobProviderDetailsById(providerId as string),
  });
// console.log("ZZ",userData);

  if (isUserLoading || isLoading)
    return (
      <div className="min-h-[600px]">
        <div className="flex items-center justify-center">
          <ScaleLoader color="#421957" height={70} radius={8} width={10} />
        </div>
      </div>
    );

  if (userError) {
    // console.log("data fetching past event error");
    console.log(userError);
  }

  const providerInfo = Array.isArray(data) && data?.length > 0 ? data[0] : {};

  return (
    <aside className="basis-full">
      <ProfileInformation
        firstName={userData?.fname}
        lastName={userData?.lname}
        emailAddress={userData?.email}
        mobileNumber={userData?.mobile_no}
        address={userData?.address_line || userData?.customer_address}
        city={userData?.city_name|| userData?.customer_city_name}
        area={userData?.area_name || userData?.customer_area_name}
        zipCode={userData?.zip_postal_code || userData?.customer_zip_postal_code}
        companyName={providerInfo?.provider_name || "N/A"}
        companyType={providerInfo?.company_type || "N/A"}
        designation={providerInfo?.designation || "N/A"}
        companyAddress={providerInfo?.address_line || "N/A"}
        websiteUrl={providerInfo?.websites_name || "N/A"}
      />
    </aside>
  );
};

export default Profile;
