import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";

interface Education {
  edu_dgree: string;
  group_department: string;
  passing_year: string;
  result_gpa: string;
  gpa_cgpa_outof: string;
}

interface Experience {
  experience_title: string;
  experience_desc: string;
  institution_name: string;
}

interface Achievement {
  achievment_title: string;
  achievment_desc: string;
}

interface IProps {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  emailAddress: string;
  address: string;
  city: string;
  area: string;
  zipCode: string;
  // education
  educationInfo: Education[];
  // experience
  experienceInfo: Experience[];
  // achievement
  achievementInfo: Achievement[];
}

const SeekerInformation: React.FC<IProps> = ({
  firstName,
  lastName,
  mobileNumber,
  emailAddress,
  address,
  city,
  area,
  zipCode,
  educationInfo,
  experienceInfo,
  achievementInfo,
}) => {
  const t = useTranslations("career");
  const locale = useLocale();
  return (
    <div className="my-6">
      {/* ---------------------------- personal information --------------------------------- */}
      <div>
        <div className="text-base font-bold pb-3 border-b border-brandLsPrimary mb-2 flex gap-4 items-center">
          {t("MyPersonalInformation")}
          <Link href={`/${locale}/career/job-seeker-edit`}>
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
          {t("EducationInformation")}
        </h1>
        {educationInfo?.map((edu: Education, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div>
              <h1 className="text-greyPrimary ml-6">{t("DegreeName")}</h1>
              <p className="px-6  py-1 mt-1">{edu?.edu_dgree}</p>
            </div>
            <div>
              <h1 className="text-greyPrimary ml-6">{t("Department")}</h1>
              <p className="px-6  py-1 mt-1">{edu?.group_department}</p>
            </div>

            <div>
              <h1 className="text-greyPrimary ml-6">{t("PassingYear")}</h1>
              <p className="px-6  py-1 mt-1">{edu?.passing_year}</p>
            </div>
            <div>
              <h1 className="text-greyPrimary ml-6">{t("Result")}</h1>
              <p className="px-6  py-1 mt-1">
                {edu?.result_gpa}{" "}
                <span className="text-xs font-bold">{t("outOf")}</span>{" "}
                {edu?.gpa_cgpa_outof}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h1 className="text-base font-bold pb-3 border-b border-brandLsPrimary mt-6 mb-2">
          {t("ExperienceInformation")}
        </h1>
        {experienceInfo?.map((experience: Experience, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div>
              <h1 className="text-greyPrimary ml-6">{t("Title")}</h1>
              <p className="px-6  py-1 mt-1">{experience?.experience_title}</p>
            </div>
            <div>
              <h1 className="text-greyPrimary ml-6">{t("ExperienceYear")}</h1>
              <p className="px-6  py-1 mt-1">{experience?.experience_desc}</p>
            </div>

            <div>
              <h1 className="text-greyPrimary ml-6">{t("PassingYear")}</h1>
              <p className="px-6  py-1 mt-1">{experience?.institution_name}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h1 className="text-base font-bold pb-3 border-b border-brandLsPrimary mt-6 mb-2">
          {t("Achievements")}
        </h1>
        {achievementInfo?.map((achievement: Achievement, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div>
              <h1 className="text-greyPrimary ml-6">{t("Title")}</h1>
              <p className="px-6  py-1 mt-1">{achievement?.achievment_title}</p>
            </div>
            {/* <div>
              <h1 className="text-greyPrimary ml-6">{t("Description")}</h1>
              <p className="px-6  py-1 mt-1">{achievement?.achievment_desc}</p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeekerInformation;
