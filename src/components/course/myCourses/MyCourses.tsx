import CourseCard from "../courseCategory/CourseCard";

const MyCourses = () => {
	const courses = [
		{
			title: "Bangladesh Civil Service (BCS) Exam",
			image: "/assets/images/course/BCS logo.png",
			description: "10 Minute School",
			mentor: "Mehedi Hasan",
			buttonText: "Enroll Now",
			// onButtonClick: () => alert("Enrolled in BCS Exam"),
		},
		{
			title: "NTRCA Exam",
			image: "/assets/images/course/NTRCA.png",
			description:
				"Non Govt. Teachers Registration and Certification Authority (NTRCA)",
			mentor: "Sadman Sadik",
			buttonText: "Enroll Now",
			// onButtonClick: () => alert("Enrolled in NTRCA Exam"),
		},
		{
			title: "Bangladesh Civil Service (BCS) Exam",
			image: "/assets/images/course/BCS logo.png",
			description: "10 Minute School",
			mentor: "Kazi Mahbubur Rahman",
			buttonText: "Enroll Now",
			// onButtonClick: () => alert("Enrolled in BCS Exam"),
		},
		{
			title: "NTRCA Exam",
			image: "/assets/images/course/NTRCA.png",
			description:
				"Non Govt. Teachers Registration and Certification Authority (NTRCA)",
			mentor: "Bijon Islam",
			buttonText: "Enroll Now",
			// onButtonClick: () => alert("Enrolled in NTRCA Exam"),
		},
		{
			title: "Bangladesh Civil Service (BCS) Exam",
			image: "/assets/images/course/BCS logo.png",
			description: "10 Minute School",
			mentor: "Hasin Hayder",
			buttonText: "Enroll Now",
			// onButtonClick: () => alert("Enrolled in BCS Exam"),
		},
		{
			title: "NTRCA Exam",
			image: "/assets/images/course/NTRCA.png",
			description:
				"Non Govt. Teachers Registration and Certification Authority (NTRCA)",
			mentor: "Zubair Junayed",
			buttonText: "Enroll Now",
			// onButtonClick: () => alert("Enrolled in NTRCA Exam"),
		},
		{
			title: "Bangladesh Civil Service (BCS) Exam",
			image: "/assets/images/course/BCS logo.png",
			description: "10 Minute School",
			mentor: "Abrar Hossain Sayem",
			buttonText: "Enroll Now",
			// onButtonClick: () => alert("Enrolled in BCS Exam"),
		},
		{
			title: "NTRCA Exam",
			image: "/assets/images/course/NTRCA.png",
			description:
				"Non Govt. Teachers Registration and Certification Authority (NTRCA)",
			mentor: "Kazi Mahbubur Rahman",
			buttonText: "Enroll Now",
			// onButtonClick: () => alert("Enrolled in NTRCA Exam"),
		},
		// Add more courses as needed
	];

	return (
		<div className="container mx-auto">
			<p className="text-xl font-bold py-4 border-b border-brandDs">
				{" "}
				My Courses{" "}
			</p>

			<div className="py-8">
				{/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{courses.map((course, index) => (
						<CourseCard
							key={index}
							id={index}
							title={course.title}
							image={course.image}
							description={course.description}
							mentor={course.mentor}
							buttonText={course.buttonText}
						/>
					))}
				</div> */}
			</div>
		</div>
	);
};

export default MyCourses;
