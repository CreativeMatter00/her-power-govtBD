import { useLocale, useTranslations } from "next-intl";

export const Banner = ({
  price,
  provider,
}: {
  price: number;
  provider: string;
}) => {
  const t = useTranslations("career");

  return (
    <>
      <div className="bg-[#006A4D] rounded-lg my-4">
        <div className="flex max-md:flex-col  max-md:justify-center justify-between items-center max-md:gap-6 py-8 px-16">
          <div>
            <h6 className="text-[#FFFFFF] text-xl font-normal mb-2">
              {t("Course_by")}
            </h6>
            <h1 className="text-5xl font-bold">
              {/* Mehedi <br /> Hasan */}
              {provider}
            </h1>
          </div>
          {/* ------------------------- ENROLL BUTTON COURSE FEE -------------------- */}
          <div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-2xl text-[#FFFFFF]">
                {t("Full_Course_Fee")}
              </h1>
              <div className="flex justify-center items-start gap-2 font-bold mt-3">
                <p className="text-xl text-[#231F20]">{t("TK")}</p>
                <p className="text-white text-4xl">{price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
