import React from "react";
import DetailsForm from "./DetailsForm";
import Faq from "./Faq";
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
// interface IStepperInfo {
// 	setActive: Function
// }

// const DocumentsBankDetails = ({ setActive }: { setActive: Function }) => {
const DocumentsBankDetails: React.FC<IFormInfo> = ({
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
	const t = useTranslations("talentHunt")

	return (
		<>
			{/* ------------------------- DOCUMENT BANK DETAILS MAIN COMPONENT----------------- */}
			<section className="container mx-auto p-4">
				<h1 className="text-2xl md:text-3xl text-brandPrimary my-4">
					{t("Documents_Bank_Details")}
				</h1>

				<main className="flex flex-col lg:flex-row justify-evenly gap-8">
					<div className="basis-1/2  order-1 lg:order-1">
						{/* ----------------- BANK DETAILS FORM ---------- */}
						<DetailsForm
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
					</div>
					<div className="basis-1/2 order-2 lg:order-2">
						{/* ----------------- BANK DETAILS FAQ ---------- */}
						<Faq />
					</div>
				</main>
			</section>
		</>
	);
};

export default DocumentsBankDetails;
