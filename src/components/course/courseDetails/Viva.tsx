import ExamHeading from "./ExamHeading";

const Viva = () => {
	return (
		<>
			{/* --------------viva exam details ---------------- */}
			<div className="bg-[#FFFFFF] p-6 my-10">
				<ExamHeading examName="Viva" examFee="2000" />
				<div className="text-xl font-bold my-4">
					<p>Total Viva- 30</p>
					<p className="my-2">Model Viva- 03</p>
					<p>Final Viva- 03</p>
				</div>
				<p className="text-[#006A4D] text-lg font-medium">Enroll Now</p>
			</div>
		</>
	);
};

export default Viva;
