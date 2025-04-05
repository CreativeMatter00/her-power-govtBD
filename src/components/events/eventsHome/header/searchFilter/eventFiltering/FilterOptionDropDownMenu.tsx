"use client";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import { LuClock5 } from "react-icons/lu";
import { PiMapPinArea, PiVideo } from "react-icons/pi";

const FilterOptionDropDownMenu = () => {
	type Checked = DropdownMenuCheckboxItemProps["checked"];
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [showStatusBar, setShowStatusBar] = useState<Checked>(true);
	const [showActivityBar, setShowActivityBar] = useState<Checked>(false);
	const [showPanel, setShowPanel] = useState<Checked>(false);
	// console.log(isOpen);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild className="w-fit">
					{/* <Button type="button"> */}
					{/* <p>open </p> */}
					<div className="flex items-center gap-3">
						{/* =========================== MAP AREA ICON ============================== */}
						<PiMapPinArea className="text-brandPrimary w-4 h-[18px] cursor-pointer" />
						{/* ==================================== LOCATION =========================== */}
						<p
							className={`text-base font-bold underline underline-offset-4 decoration-2 decoration-greyPrimary cursor-pointer ${
								isOpen ? "text-greySecondary" : "text-brandPrimary"
							}`}
						>
							Dhaka
						</p>
					</div>
					{/* </Button> */}
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-full mx-4">
					{/* ================================== 1ST ITEM ============================ */}
					<DropdownMenuCheckboxItem
						onCheckedChange={setShowStatusBar}
						className="group hover:bg-brandLsPrimary gap-4 text-base text-brandPrimary hover:text-brandDs"
					>
						<PiMapPinArea className="w-5 h-5 text-brandPrimary group-hover:text-brandDs" />
						Use my current location
					</DropdownMenuCheckboxItem>
					{/* ================================== 2ND ITEM ============================ */}
					<DropdownMenuCheckboxItem
						// checked={showActivityBar}
						onCheckedChange={setShowActivityBar}
						className="group hover:bg-brandLsPrimary gap-4 text-base text-brandPrimary hover:text-brandDs border-b border-brandLsPrimary py-3"
					>
						<PiVideo className="w-5 h-5 text-brandPrimary group-hover:text-brandDs" />
						Browse online events
					</DropdownMenuCheckboxItem>
					{/* ======================================= 3RD ITEM ========================= */}
					<DropdownMenuCheckboxItem
						className="group hover:bg-brandLsPrimary gap-4 text-base text-brandPrimary hover:text-brandDs py-2"
						onCheckedChange={setShowPanel}
					>
						<div>
							<div className="flex items-center gap-4">
								<LuClock5 className="w-5 h-5 text-brandPrimary group-hover:text-brandDs" />
								Dhaka
							</div>
							<p className=" text-greyPrimary text-sm ml-9">Bangladesh</p>
						</div>
					</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default FilterOptionDropDownMenu;
