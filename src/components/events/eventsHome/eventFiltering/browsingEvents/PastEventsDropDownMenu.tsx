"use client";
import { getAllDevisions as getAllDivisions } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

interface IProps {
  division: string;
  setDivision: Function;
  setSelectedDivision: Function;
}

const PastEventsDropDownMenu: React.FC<IProps> = ({
  division,
  setDivision,
  setSelectedDivision,
}) => {
  type Checked = DropdownMenuCheckboxItemProps["checked"];
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  const {
    isLoading,
    error,
    data: allDivisions,
    refetch,
  } = useQuery({
    queryKey: ["allDivisions"],
    queryFn: () => getAllDivisions(),
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button">
            {isOpen ? (
              <MdOutlineKeyboardArrowUp className="w-7 h-7 text-brandPrimary" />
            ) : (
              <MdOutlineKeyboardArrowDown className="w-7 h-7 text-brandPrimary" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72">
          {allDivisions?.data?.map((division: any, index: number) => (
            <DropdownMenuCheckboxItem
              key={index}
              onCheckedChange={setShowStatusBar}
              onSelect={() => {
                setDivision(division?.division_name);
                setSelectedDivision(division?.division_code);
              }}
              className="group hover:bg-brandLsPrimary gap-4 text-base text-brandPrimary hover:text-brandDs"
            >
              {division?.division_name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default PastEventsDropDownMenu;
