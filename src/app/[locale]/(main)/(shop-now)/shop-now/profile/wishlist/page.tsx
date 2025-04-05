import WishlistPage from "@/components/shopNow/profile/wishlist/WishlistPage";
import { useTranslations } from "next-intl";
import Link from "next/link";

const page = () => {
  const t = useTranslations("talentHunt");

  return (
    <div>
      <div className="h-24 border-b border-brandLsPrimary flex flex-col justify-center">
        <div className="flex items-center container mx-auto gap-2">
          <Link href={"#"} className="text-link">
            {t("Profile")}
          </Link>
          /<p className="text-grey"> {t("Wishlist_&_Followed_Stores")} </p>
        </div>
      </div>
      <WishlistPage />
    </div>
  );
};

export default page;
