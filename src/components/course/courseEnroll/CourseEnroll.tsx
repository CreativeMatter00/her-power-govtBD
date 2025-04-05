"use client";
import { useState } from "react";
import ImageInput from "./ImageInput";
import ImageInstruction from "./ImageInstruction";
import { FaRegCheckSquare } from "react-icons/fa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import PaymentMethod from "./PaymentMethod";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import EnrolledSchema from "./EnrolledSchema";
import CourseEnrollInput from "./CourseEnrollInput";
import ImageTitle from "./ImageTitle";

interface EnrolledInfo {
	candidateName: string;
	fatherName: string;
	dateOfBirth: string;
	nidNumber: string;
	phone: string;
	email: string;
	sscRoll: string;
	hscDiplomaRoll: string;
	presentEducation: string;
	eduInstitute: string;
	resultDate: string;
	city: string;
}

const CourseEnroll = () => {
	//  -------------------------------- state initialized for image & checkbox --------------------------------
	const [selectedImage, setSelectedImage] = useState<any>();
	const [checkedBox, setCheckedBox] = useState(false);

	// enrolled schema resolver -----------------------------------------------------
	const resolver = yupResolver(EnrolledSchema);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EnrolledInfo>();

	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors },
	// } = useForm<EnrolledInfo>({ resolver });

	// --------------------------- form submit function ------------------------------------
	const onSubmit: SubmitHandler<EnrolledInfo> = (data: EnrolledInfo) => {
		// console.log(data);
	};
	return (
		<>
			<section className=" bg-[#f1fffa]">
				<main className="container p-4">
					<ImageTitle />
					<div className="mt-16">
						<h1 className="text-3xl underline font-bold text-center">
							Application Form
						</h1>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="flex max-md:flex-col justify-between items-start max-md:gap-6 mt-6">
								<div className="max-md:order-2">
									<ImageInstruction />
								</div>

								<div className="max-md:order-1 max-md:flex max-md:justify-center max-md:items-center max-md:w-full">
									<ImageInput
										selectedImage={selectedImage}
										setSelectedImage={setSelectedImage}
									/>
								</div>
							</div>
							<div className="grid max-md:grid-cols-1 grid-cols-3 gap-6 text-base max-md:mt-8 my-4">
								<CourseEnrollInput
									inputType="text"
									inputName="candidateName"
									placeholderText="Candidate's Name"
									register={register}
									error={errors}
								/>
								<CourseEnrollInput
									inputType="text"
									register={register}
									error={errors}
									inputName="fatherName"
									placeholderText="Father's Name"
								/>
								<CourseEnrollInput
									inputType="text"
									register={register}
									error={errors}
									inputName="dateOfBirth"
									placeholderText="Date of Birth"
								/>

								<CourseEnrollInput
									inputType="text"
									register={register}
									error={errors}
									inputName="nidNumber"
									placeholderText="NID/Birth Certificate Number"
								/>

								<CourseEnrollInput
									inputType="text"
									register={register}
									error={errors}
									inputName="phone"
									placeholderText="Mobile Number"
								/>

								<CourseEnrollInput
									inputType="text"
									register={register}
									error={errors}
									inputName="email"
									placeholderText="Email"
								/>

								<CourseEnrollInput
									inputType="text"
									register={register}
									error={errors}
									inputName="sscRoll"
									placeholderText="SSC Roll"
								/>

								<CourseEnrollInput
									inputType="text"
									register={register}
									error={errors}
									inputName="hscDiplomaRoll"
									placeholderText="HSC/Diploma Roll"
								/>

								<CourseEnrollInput
									inputType="text"
									register={register}
									error={errors}
									inputName="presentEducation"
									placeholderText="Present Educational Engagement"
								/>

								<CourseEnrollInput
									inputType="text"
									register={register}
									error={errors}
									inputName="eduInstitute"
									placeholderText="School/College/Institute/University Name"
								/>

								<CourseEnrollInput
									inputType="text"
									register={register}
									error={errors}
									inputName="resultDate"
									placeholderText="Result Publishing Date"
								/>

								<CourseEnrollInput
									inputType="text"
									register={register}
									error={errors}
									inputName="city"
									placeholderText="Current City You Live in"
								/>
							</div>
							<div>
								<div className="flex justify-center max-md:items-start items-center gap-2 mt-16 text-[#252525]">
									{checkedBox ? (
										<button
											type="button"
											onClick={() => setCheckedBox(!checkedBox)}
										>
											<FaRegCheckSquare className="max-md:mt-1" />
										</button>
									) : (
										<button
											type="button"
											onClick={() => setCheckedBox(!checkedBox)}
										>
											<MdCheckBoxOutlineBlank className="max-md:mt-1" />
										</button>
									)}
									<p>
										I declare that all the information provided by me in this
										Application is true.
									</p>
								</div>
							</div>
							<PaymentMethod />
							<div className="flex justify-center items-center mt-4">
								<input
									type="submit"
									value="Apply Now"
									className="bg-[#00745A] rounded-3xl px-8 py-2 text-[#ffffff]"
								/>
							</div>
						</form>
					</div>
				</main>
			</section>
		</>
	);
};

export default CourseEnroll;
