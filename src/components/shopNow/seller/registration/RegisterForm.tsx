"use client";

import { useState } from "react";
import AboutBusiness from "./aboutBusiness/AboutBusiness";
import ConfirmAccount from "./confirmAccount/ConfirmAccount";
import CreateSellerAccount from "./createSelller/CreateSellerAccount";
import DocumentsBankDetails from "./documentsBankDetails/DocumentsBankDetails";
import SellerInterview from "./sellerInterview/SellerInterview";
import RegisterStepper from "./RegisterStepper";
import Disclaimer from "./disclaimer/Disclaimer";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CreateSellerSchema from "./createSelller/CreateSellerSchema";

const RegisterForm = ({ setVerifyEmail, setEmail }: any) => {
  const [active, setActive] = useState<number>(0);

  // ================ Initialize state for images ====================
  const [nidFrontSide, setNidFrontSide] = useState<File | null>(null);
  const [nidEndSide, setNidEndSide] = useState<File | null>(null);
  const [tinCertificate, setTinCertificate] = useState<File | null>(null);
  const [signature, setSignature] = useState<File | null>(null);
  const [tradeLicense, setTradeLicense] = useState<File | null>(null); // New Field
  const [vatID, setVatID] = useState<File | null>(null); // New Field
  const [taxID, setTaxID] = useState<File | null>(null); // New Field

  const methods = useForm({
    resolver: yupResolver(CreateSellerSchema),
    defaultValues: {
      // Define default values if needed
    },
  });
  return (
    <FormProvider {...methods}>
      <main className="bg-Secondary">
        {active > 0 && (
          <div className="py-16">
            <RegisterStepper active={active} setActive={setActive} />
          </div>
        )}

        {active === 0 && <Disclaimer setActive={setActive} />}
        {active === 1 && <CreateSellerAccount setActive={setActive} />}
        {active === 2 && <AboutBusiness setActive={setActive} />}
        {active === 3 && <SellerInterview setActive={setActive} />}
        {active === 4 && (
          <DocumentsBankDetails
            setActive={setActive}
            nidFrontSide={nidFrontSide}
            setNidFrontSide={setNidFrontSide}
            nidEndSide={nidEndSide}
            setNidEndSide={setNidEndSide}
            tinCertificate={tinCertificate}
            setTinCertificate={setTinCertificate}
            signature={signature}
            setSignature={setSignature}
            tradeLicense={tradeLicense}
            setTradeLicense={setTradeLicense}
            vatID={vatID}
            setVatID={setVatID}
            taxID={taxID}
            setTaxID={setTaxID}
          />
        )}
        {active === 5 && <ConfirmAccount setActive={setActive} setVerifyEmail={setVerifyEmail} setEmail={setEmail} />}

      </main>
    </FormProvider>
  );
};

export default RegisterForm;
