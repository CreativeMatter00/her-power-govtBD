"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { RiInformation2Line } from "react-icons/ri";

export function CheckboxInput() {
	return (
		<div className="flex items-center space-x-2 mt-2 lg:mt-7 max-md:ml-3">
			<Checkbox className="border-brandPrimary" />
			<label className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 text-brandPrimary">
				Low stock alert
				<span className="text-greyPrimary text-sm font-normal">(optional)</span>
				<RiInformation2Line type="button" />
			</label>
		</div>
	);
}
