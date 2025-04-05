"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { GoArrowRight } from "react-icons/go";

const Disclaimer = ({ setActive }: { setActive: Function }) => {
  const t = useTranslations("talentHunt");
  const [termsChecked, setTermsChecked] = useState<boolean>(false);

  const locale = useLocale();

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-2 mb-6">
        <p className="text-brandPrimary">
          {" "}
          {t("Already_have_a_seller_account")}{" "}
        </p>
        <Link href={`/${locale}/login`} className="text-link">
          {" "}
          {t("Click_here_to_login")}{" "}
        </Link>
      </div>

      {/* --------------- TITLE --------------- */}

      <div className="mb-4">
        <p className="text-3xl">
          <span className="text-sale"> {t("Register")} </span>
          <span className="text-sale"> </span>
          {t("on")}
          <span className="text-brandDs font-bold"> {t("Her_Power")} </span>
        </p>
      </div>

      <p className="mb-6">{t("join_our_community_seller_register")}</p>

      {/* --------------- NECESSARY DOCUMENTS --------------- */}

      <div className="py-4 px-6 border border-brandLsPrimary rounded-lg mb-6">
        <p className="text-brandDs font-bold mb-4">
          {" "}
          {t("Necessary_Documents")}{" "}
        </p>

        <p> {t("Please_have_the_following_ready_before_you_begin")}: </p>
        <ul className="list-inside list-disc mb-6">
          <li> {t("bank_account_details_for_her_power")} </li>
          <li> {t("Tax_details_of_your_business")} </li>
          <li> {t("tin_certificate")} </li>
          <li> {t("nid_Card")} </li>
          <li> {t("your_signature")} </li>
        </ul>

        <p className="text-dangerPrimary"> {t("all_info_submit_accurate")} </p>
      </div>

      {/* --------------- BUSINESS DETAILS --------------- */}

      {/* <div className="mb-10">
				<p className="text-brandPrimary text-xl font-bold mb-6">
					{" "}
					Enter details below to continue registration{" "}
				</p>
				<p className="text-brandDs mb-3"> Company/ Business Name </p>

				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						placeholder="Enter name here"
						className="border-b-2 border-brandDs outline-none"
						{...register("businessName")}
					/>
				</form>
			</div> */}

      {/* --------------- BUSINESS DETAILS --------------- */}

      <div>
        <p className="mb-4"> {t("Seller_Agreement")} </p>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={termsChecked}
            onCheckedChange={(checked) => setTermsChecked(checked === true)}
          />

          <label
            htmlFor="terms"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("read_aggrement_first_part")}{" "}
            <Link href={""} className="text-link">
              {t("read_aggrement_second_part")}
            </Link>{" "}
            ,{" "}
            <Link href={""} className="text-link">
              {t("billing_payment")}
            </Link>{" "}
            {t("and")}{" "}
            <Link href={""} className="text-link">
              {t("seller_Terms_Conditions")}
            </Link>
          </label>
        </div>
      </div>

      {/* <Controller
          name="terms"
          control={control}
          render={({ field }) => (
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={field.value}
                onChange={(e) => {
                  // Type assertion to ensure event target is an HTMLInputElement
                  const target = e.target as HTMLInputElement;
                  field.onChange(target.checked);
                }}
              />
              <label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read and agree to comply with and/or be bound by the
                terms and conditions of{" "}
                <Link href={""} className="text-link">
                  Her Power Business Solutions Agreement
                </Link>{" "}
                ,{" "}
                <Link href={""} className="text-link">
                  Billing & Payment Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href={""} className="text-link">
                  Her Power Seller Terms & Conditions
                </Link>
              </label>
            </div>
          )}
        /> */}

      {/* ----------------------------- CONTINUE BUTTON --------------- */}
      <div className="relative mt-8">
        <button
          type="button" // Changed to button to prevent form submission
          className={`bg-link text-bgSecondary text-base font-medium flex items-center gap-2 rounded-3xl px-6 py-3 disabled:bg-greyPrimary`}
          onClick={() => setActive(1)}
          disabled={!termsChecked} // Disable button if checkbox is not checked
        >
          {t("Continue")}
          <GoArrowRight />
        </button>
        {/* {!termsChecked && (
					<span className="absolute top-15 left-2  text-sm text-red-500">
						Please Check all the terms and conditions
					</span>
				)} */}
      </div>
    </div>
  );
};

export default Disclaimer;
