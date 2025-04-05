"use client";

import { useState } from "react";
import FinancialConstraint from "./financialConstraint/FinancialConstraint";
import JobDescription from "./jobDescription/JobDescription";
import JobDetails from "./jobDetails/JobDetails";
import JobInfo from "./jobInfo/JobInfo";
import JobPost from "./jobPost/JobPost";
import JobSkills from "./jobSkills/JobSkills";
import JobStepper from "./JobStepper";

const JobReview = () => {
	const [active, setActive] = useState<number>(1);

	return (
		<>
			<div className="pt-8 px-4">
				<JobStepper active={active} />
			</div>

			{active === 1 && <JobPost setActive={setActive} />}
			{active === 2 && <JobSkills setActive={setActive} />}
			{active === 3 && <JobInfo setActive={setActive} />}
			{active === 4 && <FinancialConstraint setActive={setActive} />}
			{active === 5 && <JobDescription setActive={setActive} />}
			{active === 6 && <JobDetails />}
		</>
	);
};

export default JobReview;
