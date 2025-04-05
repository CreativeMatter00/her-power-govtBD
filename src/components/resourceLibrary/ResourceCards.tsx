// "use client";
import Link from "next/link";
import React from "react";
import { IoMdArrowForward } from "react-icons/io";
import { useLocale } from "next-intl";
import ResCard from "./ResCard";
interface cardProps {
  card_pid: string;
  cardImage: string;
  cardTitle: string;
  cardDate: any;
  cardDes: string;
}
interface ResourceCardProps {
  title: string;
  data: cardProps[];
  allLink: string;
}
const ResourceCards: React.FC<ResourceCardProps> = ({
  title,
  data,
  allLink,
}) => {
  const locale = useLocale();
  return (
    <div className="mt-6">
      <h1 className="text-brandDs text-3xl font-normal">{title}</h1>
      <div className="border-b border-brandLsPrimary w-full my-6"></div>
      <div className="grid   md:grid-cols-3 grid-cols-1 gap-x-8 gap-y-8 my-6">
        {data?.map((items: any, index: number) => (
          <ResCard
            key={index}
            card_pid={items.card_pid}
            cardImage={items.cardImage}
            cardTitle={items.cardTitle}
            cardDate={items.cardDate}
            cardDes={items.cardDes}
            title={title}
          />
        ))}
      </div>
      {/* =============================   SEE ALL ======================== */}
      <div className="flex justify-end mt-6">
        <Link href={`/${locale}/${allLink}`}>
          <div className="flex items-center gap-2 text-brandPrimary cursor-pointer group ">
            <p className="text-base hover:underline underline-offset-2">
              See all
            </p>
            <IoMdArrowForward className="w-5 h-5" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ResourceCards;
