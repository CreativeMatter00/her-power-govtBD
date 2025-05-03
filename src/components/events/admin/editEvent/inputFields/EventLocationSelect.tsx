"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// ***************************************** CATEGORY TYPE DEFINITION ================================
type TEventLocation = {
	locationName: string;
	locationValue: string;
};

// **************************************** PROPS TYPE DEFINITION =================================
type TProps = {
	eventLocation: TEventLocation[];
	labelName: string;
	placeholderText: string;
};

const EventLocationSelect: React.FC<TProps> = ({
	eventLocation,
	labelName,
	placeholderText,
}) => {
	// console.log(eventCategories);
	return (
		<div>
			{/* ======================================= LABEL ======================================== */}
			<div className="mb-1">
				<label className="text-brandPrimary text-sm pl-6">{labelName}</label>
			</div>
			<Select>
				<SelectTrigger
					className={`w-1/2 max-lg:w-full border border-brandLsPrimary text-brandPrimary px-6`}
				>
					<SelectValue
						className="text-sm placeholder:text-greyPrimary"
						placeholder={placeholderText}
					/>
				</SelectTrigger>
				<SelectContent className="">
					{eventLocation.map((location, index) => (
						<div key={index}>
							<SelectItem
								className="border-b-2 border-brandLsPrimary text-sm text-brandPrimary "
								value={`${location.locationValue}`}
							>
								{location.locationName}
							</SelectItem>
						</div>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default EventLocationSelect;
