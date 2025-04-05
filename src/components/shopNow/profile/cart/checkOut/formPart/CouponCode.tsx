import { UseFormRegister } from "react-hook-form";
import CheckOutInput from "../checkOutInputs/CheckOutInput";
import React from "react";
import { useTranslations } from "next-intl";

interface ValidationInfo {
  errors: any;
  register: UseFormRegister<any>;
}

const CouponCode: React.FC<ValidationInfo> = ({ errors, register }) => {
  const t = useTranslations("talentHunt");

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent form submission
    // Add any additional actions here, if needed
  };

  return (
    <>
      <section className="flex max-md:flex-col justify-end items-end gap-4 md:gap-8">
        <div className="w-full md:basis-2/3">
          {/* ========================= COUPON CODE ===================== */}
          <CheckOutInput
            inputType="text"
            placeholderText={t("Enter_Code")}
            name="couponCode"
            errors={errors}
            label=""
            register={register}
          />
        </div>
        {/* ================================= COUPON CODE SUBMIT ============================ */}
        <div className="w-full md:basis-1/3">
          <button
            className="w-full py-3 bg-brandPrimary text-bgPrimary font-medium text-sm text-center rounded-full mt-1"
            onClick={handleButtonClick} // Prevents default form submission
          >
            {t("Submit")}
          </button>
        </div>
      </section>
    </>
  );
};

export default CouponCode;
