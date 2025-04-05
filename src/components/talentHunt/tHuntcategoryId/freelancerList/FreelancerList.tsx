import Filter from "./filter/Filter";
import Freelancer from "./freelancer/Freelancer";

const freelancers = [
	{
		title: "",
	},
];
const FreelancerList = () => {
	return (
		<>
			<section className="grid grid-cols-4 gap-4 my-20 py-1">
				<div className="col-span-1">
					<Filter />
				</div>
				<div className="col-span-3">
					<Freelancer />
				</div>
			</section>
		</>
	);
};

export default FreelancerList;
