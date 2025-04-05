import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const OrgCourseCard = () => {
  const locale = useLocale();
  return (
    <Link href={`/${locale}/course/organization/10 Minute School/details`}>
      <div className="border-[#CB98E1] border-4 rounded-lg">
        <Image
          src={`/assets/images/course/10 Minute School/Rectangle 447.png`}
          width={330}
          height={245}
          alt="mujib-sotoborso"
          className="h-fit"
          priority
        />
        <div className="bg-[#CB98E1] px-6 py-4 flex justify-between items-center">
          <div className="text-black">
            <p className="font-bold text-xl">IELTS Live Batch</p>
            <p className="">Munzereen Shahid</p>
          </div>

          <p className="font-bold text-2xl">
            <sup className="text-sm font-bold">TK</sup>1250
          </p>
        </div>
      </div>
    </Link>
  );
};

export default OrgCourseCard;
