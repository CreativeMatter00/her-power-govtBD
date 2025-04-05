import React from "react";
import ProfileInput from "./ProfileInput";

interface IProps {
	setEditProfile: Function;
}

const EditProfileForm: React.FC<IProps> = ({ setEditProfile }) => {
	return (
		<section className="my-6">
			{/* ========================== FORM =========================== */}
			<form
				action="submit"
				className="border border-brandLsPrimary rounded-md max-md:p-3 p-6 text-brandPrimary"
			>
				{/* ----------------------- personal information --------------------------- */}
				<div>
					<h1 className="text-base font-bold my-3 pb-3 border-b border-brandLsPrimary">
						My Personal Information
					</h1>
					<div className="flex max-md:flex-col max-md:justify-center justify-evenly items-start max-md:gap-0 gap-8">
						<div className="w-full max-md:basis-1/2">
							<ProfileInput
								labelName="Name of Organizer"
								inputType="text"
								inputName="nameOfOrganizer"
								defaultValueInfo="MD. Samiul Islam"
								required={true}
							/>
							<ProfileInput
								labelName="Mobile Number"
								inputType="text"
								inputName="mobileNumber"
								defaultValueInfo="+8801900000000"
								required={true}
							/>
						</div>
						<div className="w-full max-md:basis-1/2">
							<ProfileInput
								labelName="Last Name"
								inputType="text"
								inputName="mobileNumber"
								defaultValueInfo="+8801900000000"
								required={true}
							/>
						</div>
					</div>

					{/* -------------------- My Address --------------------- */}
					<div>
						<h1 className="text-base font-bold my-3 pb-3 border-b border-brandLsPrimary">
							My Addresses
						</h1>
						<div className="flex max-md:flex-col max-md:justify-center justify-evenly items-start max-md:gap-0 gap-8">
							<div className="w-full max-md:basis-1/2">
								<ProfileInput
									labelName="Address"
									inputType="text"
									inputName="address"
									defaultValueInfo="House No: 1, Road No: 1, Block: A"
									required={true}
								/>
								<ProfileInput
									labelName="City"
									inputType="text"
									inputName="city"
									defaultValueInfo="Dhaka-North"
									required={true}
								/>
							</div>
							<div className="w-full max-md:basis-1/2">
								<ProfileInput
									labelName="Area"
									inputType="text"
									inputName="area"
									defaultValueInfo="Mirpur - 10"
									required={true}
								/>
								<ProfileInput
									labelName="Zip Code"
									inputType="text"
									inputName="zipCode"
									defaultValueInfo="1236"
									required={true}
								/>
							</div>
						</div>
					</div>

					<div className="mt-4 flex items-center gap-8">
						<button
							type="submit"
							onClick={() => setEditProfile(false)}
							className="bg-link text-white text-base font-bold py-2 px-6 rounded-md"
						>
							Save Changes
						</button>
						<button
							type="button"
							onClick={() => setEditProfile(false)}
							className="bg-dangerPrimary text-white text-base font-bold py-2 px-6 rounded-md"
						>
							Cancel
						</button>
					</div>
				</div>
			</form>
		</section>
	);
};

export default EditProfileForm;
