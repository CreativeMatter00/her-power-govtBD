"use client";
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import Title from "../../Title";
import { GoPlus } from "react-icons/go";
import { HiOutlineInformationCircle } from "react-icons/hi";
import AddJob from "./AddJob";

interface IProps {
	errors: any;
	register: UseFormRegister<any>;
}

const Job: React.FC<IProps> = ({ register, errors }) => {
	const [jobList, setJobList] = useState([0]);
	const handleAddJob = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setJobList([...jobList, jobList.length + 1]);
		// setValue("job", [...jobs, ""]); // Add an empty job
		// setValue("experience", [...experiences, ""]); // Add an empty experience
	};

	const handleRemoveJob = (
		indexToRemove: number,
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		setJobList(jobList.filter((_, index) => index !== indexToRemove));
		// setValue(
		// 	"job",
		// 	jobs.filter((_, index) => index !== indexToRemove)
		// );
		// setValue(
		// 	"experience",
		// 	experiences.filter((_, index) => index !== indexToRemove)
		// );
	};
	return (
		<>
			<div className="mt-16">
				<Title infoTitle="Work Experience" />
				<div className="mt-4">
					<div className="flex items-center gap-3">
						<div className="rounded-full bg-link hover:bg-linkHover min-w-fit">
							<button className="p-2" onClick={handleAddJob}>
								<GoPlus className="text-white" size={18} />
							</button>
						</div>
						<div className="flex gap-2">
							<HiOutlineInformationCircle className="h-5 w-5 text-brandPrimary" />
							<p>You can add more jobs by clicking the ‘+’ icon</p>
						</div>
					</div>
				</div>
				{jobList.map((_, index) => (
					<AddJob
						key={index}
						jobList={jobList}
						onRemove={(event) => handleRemoveJob(index, event)}
						errors={errors}
						register={register}
						componentNo={index}
					/>
				))}
			</div>
		</>
	);
};

export default Job;
