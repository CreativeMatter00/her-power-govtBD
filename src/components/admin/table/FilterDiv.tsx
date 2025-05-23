// import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { BiExport } from "react-icons/bi";

interface IFilterProps {
  filtering: string;
  setFiltering: React.Dispatch<React.SetStateAction<string>>;
  table: any;
  data?: any;
  buttonEnable?: boolean;
  children?: any;
  title?: string;
  addModalOpen?: boolean;
  setAddModalOpen?: any;
  open?: any;
  onOpenChange?: any;
}

// ============== FOR EXPORT OPTION ================
type Checked = DropdownMenuCheckboxItemProps["checked"];

const FilterDiv: React.FC<IFilterProps> = ({
  filtering,
  setFiltering,
  table,
  data,
  buttonEnable = true,
  children,
  title,
  addModalOpen,
  setAddModalOpen,
  open,
  onOpenChange,
}) => {
  const t = useTranslations("talentHunt");

  // ============================= EXPORT STATES =============================
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true);
  const [showPanel, setShowPanel] = useState<Checked>(false);

  // =================== 	HANDLE EXPORT FUNCTION ===========================
  return (
    <>
      <section className="my-6">
        <div className="flex justify-between items-center">
          <div>
            <input
              type="text"
              placeholder={t("Search")}
              name="search"
              value={filtering || ""}
              onChange={(e) => setFiltering(e.target.value)}
              className="text-[#1C1C1C] text-sm placeholder:text-sm placeholder:text-[#1C1C1C] outline-none border border-[#D4D4D4] w-80 px-4 py-2 rounded-md"
            />
          </div>
          <div className="flex items-center gap-6">
            {/* <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-sm text-bgPrimary font-medium px-6 py-2.5 bg-link rounded flex items-center gap-2 cursor-pointer outline-none">
                    <BiExport className="text-bgPrimary font-medium w-4 h-4" />
                    Export
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                    className="pl-6"
                  >
                    PDF
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                    className="pl-6"
                  >
                    Excel
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div> */}

            {buttonEnable && (
              <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogTrigger asChild>
                  <button className="bg-success text-sm text-bgPrimary font-medium px-8 py-2.5 rounded">
                    {title}
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-white w-[80vw]">
                  {children}
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default FilterDiv;
