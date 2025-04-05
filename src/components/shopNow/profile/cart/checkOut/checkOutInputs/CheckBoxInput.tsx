import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import LinksText from "./LinksText";

interface InputText {
	showBillingForm?: boolean;
	setShowBillingForm?: Function;
	inputText: string;
	linksText?: string;
	fontWeightClass: string;
}

const CheckBoxInput: React.FC<InputText> = ({
	inputText,
	linksText,
	fontWeightClass,
	showBillingForm,
	setShowBillingForm = () => {}
}) => {
	return (
		<>
			<div className="flex items-start md:items-center space-x-2">
				{/* ======================= CHECK BOX ========================== */}
				<Checkbox
					onClick={() => setShowBillingForm(!showBillingForm)}
					className="border-brandPrimary w-3 h-3 flex items-center justify-center"
				/>

				<div className="flex max-md:flex-col md:gap-2">
					{/* ======================= CHECK BOX LABEL ===================== */}
					<label
						className={`text-base ${`${fontWeightClass}`} leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center text-brandPrimary`}
					>
						{inputText}
					</label>

					{/* ===================== TERMS CONDITIONS POLICIES ========================= */}
					{linksText && <LinksText linksText={`${linksText}`} />}
				</div>
			</div>
		</>
	);
};

export default CheckBoxInput;
