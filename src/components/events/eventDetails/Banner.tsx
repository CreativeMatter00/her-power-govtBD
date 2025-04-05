import Image from "next/image";
import React from "react";

// ******************************** BANNER INFO TYPE DEFINITION =======================
interface IBannerInfo {
  event_title: string;
  eventHashTag: string;
  eventFeatureTitle: string;
  eventFeatures: string[];
  banner_file_url?: string; // Optional property for the banner image URL
  event_desc?: string; // Optional property for event description
  tage?: string; // Optional property for hashtag
}

// ******************************** PROPS TYPE DEFINITION ============================
interface Props {
  bannerEventInfo?: IBannerInfo; // Correctly referencing the type
}

const Banner = ({ bannerEventInfo }: Props) => {
  // console.log(bannerEventInfo);
  return (
    <div>
      <div className="">
        <Image
          src={
            bannerEventInfo?.banner_file_url ||
            "/assets/images/events/Images/Group 1491.png"
          }
          alt={bannerEventInfo?.event_title || "banner image"}
          width={1024}
          height={349}
          className="w-full h-[349px]"
        />
      </div>
      <div className="my-8 mx-16">
        <div className="h-[336px] -mt-[350px] w-full ">
          <div className="flex justify-between w-full">
            <div className="text-bgPrimary font-bold text-3xl"></div>
            <div className="text-bgPrimary text-xl"></div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-8">
            <div className="text-bgPrimary mt-8">
              <div className="flex flex-col gap-12">
                <div>
                  <p className="text-4xl">
                    {bannerEventInfo?.event_title
                      .split(" ")
                      .slice(0, -1)
                      .join(" ")}
                  </p>
                  <p className="text-6xl">
                    {bannerEventInfo?.event_title.split(" ").slice(-1)}
                  </p>
                </div>
                <p className="text-2xl">(Reserve a spot today)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
