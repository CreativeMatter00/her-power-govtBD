import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

type ConfirmTitle = {
  title: string;
  status: string; // Added status prop
};

const ConfirmAccountInfo: React.FC<ConfirmTitle> = ({ title, status }) => {
  return (
    <div className="w-full border border-brandLsPrimary rounded-md">
      <div className="flex justify-between items-center p-3">
        <div className="flex flex-col">
          <p className="text-brandPrimary text-base">{title}</p>
        </div>
        {status === "completed" ? (
          <FaRegCheckCircle size={25} className="text-green-500" />
        ) : (
          <MdErrorOutline size={25} className="text-red-500" />
        )}
      </div>
    </div>
  );
};

export default ConfirmAccountInfo;
