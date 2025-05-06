"use client";
import { adminEmail } from "@/api/api";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const ResourceLibraryNavbar = () => {
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const cookies = useCookies();
    const email = cookies.get("email");
  return (
    <ul className="flex justify-evenly items-center gap-6 max-md:text-sm text-base text-bgPrimary font-normal h-full">
      <Link
        href={`/${locale}/resource-library`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("home")}
      </Link>
      <Link
        href={`/${locale}/resource-library/articles`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("articles")}
      </Link>
      <Link
        href={`/${locale}/resource-library/documents`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("documents")}
      </Link>
      <Link
        href={`/${locale}/resource-library/videos`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("videos")}
      </Link>
      {email === adminEmail && <Link
        href={`/${locale}/resource-library/write-article`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("Write an Article")}
      </Link>}
      {email === adminEmail && <Link
        href={`/${locale}/resource-library/add-document`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("Add Document")}
      </Link>}
      {email === adminEmail && <Link
        href={`/${locale}/resource-library/add-videos`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("Add Videos")}
      </Link>}
      {email === adminEmail && <Link
        href={`/${locale}/resource-library/articles/article-management`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("Article Management")}
      </Link>}
      {email === adminEmail && <Link
        href={`/${locale}/resource-library/videos/video-management`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("Video Management")}
      </Link>}

      {email === adminEmail && <Link
        href={`/${locale}/resource-library/documents/document-management`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("Document Management")}
      </Link>}
    </ul>
  );
};

export default ResourceLibraryNavbar;
