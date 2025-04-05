import ExamHeading from "./ExamHeading";

const Written = () => {
	return (
		<>
			{/* -------------------- bcs written exam details ------------------ */}
			<div className="bg-[#FFFFFF] p-6">
				<ExamHeading examName="Written" examFee="3500" />
				<div className="mb-6">
					<h3 className="font-bold ">Total Classes – 108 types</h3>
					<ul className="pl-8">
						<li className="list-disc py-3">
							Each class duration is 2 hours. Classes are conducted by BCS Cadre
							officers and experienced teachers. A teacher conducts classes on
							student needs and important topics with updated information. Care
							is taken not to waste valuable time of the students in the case of
							written examination classes. For this reason, topics that have
							lost importance or knowledge that students do not need are
							excluded.
						</li>
						<li className="list-disc py-3">
							A class test is conducted in every class.
						</li>
						<li className="list-disc py-3">
							So that a student can overcome his deficiency and prepare for any
							job.
						</li>
						<li className="list-disc py-3">
							Updated lecture sheets for all classes are provided.
						</li>
					</ul>
				</div>
				{/* <p className="text-[#006A4D] text-lg font-medium">Enroll Now</p> */}
			</div>
		</>
	);
};

export default Written;
