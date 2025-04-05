"use client";
import { adminEmail } from "@/api/api";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const SuccessStoriesNavbar = () => {
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const cookies = useCookies();
    const email = cookies.get("email");
  return (
    <ul className="flex justify-evenly items-center gap-6 max-md:text-sm text-base text-bgPrimary font-normal h-full">
      <Link
        href={`/${locale}/success-stories`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("home")}
      </Link>
      <Link
        href={`/${locale}/success-stories/stories`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("Success Stories")}
      </Link>
      {email === adminEmail && <Link
        href={`/${locale}/success-stories/add-stories`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("Add Success Stroy")}
      </Link>}
      {email === adminEmail&& <Link
        href={`/${locale}/success-stories/stories/stories-management`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("Success Stories Management")}
      </Link>}
    </ul>
  );
};

export default SuccessStoriesNavbar;
