"use client";
import React, { useState, useEffect } from "react";
import DocImageInput from "./DocImageInput";
import DocBankInput from "./DocBankInput";
import { useFormContext } from "react-hook-form";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useTranslations } from "next-intl";

interface IFormInfo {
  setActive: Function;
  nidFrontSide: File | null;
  setNidFrontSide: (image: File | null) => void;
  nidEndSide: File | null;
  setNidEndSide: (image: File | null) => void;
  tinCertificate: File | null;
  setTinCertificate: (image: File | null) => void;
  signature: File | null;
  setSignature: (image: File | null) => void;
  tradeLicense: File | null;
  setTradeLicense: (image: File | null) => void;
  vatID: File | null;
  setVatID: (image: File | null) => void;
  taxID: File | null;
  setTaxID: (image: File | null) => void;
}

// const DetailsForm = ({ setActive }: { setActive: Function }, ) => {
const DetailsForm: React.FC<IFormInfo> = ({
  setActive,
  nidFrontSide,
  setNidFrontSide,
  nidEndSide,
  setNidEndSide,
  tinCertificate,
  setTinCertificate,
  signature,
  setSignature,
  tradeLicense,
  setTradeLicense,
  vatID,
  setVatID,
  taxID,
  setTaxID,
}) => {
  const t = useTranslations("talentHunt");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext();

  // ======================== Register images in react-hook-form =============
  useEffect(() => {
    setValue("nidFrontSide", nidFrontSide);
    setValue("nidEndSide", nidEndSide);
    setValue("tinCertificate", tinCertificate);
    setValue("signature", signature);
    setValue("tradeLicense", tradeLicense); // New Field
    setValue("vatID", vatID); // New Field
    setValue("taxID", taxID); // New Field
  }, [
    nidFrontSide,
    nidEndSide,
    tinCertificate,
    signature,
    tradeLicense,
    vatID,
    taxID,
    setValue,
  ]);

  const onSubmit = (data: any) => {
    // Handle form submission
    // console.log("Form Data:", data);
  };

  return (
    <>
      {/* ------------- BANK DOC DETAILS FORM ----------------- */}
      <div className="border border-brandLsPrimary rounded-lg p-4">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-brandDs font-bold text-base mx-4 pb-2 mb-2 border-b border-brandLsPrimary">
              {t("Bank_Details")}
            </h1>
            <div className="flex flex-col gap-6 m-4">
              {/* --------------------- INPUT COMPONENT --------------------- */}
              <DocBankInput
                inputName="bankName"
                labelName={t("Bank_Name")}
                placeholderText={t("Enter_bank_name_here")}
                inputType="text"
                register={register}
                errors={errors}
                // required={true}
              />
              {/* --------------------- INPUT COMPONENT --------------------- */}
              <DocBankInput
                inputName="branchCode"
                labelName={t("Branch_Code")}
                placeholderText={t("Enter_branch_code_here")}
                inputType="text"
                register={register}
                errors={errors}
                // required={true}
              />
              {/* --------------------- INPUT COMPONENT --------------------- */}
              <DocBankInput
                inputName="accountHolder"
                labelName={t("Account_Holder_Name")}
                placeholderText={t("Account_Holder_Name_placeholder")}
                inputType="text"
                register={register}
                errors={errors}
                // required={true}
              />
              {/* --------------------- INPUT COMPONENT --------------------- */}
              <DocBankInput
                inputName="accountNumber"
                labelName={t("Account_Number")}
                placeholderText={t("Account_Number_placeholder")}
                inputType="text"
                register={register}
                errors={errors}
                // required={true}
              />
            </div>
            <h1 className="text-brandDs font-bold text-base mx-4 pb-2 mb-2 border-b border-brandLsPrimary">
              {t("Documents")}
            </h1>
            <div className="flex flex-col gap-6 mx-4">
              {/* --------------------- IMAGE INPUT COMPONENT --------------------- */}
              <DocImageInput
                id="nidFrontSide"
                labelName={t("NID_Card_photo_front")}
                selectedImage={nidFrontSide}
                setSelectedImage={setNidFrontSide}
                // required={true}
              />
              {/* ---------------------  IMAGE INPUT COMPONENT --------------------- */}
              <DocImageInput
                id="nidEndSide"
                labelName={t("NID_Card_photo_back")}
                selectedImage={nidEndSide}
                setSelectedImage={setNidEndSide}
                // required={true}
              />
              {/* --------------------- IMAGE INPUT COMPONENT --------------------- */}
              <DocImageInput
                id="tinCertificate"
                labelName={t("Tin_copy")}
                selectedImage={tinCertificate}
                setSelectedImage={setTinCertificate}
                // required={true}
              />
              {/* --------------------- IMAGE INPUT COMPONENT --------------------- */}
              <DocImageInput
                id="signature"
                labelName={t("signature_copy")}
                selectedImage={signature}
                setSelectedImage={setSignature}
                // required={true}
              />
              {/* --------------------- NEW IMAGE INPUT COMPONENTS --------------------- */}
              <DocImageInput
                id="tradeLicense"
                labelName={t("Trade_License")}
                selectedImage={tradeLicense}
                setSelectedImage={setTradeLicense}
                // required={true}
              />
              <DocImageInput
                id="vatID"
                labelName={t("Vat_ID")}
                selectedImage={vatID}
                setSelectedImage={setVatID}
                // required={true}
              />
              <DocImageInput
                id="taxID"
                labelName={t("Tax_ID")}
                selectedImage={taxID}
                setSelectedImage={setTaxID}
                // required={true}
              />
            </div>
            <div className="mt-4 flex gap-4">
              <button
                type="button"
                className="bg-link text-bgSecondary text-base font-medium flex items-center gap-2 rounded-3xl px-6 py-3"
                onClick={() => setActive(3)}
              >
                <GoArrowLeft />
                {t("Back")}
              </button>
              <button
                type="submit"
                className="bg-link text-bgSecondary text-base font-medium flex items-center gap-2 rounded-3xl px-6 py-3"
                onClick={() => setActive(5)}
              >
                {t("Continue")}
                <GoArrowRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DetailsForm;
