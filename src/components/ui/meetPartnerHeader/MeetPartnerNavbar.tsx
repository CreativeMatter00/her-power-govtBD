"use client";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const MeetPartnerNavbar = () => {
  const locale = useLocale();
  const t = useTranslations("Blog");
  const cookies = useCookies();
  const user_pid = cookies.get("user_pid");
  return (
    <ul className="flex justify-evenly items-center gap-6 max-md:text-sm text-base text-bgPrimary font-normal h-full">
      {/* <Link
          href={`/${locale}/meet-partners`}
          className="cursor-pointer hover:underline underline-offset-8 decoration-2"
        >
          Home
        </Link> */}
      <Link
        href={`/${locale}/meet-partners/blogs/all-blogs`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("Blogs")}
      </Link>
      {/* <Link
        href={`/${locale}/events`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("Events")}
      </Link> */}
      {user_pid && <Link
        href={`/${locale}/meet-partners/write-blog`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("WriteBlog")}
      </Link>}
      {user_pid && <Link
        href={`/${locale}/meet-partners/blogs/blog-management`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("BlogManagement")}
      </Link>}
    </ul>
  );
};

export default MeetPartnerNavbar;
