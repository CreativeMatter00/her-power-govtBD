import { useTranslations } from "next-intl";
import React, { ChangeEvent } from "react";

interface IProps {
  value: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  buttonName:string;
  handleSubmit:() => void;
}

const Input: React.FC<IProps> = ({ value, handleInputChange,buttonName,handleSubmit}) => {
  const t=useTranslations("Blog");
  return (
    <div className="w-full flex gap-4 py-4 ">
      <input
        type="text"
        placeholder={t("comment here")}
        value={value}
        onChange={handleInputChange}
        className="flex-1 px-2 outline-brandDs rounded-md"
      />
      <button onClick={handleSubmit} className=" text-white rounded-md px-4 py-2 bg-brandPrimary hover:bg-brandHover duration-150 transition-all">{buttonName}</button>
    </div>
  );
};

export default Input;