import { UseFormRegister } from "react-hook-form";
import ProductInput from "../InputProduct/ProductInput";

interface ValidationInfo {
	// socialSharing: string;
	// setSocialSharing: Function;
	errors: any;
	register: UseFormRegister<any>;
}

const OtherSetting: React.FC<ValidationInfo> = ({
	errors,
	register,
	// socialSharing,
	// setSocialSharing,
}) => {
	return (
		<div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-3 mb-6">
			<div className="w-full">
				<ProductInput
					inputType="text"
					placeholderText="Type product tags"
					name="productTag"
					label="Product Tags"
					errors={errors}
					register={register}
				/>
			</div>
			<div className="w-full">
				{/* <label className="text-brandPrimary text-sm pl-6">Social Sharing</label> */}

				{/* <div className="flex gap-4 mt-2 max-md:ml-6 lg:ml-4"> */}
				{/* ======================= ENABLE ============================= */}
				{/* <div
						className={`flex items-center ${
							socialSharing === "enable" ? "" : ""
						}`}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="mr-2 cursor-pointer"
							onClick={() => setSocialSharing("enable")}
						>
							<circle cx="9" cy="9" r="9" fill="#EEDDF5" />
							<circle
								cx="9"
								cy="9"
								r="7"
								className={` ${
									socialSharing === "enable"
										? "fill-brandPrimary"
										: "fill-brandLsPrimary"
								}`}
							/>
						</svg>
						enable
					</div> */}

				{/* ============================= DISABLE =========================== */}
				{/* <div
						className={`flex items-center ${
							socialSharing === "disable" ? "" : ""
						}`}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="mr-2 cursor-pointer"
							onClick={() => setSocialSharing("disable")}
						>
							<circle cx="9" cy="9" r="9" fill="#EEDDF5" />
							<circle
								cx="9"
								cy="9"
								r="7"
								className={` ${
									socialSharing === "disable"
										? "fill-brandPrimary"
										: "fill-brandLsPrimary"
								}`}
							/>
						</svg>
						Disable
					</div> */}
				{/* </div> */}
			</div>
		</div>
	);
};

export default OtherSetting;
