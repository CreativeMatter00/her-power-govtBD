import React from "react";
import Image from "next/image";
import styles from "@/styles/Events.module.css";
import { useLocale } from "next-intl";
import Link from "next/link";
import { SlCalender } from "react-icons/sl";
import { BiPlayCircle } from "react-icons/bi";
interface ResCardProps {
  card_pid: string;
  cardImage: string;
  cardTitle: string;
  cardDate: any;
  cardDes: string;
  title: string;
}
const placeholderImg =
  "/assets/images/events/Images/beth-jnr-0h-FN7oByyw-unsplash.png";
const ResCard: React.FC<ResCardProps> = ({
  card_pid,
  cardImage,
  cardTitle,
  cardDate,
  cardDes,
  title,
}) => {
  const locale = useLocale();
  const date=cardDate?.split(' ')[0].split('-').reverse().join('-');
  const truncateText = (text: string, charLimit: number) => {
    if (text?.length > charLimit) {
      return text.slice(0, charLimit) + "...";
    }
    return text;
  };

  const truncatedDescription = truncateText(cardDes, 43);
  return (
    <Link
      href={`/${locale}/resource-library/${title.toLowerCase()}/${card_pid}`}
    >
      <div
        className={`flex flex-col gap-2 bg-cardColor  ${styles.cardShadowHover} p-3 group cursor-pointer rounded h-full`}
      >
        <div className="relative rounded-md">
          <Image
            src={cardImage || placeholderImg}
            alt={cardTitle}
            width={244}
            height={165}
            className="w-full h-[255px] rounded-md"
          />
        {
          title==="Videos" && 
          <div className="absolute top-[42%] left-[42%] text-playButton">
            {" "}
            <BiPlayCircle size={40} />{" "}
          </div>
        }
        </div>

        <div
          className={`flex flex-col justify-between gap-2 px-3 h-full break-words`}
        >
          <div className="flex flex-col gap-2 ">
            <h1 className="text-xl text-brandPrimary font-normal ">
              {truncateText(cardTitle,30)}
            </h1>
            <p
        className="text-base font-normal text-admin_Text2"
        dangerouslySetInnerHTML={{ __html: truncatedDescription }}
      ></p>
            <div className="flex items-center gap-2">
              <SlCalender className="text-admin_Text2" />
              <p className="text-sm text-brandPrimary font-normal">
                {date}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResCard;
