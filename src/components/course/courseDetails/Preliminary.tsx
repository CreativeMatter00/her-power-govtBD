import { useTranslations } from "next-intl";
import ExamHeading from "./ExamHeading";

const Preliminary = ({ description }: { description: string }) => {
	const t=useTranslations("course");
	return (
		<>
			{/* ------------- bcs preliminary details ------------------ */}
			<div className="bg-[#FFFFFF] p-6">
				{/* <ExamHeading examName="Description : " /> */}
				<p>{t("Course Description")}</p>
				<p dangerouslySetInnerHTML={{ __html: description || "" }}></p>
			</div>
		</>
	);
};

export default Preliminary;
