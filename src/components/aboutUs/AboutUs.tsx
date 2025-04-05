"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import Logo from "../ui/logo/Logo";
// About us
const AboutUs = () => {
  const locale = useLocale();
  const t = useTranslations("about_us");

  return (
    <div className="py-6">
      {/* ------------- LOGO -------------  */}

      <div className="flex flex-col items-center mb-16">
        <Link href={`/${locale}`}>
          {/* <Image
						src={`/assets/images/navbar/Her Power Logo.gif`}
						width={264}
						height={192}
						alt="her-power Logo"
						className="h-48 w-auto max-lg:h-12"
						priority
					/> */}
          <Logo
            logoHeight="h-40"
            logoWidth="w-auto"
            text={true}
            textHeight="h-28"
            textWidth="w-auto"
          />
        </Link>

        <p className="text-[#6B469B] text-2xl text-center">
          ৪৪ টি জেলা ১৩০ টি উপজেলা ৫ মাস ব্যাপী প্রশিক্ষণ <br /> ও ১ মাস ব্যাপী
          মেন্টরশীপ প্রোগ্রাম
        </p>
      </div>

      {/* -------------  BREAKING NEWS -------------  */}

      <div className="relative mb-7">
        <div className="absolute py-3 px-8 bg-[#9747FF] text-white font-bold text-2xl z-10">
          {t("Breaking News")}
        </div>

        <div className="bg-white text-2xl text-black py-3 px-4">
          <Marquee>
            Talent hunt is a competition or search aimed at discovering
            individuals with exceptional skills or abilities in a particular
            field, such as Digital Marketing, Web Development, Graphic Design,
            IT Service, E-Commerce, or Call Centre Agent. Participants typically
            showcase their talents through auditions, performances, or
            demonstrations, with the goal of gaining recognition, opportunities,
            or prizes. Talent hunts are often organized to promote talent
            development and entertainment.
          </Marquee>
        </div>
      </div>

      {/* -------------  BREAKING NEWS -------------  */}

      <div className="container mx-auto">
        <div className="mb-10">
          <p className="text-3xl mb-5 font-bold">উদ্দেশ্য</p>
          <p className="text-2xl">
            তথ্য-প্রযুক্তির সর্বোত্তম নিরাপদ ব্যবহার করে দক্ষতা বৃদ্ধির মাধ্যমে
            নারীদের আত্মকর্মসংস্থানের ব্যবস্থা ও উদ্যোক্তা হিসাবে তাদের টেকসই
            ক্ষমতায়ন নিশ্চিত করা।
          </p>
        </div>
        <div className="mb-10">
          <p className="text-3xl mb-5 font-bold">লক্ষ্যমাত্রা</p>
          <p className="text-2xl">
            ক) ৪৩টি জেলার সদর উপজেলাসহ মোট ৩টি উপজেলা ও রংপুর জেলার পীরগঞ্জ
            উপজেলাসহ মোট ১৩০ টি উপজেলায় তথ্য প্রযুক্তিতে নারীদের সক্ষমতা
            বৃদ্ধিতে চারটি ক্যাটাগরিতে মোট ২৫,১২৫ জন নারীকে ০৫ (পাঁচ) মাসব্যাপী
            প্রশিক্ষণ প্রদান। IT Service Provider হিসেবে ১০,৪০০ জন Women
            Freelancer হিসেবে ১০,৪০০ জন Women Call Centre Agent হিসেবে ১,০৭৫ জন
            Women E-commerce Professional হিসেবে ৩,২৫০ জন <br />
            খ) প্রশিক্ষণ শেষে উত্তীর্ণ প্রশিক্ষণার্থীদের নিয়ে ০১ (এক) মাসব্যাপী
            মেন্টরশীপ প্রোগ্রাম আয়োজন। <br />
            গ) তথ্যপ্রযুক্তি প্রয়োগে নারীর ক্ষমতায়ন বিষয়ে কেন্দ্রীয় পর্যায়ে ২টি
            ও ৪৪টি জেলায় ১টি করে সর্বমোট ৪৬টি সেমিনার আয়োজন ও প্রচার। <br />
            ঘ) ২৫,১২৫ জন নারীকে আইসিটি পেশাজীবী এবং উদ্যোক্তা হিসেবে গড়ে তোলার
            জন্য একটি একক নারী উদ্যোক্তা প্ল্যাটফরম তৈরি। <br />
            ঙ) সরকারি, বেসরকারি বিভিন্ন সংস্থার সাথে পার্টনারশীপ স্থাপন এবং
            চাকুরী মেলার আয়োজন।
          </p>
        </div>

        <div className="">
          <p className="text-3xl mb-5 font-bold">প্রকল্পের ফলাফল</p>
          <p className="text-2xl">
            তথ্য প্রযুক্তি ব্যবহারের মাধ্যমে নারীর দক্ষতা অর্জিত হবে, নতুন
            কর্মসংস্থান এর সৃষ্টি হবে অর্থাৎ অর্থনৈতিক কর্মকাণ্ডে নারীদের
            অংশগ্রহণ বৃদ্ধি পাবে। উপজেলা পর্যায়ে আইসিটি সংশ্লিষ্ট বিষয়ে
            প্রশিক্ষণের মাধ্যমে প্রযুক্তি খাতে দক্ষ নারী কর্মী ও নারী উদ্যোক্তা
            তৈরি হবে। সরকারি-বেসরকারি সংস্থার সাথে পার্টনারশীপ এর ফলে উপজেলা
            পর্যায়ের নারীদের প্রশিক্ষণ পরবর্তী কর্মসংস্থান এবং পরামর্শদানের
            মাধ্যমে টেকসই উন্নয়ন নিশ্চিত হবে।
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
