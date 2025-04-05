import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const t = useTranslations("ShopNowHome");
  const locale = useLocale();

  return (
    <div>
      <div className="relative mx-auto w-full overflow-hidden">
        <div className="banner-image-wrapper w-full h-[300px] lg:w-auto lg:h-auto">
          <Image
            src={"/assets/images/shop-now/hero/hero.jpg"}
            width={1920}
            height={300}
            alt="hero"
            className="object-fill w-full max-w-none h-full"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10"></div>
          <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center z-20 text-white text-3xl lg:text-5xl font-bold">
            {/* <p> Find Our </p>
						<p> Latest Collection Here </p> */}
            <p className="text-center"> {t("hero")} </p>
            <Link href={`/${locale}/shop-now/new-products`}>
              <button className="text-base lg:text-lg px-6 py-3 bg-brandLsSecondary rounded-full text-brandPrimary hover:bg-brandLsPrimary mt-4 lg:mt-8">
                {t("exploreNow")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
