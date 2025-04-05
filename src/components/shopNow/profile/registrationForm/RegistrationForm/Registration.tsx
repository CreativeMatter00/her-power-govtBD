"use client";

import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import OtpForm from "./OtpForm";

const Registration = () => {
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [nid, setNid] = useState<string>("");
  const [birthCertificate, setBirthCertificate] = useState<string>("");
  return (
    <div>
      {!verifyEmail && (
        <RegistrationForm setVerifyEmail={setVerifyEmail} setEmail={setEmail} setBirthCertificate={setBirthCertificate} setNid={setNid} />
      )}
      {verifyEmail && <OtpForm email={email} nid={nid} birthCertificate={birthCertificate} />}
    </div>
  );
};

export default Registration;
