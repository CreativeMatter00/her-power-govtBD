import Freelancer from "./skills/Freelancer";
import Instructions from "./skills/Instructions";
import Skills from "./skills/Skills";
import WorkHistory from "./skills/WorkHistory";

const FreelancerWorkHistorySkills = () => {
	return (
		<>
			<section className="border border-brandDs rounded-lg divide-y divide-brandDs">
				<Freelancer />
				<WorkHistory />
				<Instructions />
				<Skills />
			</section>
		</>
	);
};

export default FreelancerWorkHistorySkills;
