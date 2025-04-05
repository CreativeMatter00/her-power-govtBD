import { FC } from "react";
import { FaCaretRight } from "react-icons/fa";

type IJobSkills = {
	setActive: Function;
};

const JobSkills: FC<IJobSkills> = ({ setActive }) => {
	return (
		<div className="container mx-auto">
			<div>
				<div className="flex items-center w-fit gap-3 mt-3">
					<button className="text-2xl" onClick={() => setActive(3)}>
						Next
					</button>
					<FaCaretRight className="w-3 h-6" />
				</div>
			</div>
		</div>
	);
};

export default JobSkills;
