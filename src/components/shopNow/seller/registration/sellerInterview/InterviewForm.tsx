import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import InquiriesInput from "./InquiriesInput";
import InterviewInput from "./InterviewInput";
import ProductManufacturingInput from "./ProductManufacturingInput";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

const InterviewForm = ({ setActive }: { setActive: Function }) => {
  const t = useTranslations("talentHunt");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const onSubmit = (data: any) => {
    // Handle form submission
    // console.log(data);
  };

  return (
    <div className="border border-brandLsPrimary rounded-lg p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-brandDs font-bold text-base mx-4 pb-2 mb-2 border-b border-brandLsPrimary">
          {t("Inquiries")}
        </h1>
        <div className="flex flex-col gap-4 m-4">
          {/* ----------- RADIO BUTTON FOR SELLER INTERVIEW ----------- */}
          <InquiriesInput
            title={t("What_your_Account_type")}
            defaultValueInput=""
            labelNameOne={t("Individual")}
            labelNameTwo={t("Business")}
            idOne="individual"
            idTwo="business"
            valueOne="1"
            valueTwo="2"
            htmlForAttributeOne="individual"
            htmlForAttributeTwo="business" // Corrected here
            name="accountType" // Add this name
            register={register}
            errors={errors}
          />
          {/* ----------- RADIO BUTTON FOR SELLER INTERVIEW ----------- */}
          <InquiriesInput
            title={t("Do_you_sell_in_other_websites")}
            defaultValueInput=""
            labelNameOne={t("Yes")}
            labelNameTwo={t("No")}
            idOne="yes"
            idTwo="no"
            valueOne="Y"
            valueTwo="N"
            htmlForAttributeOne="Y"
            htmlForAttributeTwo="N"
            name="sellInOtherWebsites" // Add this name
            register={register}
            errors={errors}
          />
          {/* ----------- RADIO BUTTON FOR SELLER INTERVIEW ----------- */}
          <InquiriesInput
            title={t("any_other_Ecommerce_market_places")}
            defaultValueInput=""
            labelNameOne={t("Yes")}
            labelNameTwo={t("No")}
            idOne="yes"
            idTwo="no"
            valueOne="Y"
            valueTwo="N"
            htmlForAttributeOne="yes"
            htmlForAttributeTwo="no"
            name="sellInEcommerceMarketplaces" // Add this name
            register={register}
            errors={errors}
          />
          {/* ----------- INPUT FIELD SELLER INTERVIEW ----------- */}
          <InterviewInput
            labelName={t("do_ecommerce_if_yes")}
            placeholderText={t("Enter_website_url_here")}
            inputType="text"
            name="ecommerceWebsite" // Add this name
            register={register}
            errors={errors}
          />
        </div>
        <h1 className="text-brandDs font-bold text-base mx-4 pb-2 mb-2 border-b border-brandLsPrimary">
          {t("Product_Manufacturing_Details")}
        </h1>
        <div className="flex flex-col gap-6 mx-4">
          <ProductManufacturingInput
            title={t("Where_do_you_get_products_from")}
            defaultValueInput=""
            valueOne="1"
            valueTwo="2"
            valueThree="3"
            idOne="1"
            idTwo="2"
            idThree="3"
            htmlForAttributeOne="1"
            htmlForAttributeTwo="2"
            htmlForAttributeThree="3"
            labelNameOne={t("I_manufacture_them")}
            labelNameTwo={t("I_resell_product_that_I_buy")}
            labelNameThree={t("I_import_them")}
            name="productSource" // Add this name
            register={register}
            errors={errors}
          />
        </div>
        {/* ----------------------- SELLER INTERVIEW INPUT ------------------ */}
        <h1 className="text-brandDs font-bold text-base mx-4 pb-2 mb-2 mt-4 border-b border-brandLsPrimary">
          {t("Income_Details")}
        </h1>
        <div className="flex flex-col gap-6 mx-4">
          <InterviewInput
            labelName={t("your_annual_turnover")}
            placeholderText={t("Enter_annual_turnover_here")}
            inputType="number"
            name="annualTurnover" // Add this name
            register={register}
            errors={errors}
          />
          <InterviewInput
            labelName={t("How_many_products_do_you_sell")}
            placeholderText={t("Enter_number_of_selling_products")}
            inputType="text"
            name="numberOfProducts" // Add this name
            register={register}
            errors={errors}
          />
          {/* ----------------------- CONTINUE BUTTON SELLER INTERVIEW ------------------ */}
          <div className="flex gap-4">
            <button
              type="submit" // Changed to "button" to prevent form submission on click
              className="bg-link text-bgSecondary text-base font-medium flex items-center gap-2 rounded-3xl px-6 py-3"
              onClick={() => setActive(2)}
            >
              <GoArrowLeft />
              {t("Back")}
            </button>
            <button
              type="submit" // This is the correct type for form submission
              className="bg-link text-bgSecondary text-base font-medium flex items-center gap-2 rounded-3xl px-6 py-3"
              onClick={() => setActive(4)}
            >
              {t("Continue")}
              <GoArrowRight />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InterviewForm;
