import Image from "next/image";
import SellerInterviewFaq from "./SellerInterviewFaq";
import { useTranslations } from "next-intl";

const Faq = () => {
  const t = useTranslations("talentHunt");
  return (
    <>
      <section className="p-4">
        {/* ---------------------- SELLER INTERVIEW FAQ COMPONENT --------------------------------- */}
        <h1 className="text-2xl text-brandPrimary border-b border-brandLsPrimary pb-1">
          {t("FAQ")}
        </h1>

        <div className="text-brandPrimary">
          {/* ---------- FAQ COMPONENT USING SHAD CN ------------------- */}
          <SellerInterviewFaq />
        </div>
        {/* ------- SEE ALL FAQ, HELP CENTER, IMAGE ---------------- */}
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
