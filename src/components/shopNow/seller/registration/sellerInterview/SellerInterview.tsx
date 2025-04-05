import { useTranslations } from "next-intl";
import Faq from "./Faq";
import InterviewForm from "./InterviewForm";

const SellerInterview = ({ setActive }: { setActive: Function }) => {
  const t = useTranslations("talentHunt");

  return (
    <>
      {/* ---------------------- MAIN COMPONENT SELLER INTERVIEW ------------------------- */}
      <section className="container mx-auto p-4">
        <h1 className="text-2xl md:text-3xl text-brandPrimary my-4">
          {t("Seller_Interview")}
        </h1>

        {/* ------------- INTERVIEW FORM & FAQ COMPONENT ----------------------- */}
        <main className="flex flex-col lg:flex-row justify-evenly gap-8">
          <div className="basis-1/2 order-1 lg:order-1">
            {/* ---------------------------------- INTERVIEW FORM -------------------- */}
            <InterviewForm setActive={setActive} />
          </div>
          <div className="basis-1/2 order-2 lg:order-2">
            {/* ----------------------- FAQ COMPONENT ------------------------------ */}
            <Faq />
          </div>
        </main>
      </section>
    </>
  );
};

export default SellerInterview;
