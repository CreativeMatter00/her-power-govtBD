"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface IFieldInfo {
	promotionDate: string;
	setPromotionDate: Function;
	label: string;
	errors: any;
	register: UseFormRegister<any>;
}

const DatePicker: React.FC<IFieldInfo> = ({
	label,
	promotionDate,
	setPromotionDate,
	errors,
	register,
}) => {
	const [date, setDate] = React.useState<Date>();
	React.useEffect(() => {
		if (date) {
			const formattedDate = format(date, "dd/MM/yyyy");
			setPromotionDate(formattedDate);
		}
	}, [date, setPromotionDate]);
	// console.log(promotionDate);
	return (
		<>
			<div>
				<div className="mb-1">
					<label className="text-brandPrimary font-normal text-sm pl-6">
						{label}
					</label>
				</div>

				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={cn(
								"w-full justify-start text-left text-brandPrimary font-normal border border-brandLsPrimary rounded-full",
								!date && "text-muted-foreground"
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{date ? (
								format(date, "dd/MM/yyyy")
							) : (
								<span className="text-greyPrimary">dd/mm/yyyy</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
};

export default DatePicker;
