import { useTranslations } from "next-intl";

const District = () => {
  const t = useTranslations("talentHunt");
  return (
    <>
      <div>
        <h1 className="text-xl font-bold text-[#252525] mb-4">
          {t("District")}
        </h1>
      </div>
    </>
  );
};

export default District;
