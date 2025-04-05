import { getUserInfo } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import Image from "next/image";
import styles from "@/styles/Events.module.css";
import Link from "next/link";
import React from "react";

type blogProps = {
  title: string;
  userName: string;
  publishDate: string;
  description: string;
  image: string;
  id: string; 
};

function ChallengeCard({
  title,
  userName,
  publishDate,
  image,
  description,
  id,
}: blogProps) {
  const locale = useLocale();
  const { isLoading, data, error } = useQuery({
    queryKey: ["getUserInfo", userName],
    queryFn: () => getUserInfo(userName),
    enabled: !!userName,
  });
  const date = publishDate.split(' ')[0].split('-').reverse().join('-');
  const truncateText = (text: string, charLimit: number) => {
    if (text?.length > charLimit) {
      return text.slice(0, charLimit) + "...";
    }
    return text;
  };

  const truncatedDescription = truncateText(description, 43);
  return (
    <Link href={`/${locale}/challenges/challenge/${id}`}>
      <div className="min-h-[439px]">
        <div
          className={`flex flex-col gap-2 bg-cardColor ${styles.cardShadowHover} p-3 group cursor-pointer rounded h-full`}
        >
          {/* image */}
          <div className="relative rounded-md">
            {image && (
              <Image
                src={image}
                alt={`${title} blog image`}
                width={331}
                height={255}
                className="w-full h-[255px] rounded-md overflow-hidden"
              />
            )}
          </div>
          {/* texts */}
          <div className="px-4 flex flex-col gap-2">
            <p className="text-xl text-brandPrimary">
              {truncateText(title,30)}
            </p>
            {/*  */}
            <div className="flex items-center gap-2">
              <Image
                src={"/assets/images/meet-partners/icons/user 1.png"}
                alt="user icon"
                width={16}
                height={16}
              />
              <p className=" text-brandPrimary">
                {data?.fname} {data?.lname}
              </p>
              <Image
                src={"/assets/images/meet-partners/icons/Ellipse 246.png"}
                alt="dot icon"
                width={6}
                height={6}
              />
              <p className="text-sm text-[#989898]">
                {date}
              </p>
            </div>
            {/*  */}
            <p className="text-sm text-[#444444]"
              dangerouslySetInnerHTML={{ __html: truncatedDescription }}>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ChallengeCard;