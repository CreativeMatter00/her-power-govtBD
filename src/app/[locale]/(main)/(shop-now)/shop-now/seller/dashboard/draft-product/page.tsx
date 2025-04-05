import DraftProducts from "@/components/shopNow/seller/sellerProfile/draftProducts/DraftProducts";
import { useTranslations } from "next-intl";
import Link from "next/link";

const page = () => {
  const t = useTranslations("talentHunt");
  return (
    <div>
      <div className="py-6 border-b-2 border-brandLsSecondary">
        <div className="flex items-center gap-2 text-brandPrimary container mx-auto">
          <Link href={"#"} className="text-link">
            {t("Dashboard")}
          </Link>
          /<p className="text-greyPrimary"> {t("Draft_Products")} </p>
        </div>
      </div>
      <DraftProducts />
    </div>
  );
};

export default page;
