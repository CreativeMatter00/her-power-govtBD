"use client";

import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import OtpForm from "../../profile/registrationForm/RegistrationForm/OtpForm";


const SellerRegistration = () => {
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [email, setEmail] = useState<string>("");
    
    return (
        <div>
            {!verifyEmail && (
                <RegisterForm setVerifyEmail={setVerifyEmail} setEmail={setEmail} />
            )}
            {verifyEmail && <OtpForm email={email} />}
        </div>
    );
};


export default SellerRegistration;
