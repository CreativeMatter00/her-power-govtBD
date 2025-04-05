"use client";
import { adminEmail } from "@/api/api";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const ChallengesNavbar = () => {
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const cookies = useCookies();
    const email = cookies.get("email");
  return (
    <ul className="flex justify-evenly items-center gap-6 max-md:text-sm text-base text-bgPrimary font-normal h-full">
      <Link
        href={`/${locale}/challenges`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("home")}
      </Link>
      <Link
        href={`/${locale}/challenges/challenge`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("Challenges")}
      </Link>

      {email === adminEmail && <Link
        href={`/${locale}/challenges/add-challenge`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("Add Challenge")}
      </Link>}
      {email === adminEmail && <Link
        href={`/${locale}/challenges/challenge/challenge-management`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("Challenges Management")}
      </Link>}
    </ul>
  );
};

export default ChallengesNavbar;
