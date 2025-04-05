// import { RxUnderline } from "react-icons/rx";
// import { MdOutlineFormatBold } from "react-icons/md";
// import { VscItalic } from "react-icons/vsc";
// import { IoList } from "react-icons/io5";
// import { MdFormatListNumbered } from "react-icons/md";
import { UseFormRegister } from "react-hook-form";
import React from "react";

interface IFieldInfo {
	errors: any;
	register: UseFormRegister<any>;
}

const TextInput: React.FC<IFieldInfo> = ({ errors, register }) => {
	return (
		<>
			<div className={``}>
				<label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
					Category Description
				</label>

				<div className="border border-brandLsPrimary w-full rounded mt-1">
					<textarea
						rows={13}
						placeholder="Write Description"
						className=" block outline-none placeholder:text-[#cacaca] text-base py-2 px-4 w-full resize-none "
						{...register("category_desc", {
							required: "Category description is required",
						})}
					></textarea>
				</div>
			</div>
		</>
	);
};

export default TextInput;

{
	/* ================ BOLD, ITALIC, UNDERLINE, DOT LIST, NUMBER LIST ================= */
}
{
	/* <div className="p-2 bg-[#F6F9F8] rounded-t">
            <div className="flex items-center gap-4">
              <MdOutlineFormatBold className="text-brandPrimary w-6 h-6" />
              <VscItalic className="text-brandPrimary w-6 h-6" />
              <RxUnderline className="text-brandPrimary w-6 h-6" />
              <IoList className="text-brandPrimary w-6 h-6" />
              <MdFormatListNumbered className="text-brandPrimary w-6 h-6" />
            </div>
          </div> */
}
