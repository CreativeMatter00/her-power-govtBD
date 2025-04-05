import Faq from "./Faq";
import AboutBusinessForm from "./AboutBusinessForm";
import { useTranslations } from "next-intl";

const AboutBusiness = ({ setActive }: { setActive: Function }) => {
	const t = useTranslations("talentHunt")

	return (
		<>
			{/* ---------------- ABOUT BUSSINESS MAIN COMPONENT ------------- */}
			<section className="container mx-auto p-4">
				<h1 className="text-2xl md:text-3xl text-brandPrimary my-4">
					{t("Tell_Us_About_Your_Business")}
				</h1>
				<main className="flex flex-col lg:flex-row justify-evenly gap-8">
					<div className="basis-1/2">
						{/* --------------- SELLER INFO FORM ------------*/}
						<AboutBusinessForm setActive={setActive} />
					</div>
					<div className="basis-1/2">
						{/* ------------------- SELLER INFO FAQ COMPONENT ------------ */}
						<Faq />
					</div>
				</main>
			</section>
		</>
	);
};

export default AboutBusiness;
