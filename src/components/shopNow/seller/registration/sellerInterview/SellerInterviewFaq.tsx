import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
// ----------------------------- FAQ COMPONENT OF SELLER INTERVIEW --------------------
// ----------- SHAD CN ------------
const SellerInterviewFaq = () => {
  const t = useTranslations("talentHunt");
	
  return (
    <>
      {/* ---------------- RADIO BUTTON------------------------- */}
      {/* -------------------- SELLER INFO FAQ SHAD CN COMPONENT -------- */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          className="border-b border-brandLsPrimary"
          value="item-1"
        >
          <AccordionTrigger>{t("faq_one")}</AccordionTrigger>
          <AccordionContent>{t("faq_one_ans")}</AccordionContent>
        </AccordionItem>
        <AccordionItem
          className="border-b border-brandLsPrimary"
          value="item-2"
        >
          <AccordionTrigger>{t("faq_two")}</AccordionTrigger>
          <AccordionContent>{t("faq_two_ans")}</AccordionContent>
        </AccordionItem>
        <AccordionItem
          className="border-b border-brandLsPrimary"
          value="item-3"
        >
          <AccordionTrigger>{t("faq_three")}</AccordionTrigger>
          <AccordionContent>{t("faq_three_ans")}</AccordionContent>
        </AccordionItem>

        <AccordionItem
          className="border-b border-brandLsPrimary"
          value="item-4"
        >
          <AccordionTrigger>{t("faq_four")}</AccordionTrigger>
          <AccordionContent>{t("faq_four_ans")}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default SellerInterviewFaq;
