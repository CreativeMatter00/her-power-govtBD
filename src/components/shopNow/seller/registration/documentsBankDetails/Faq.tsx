import Image from "next/image";
import DocBankFaq from "./DocBankFaq";
import { useTranslations } from "next-intl";

const Faq = () => {
  const t = useTranslations("talentHunt");
  return (
    <>
      {/* -------------- BANK DOC FAQ COMPONENT ------------------- */}
      <section className="p-4">
        <h1 className="text-2xl text-brandPrimary border-b border-brandLsPrimary pb-1">
          {t("FAQ")}
        </h1>
        <div className="text-brandPrimary">
          {/* ------------ SHAD CN FAQ COMPONENT -------------- */}
          <DocBankFaq />
        </div>
        {/* <div className="text-base">
          <p className=" text-link my-6">See all</p>
          <p className="text-brandPrimary font-medium mb-4">Help center</p>
          <Image
            src={"/assets/images/shop-now/registration form/contact-us.png"}
            alt="contact us"
            width={103}
            height={93}
            className="h-24 w-auto"
          />
        </div> */}
      </section>
    </>
  );
};

export default Faq;
