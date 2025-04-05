// pages/contact.tsx
import React from "react";
import { CiMail } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail, IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { ImFacebook2 } from "react-icons/im";
import { useTranslations } from "next-intl";

const Contact = () => {
    const t = useTranslations("career");
    return (
        <div className="container mx-auto  flex flex-col items-center py-8">
            <h1 className="text-4xl font-bold text-[#2D0C3E] mb-8">{t("ContactUs")}</h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Map Section */}
                <div className="bg-[#FBF5FD] col-span-2 rounded-lg shadow-md overflow-hidden">
                    <iframe
                        className="w-full h-full border-none"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.137256536465!2d90.3704981760518!3d23.778126187710118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c700a06e1ed5%3A0x7f3c5708403886f5!2z4Ka54Ka-4KawIOCmquCmvuCmk-Cnn-CmvuCmsCDgpqrgp43gprDgppXgprLgp43gpqogKEhlciBQb3dlciBQcm9qZWN0KSA6IOCmquCnjeCmsOCmr-CngeCmleCnjeCmpOCmv-CmsCDgprjgprngpr7gp5_gpqTgpr7gp58g4Kao4Ka-4Kaw4KeA4KawIOCmleCnjeCmt-CmruCmpOCmvuCnn-CmqA!5e0!3m2!1sen!2sbd!4v1732526874198!5m2!1sen!2sbd"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>

                {/* Contact Information Section */}
                <div className="flex flex-col space-y-6">
                    {/* Email */}
                    {/* <div className="group p-6 bg-[#FBF5FD] hover:bg-brandDs rounded-lg shadow-md flex flex-col items-center space-y-4">
                        <FaLocationDot className="text-brandPrimary group-hover:text-bgSecondary w-6 h-7" />
                        <div>
                            <a
                                href="mailto:contact@example.com"
                                className="text-[#009DBF] group-hover:text-bgSecondary"
                            >
                                contact@example.com
                            </a>
                        </div>
                    </div> */}
                    <div className="group p-6 bg-[#FBF5FD] hover:bg-brandDs rounded-lg shadow-md flex flex-col items-center space-y-4">
                        <IoMdMail className="text-brandPrimary w-6 h-7 group-hover:text-bgSecondary" />
                        <div>
                            <a
                                href="mailto:herpowerproject@doict.gov.bd"
                                className="text-[#009DBF] group-hover:text-bgSecondary"
                            >
                                herpowerproject@doict.gov.bd
                            </a>
                        </div>
                    </div>

                    {/* Call */}
                    <div className="group p-6 bg-[#FBF5FD] hover:bg-brandDs rounded-lg shadow-md flex flex-col items-center space-y-4">
                        <IoCall className="text-brandPrimary w-6 h-7 group-hover:text-bgSecondary" />
                        <div>

                            <a
                                href="tel:+880 1723-014488"
                                className="text-[#009DBF] group-hover:text-bgSecondary"
                            >
                               +880 1723-014488
                            </a>
                        </div>
                    </div>

                    {/* Facebook */}
                    <div className="group p-6 bg-[#FBF5FD] hover:bg-brandDs rounded-lg shadow-md flex flex-col items-center space-y-4">
                        <ImFacebook2 className="text-brandPrimary w-6 h-7 group-hover:text-bgSecondary" />
                        <div>

                            <a
                                href="https://www.facebook.com/herpowerproject"
                                className="text-[#009DBF] group-hover:text-bgSecondary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                facebook.com/herpowerproject
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
