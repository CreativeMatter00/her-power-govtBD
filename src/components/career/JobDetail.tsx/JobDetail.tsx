"use client";

import { getJobDetailById } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { MdOutlineDateRange } from "react-icons/md";
import { RiMapPinLine } from "react-icons/ri";
import ScaleLoader from "react-spinners/ScaleLoader";

const JobDetail = () => {
  const t = useTranslations("career");

  const param = useParams();
  // console.log(param.id);

  // =========== DATA FETCHING =========

  const { isLoading, data, error } = useQuery({
    queryKey: ["getJobDetailById", param.id],
    queryFn: ({ queryKey }) => getJobDetailById(queryKey[1] as string),
  });

  // console.log(data);

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something_went_wrong")}
      </div>
    );

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
  }

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <ScaleLoader color="#421957" height={70} radius={8} width={10} />
        </div>
      ) : (
        <div className="container px-4 py-8 divide-y divide-[#DCDCDC] ">
          <div className="pb-5 flex justify-center">
               <Image
                          src={`${data.file_url}`}
                          alt="Job details image"
                          width={1024}
                          height={521}
                        />
          </div>
          <div className="pb-5">
            <p className="text-black text-2xl font-bold"></p>
            <p className="text-black text-xl flex items-center gap-4 divide-x my-4">
              <div className="font-bold">{data.provider_name}</div>
              <span className="font-normal pl-4"> {data.company_type}</span>
            </p>
            <div className="flex flex-col gap-4 text-[#252525] max-md:flex-col items-start">
              <div className="inline-flex gap-1 text-xl font-bold justify-center items-center">
                <RiMapPinLine /> {data.job_location} ({data.workplace_type})
              </div>

              <div className="inline-flex gap-1 text-xl font-bold justify-center items-center">
                <MdOutlineDateRange /> {data.job_type}
              </div>
            </div>
          </div>

          <div className="py-5">
            <p dangerouslySetInnerHTML={{ __html: data.jobdescription }}></p>

            <p className="font-semibold">
              {" "}
              {t("Deadline")}: {formatDate(data.validdate)}{" "}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
