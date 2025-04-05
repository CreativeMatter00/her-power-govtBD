import { useTranslations } from "next-intl";
import { FC } from "react";

type userInfo = {
  userData: any;
};

const UserDetailedInfo: FC<userInfo> = ({ userData }) => {
  const data = userData;
  const t = useTranslations("talentHunt");

  return (
    <>
      <div className="my-6">
        {/* ---------------------------- personal information --------------------------------- */}
        <div>
          <h1 className="text-base font-bold pb-3 border-b border-brandLsPrimary mb-2">
            {t("My_Personal_Information")}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            <div>
              <h1 className="text-greyPrimary ml-6"> {t("First_Name")}</h1>
              <p className="px-6 py-1 mt-1">{data && data.fname}</p>
            </div>
            <div>
              <h1 className="text-greyPrimary ml-6"> {t("Mobile_Number")}</h1>
              <p className="px-6 py-1 mt-1">{data && data.mobile_no}</p>
            </div>
            <div>
              <h1 className="text-greyPrimary ml-6">{t("Email")}</h1>
              <p className="px-6 py-1 mt-1">{data && data.email}</p>
            </div>
            <div>
              <h1 className="text-greyPrimary ml-6"> {t("Last_Name")}</h1>
              <p className="px-6 py-1 mt-1">{data && data.lname}</p>
            </div>
          </div>
        </div>

        {/* ---------------------------------------- My Address --------------------------------- */}
        <div>
          <h1 className="text-base font-bold pb-3 border-b border-brandLsPrimary mt-6 mb-2">
            {t("My_Addresses")}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h1 className="text-greyPrimary ml-6"> {t("Address")}</h1>
              <p className="px-6 py-1 mt-1">{data && data.customer_address}</p>
            </div>
            <div>
              <h1 className="text-greyPrimary ml-6">{t("City")}</h1>
              <p className="px-6 py-1 mt-1">
                {data && data.customer_area_name}
              </p>
            </div>
            <div>
              <h1 className="text-greyPrimary ml-6">{t("Area")}</h1>
              <p className="px-6 py-1 mt-1">
                {data && data.customer_city_name}
              </p>
            </div>
            <div>
              <h1 className="text-greyPrimary ml-6"> {t("Zip_Code")}</h1>
              <p className="px-6 py-1 mt-1">
                {data && data.customer_zip_postal_code}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailedInfo;
