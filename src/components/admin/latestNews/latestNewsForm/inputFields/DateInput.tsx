"use client";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { format } from "date-fns";

interface IInputInfo {
	labelName: string;
	error: any;
	register: UseFormRegister<any>;
}

const DateInput: React.FC<IInputInfo> = ({ labelName, error, register }) => {
	const [date, setDate] = React.useState<Date>();

	return (
		<>
			<div className="w-full">
				<label className="text-sm font-normal pb-2 pl-3 text-brandPrimary block">
					{labelName}
				</label>
				<Popover>
					<PopoverTrigger asChild className="border border-brandLsPrimary">
						<Button
							variant={"outline"}
							className={cn(
								"w-full justify-start text-left font-normal",
								!date && "text-muted-foreground"
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{date ? format(date, "PPP") : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0 z-[999999999999999999999999]">
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

export default DateInput;

{
	/* <div className="flex items-center gap-6 w-full mb-4">
					<div className="w-full">
						<label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
							From
						</label>
						<input
							type="date"
							name="dateFrom"
							placeholder="From..."
							className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 px-6 border border-brandLsPrimary rounded w-full"
						/>
					</div>

					<div className="w-full">
						<label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
							To
						</label>
						<input
							type="date"
							name="dateTo"
							placeholder="To..."
							className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 px-6 border border-brandLsPrimary rounded w-full"
						/>
					</div>
				</div> */
}
