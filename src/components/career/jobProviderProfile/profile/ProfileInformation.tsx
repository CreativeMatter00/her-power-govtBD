import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";

interface IProps {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  emailAddress: string;
  address: string;
  city: string;
  area: string;
  zipCode: string;
  companyName: string;
  companyType: string;
  designation: string;
  companyAddress: string;
  websiteUrl: string;
}

const ProfileInformation: React.FC<IProps> = ({
  firstName,
  lastName,
  mobileNumber,
  emailAddress,
  address,
  city,
  area,
  zipCode,
  companyName,
  companyType,
  designation,
  companyAddress,
  websiteUrl,
}) => {
  const t = useTranslations("career");
  const locale = useLocale();
  return (
    <div className="my-6">
      {/* ---------------------------- personal information --------------------------------- */}
      <div>
        <div className="text-base font-bold pb-3 border-b border-brandLsPrimary mb-2 flex gap-4 items-center">
          {t("myPersonalInfo")}
          <Link href={`/${locale}/career/job-provider-edit`}>
            <FaEdit />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          <div>
            <h1 className="text-greyPrimary ml-6">{t("firstName")}</h1>
            <p className="px-6  py-1 mt-1">{firstName}</p>
          </div>
          <div>
            <h1 className="text-greyPrimary ml-6">{t("mobileNumber")}</h1>
            <p className="px-6  py-1 mt-1">{mobileNumber}</p>
          </div>
          <div>
            <h1 className="text-greyPrimary ml-6">{t("Email")}</h1>
            <p className="px-6  py-1 mt-1">{emailAddress}</p>
          </div>
          <div>
            <h1 className="text-greyPrimary ml-6">{t("lastName")}</h1>
            <p className="px-6  py-1 mt-1">{lastName}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-base font-bold pb-3 border-b border-brandLsPrimary mt-6 mb-2">
          {t("MyAddresses")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h1 className="text-greyPrimary ml-6">{t("Address")}</h1>
            <p className="px-6  py-1 mt-1">{address}</p>
          </div>
          <div>
            <h1 className="text-greyPrimary ml-6">{t("City")}</h1>
            <p className="px-6  py-1 mt-1">{city}</p>
          </div>

          <div>
            <h1 className="text-greyPrimary ml-6">{t("Area")}</h1>
            <p className="px-6  py-1 mt-1">{area}</p>
          </div>
          <div>
            <h1 className="text-greyPrimary ml-6">{t("zipCode")}</h1>
            <p className="px-6  py-1 mt-1">{zipCode}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-base font-bold pb-3 border-b border-brandLsPrimary mt-6 mb-2">
          {t("CompanyInformation")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h1 className="text-greyPrimary ml-6">{t("CompanyName")}</h1>
            <p className="px-6  py-1 mt-1">{companyName}</p>
          </div>
          <div>
            <h1 className="text-greyPrimary ml-6">{t("CompanyType")}</h1>
            <p className="px-6  py-1 mt-1">{companyType}</p>
          </div>

          <div>
            <h1 className="text-greyPrimary ml-6">{t("Designation")}</h1>
            <p className="px-6  py-1 mt-1">{designation}</p>
          </div>
          <div>
            <h1 className="text-greyPrimary ml-6">{t("CompanyAddress")}</h1>
            <p className="px-6  py-1 mt-1">{companyAddress}</p>
          </div>
          <div>
            <h1 className="text-greyPrimary ml-6">{t("WebsiteURL")}</h1>
            <p className="px-6  py-1 mt-1">{websiteUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
