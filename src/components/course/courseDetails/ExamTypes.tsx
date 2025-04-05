const ExamTypes = () => {
	return (
		<>
			<div className="my-8">
				<div className="flex justify-center items-center max-md:gap-0 gap-6 text-[#FFFFFF] max-md:text-base text-lg max-md:font-bold font-medium">
					<button className="bg-[#00745A] max-md:w-40 px-8 py-1.5 md:rounded-3xl">
						Preliminary
					</button>
					<button className="max-md:bg-[#C5FCE8] max-md:text-[#00745a] bg-[#00A24B] max-md:w-40 px-8 py-1.5 md:rounded-3xl">
						Written
					</button>
					<button className="max-md:bg-[#C5FCE8] max-md:text-[#00745a] bg-[#00A24B] max-md:w-40 px-8 py-1.5 md:rounded-3xl">
						Viva
					</button>
				</div>
			</div>
		</>
	);
};

export default ExamTypes;
