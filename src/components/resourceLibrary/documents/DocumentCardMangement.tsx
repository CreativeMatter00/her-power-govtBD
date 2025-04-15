import Image from "next/image";
import React from "react";
import { SlCalender } from "react-icons/sl";
import styles from "@/styles/Events.module.css";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useTranslations } from "next-intl";
interface IDocProps {
  ref_object_name: string;
  file_url: string;
}

interface DocumentCardProps {
  cardId: string;
  cardTitle: string;
  cardDate: string;
  documents: IDocProps[];
  handleDelete: (cardId: string) => void;
}

const DocumentCardManagement: React.FC<DocumentCardProps> = ({
  cardId,
  cardTitle,
  cardDate,
  documents,
  handleDelete,
}) => {
  const downloadAllDocuments = async () => {

    try {
      for (const doc of documents) {
        const response = await axios({
          url: doc.file_url,
          method: "GET",
          responseType: "blob",
        });
        const blob = response.data;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = doc.ref_object_name;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (error) {
      console.error("Error downloading files:", error);
    }
  };

  const t = useTranslations("resources_Library");

  return (
    <div
      className={`flex gap-2 bg-cardColor ${styles.cardShadowHover} p-3 group rounded h-full`}
    >
      <div className="relative rounded-md">
        <Image
          src={"/assets/images/resource/Images/pdfImg.png"}
          alt={cardTitle}
          width={80}
          height={100}
          className="w-auto h-16"
        />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col justify-between gap-2 px-3 h-full break-words">
          <div className="flex flex-col gap-2 justify-center h-full">
            <h1 className="text-xl text-brandPrimary font-normal">
              {cardTitle}
            </h1>
            <div className="flex items-center gap-2">
              <SlCalender className="text-admin_Text2" />
              <p className="text-sm text-brandPrimary font-normal">
                {cardDate}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="bg-brandDs text-sm py-1 px-2 text-white rounded-md"
            onClick={downloadAllDocuments}
          >
            {t("Download")}
          </button>
          <button onClick={() => handleDelete(cardId)}>
            <MdDelete size={30} className="text-dangerPrimary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCardManagement;
