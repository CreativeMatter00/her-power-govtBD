"use client";
import { getBlogById, url } from "@/api/api";
import CareerLoader from "@/components/shared/loader/CareerLoader";
import BreadCrumb from "@/components/ui/breadcrumb/BreadCrumb";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import Input from "./Input";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from "next-intl";
import { useCookies } from "next-client-cookies";

const BlogDetails = () => {
  const t = useTranslations("Blog");

  const router = useRouter();
  const locale = useLocale();
  const params = useParams();
  const cookies = useCookies();
  const user_pid = cookies.get("user_pid");
  const { id } = params;
  const [com, setCom] = useState("");
  const [showComment, setShowComment] = useState<number>(5);
  const [commentData, setCommentData] = useState<any[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCom(event.target.value);
  };

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["getBlogById", showComment],
    queryFn: () => getBlogById(id as string, showComment as number),
    enabled: !!showComment,
  });

  useEffect(() => {
    if (data?.comments) {
      setCommentData(data.comments);
    }
  }, [data]);
  // console.log("PM2",data);
  const newComments = (value: number) => {
    if (value > 5) {
      value = 5;
    }
    setShowComment((prev) => prev + value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (user_pid){
      formData.append("user_pid", user_pid)
    }else{
      router.push(`/${locale}/login`);
    }
    formData.append("comm_text", com);
    formData.append("active_status", "1");
    formData.append("parent_comment_pid", "");
    try {
      await axios.post(`${url}/api/admin/blog-comment/${id}`, formData);
      toast.success("Submitted successfully", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setCom("");
      refetch();
    } catch (error) {
      console.log("error", error);
    }
  };
  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Somethingwentwrong")}
      </div>
    );

  return (
    <>
      {/* breadcrumb */}
      <div className="mt-20 md:mt-14 mb-2 max-w-[1055px] mx-auto w-full">
        <BreadCrumb title1="Blogs" link1="meet-partners" title2={`${id}`} />
      </div>
      {isLoading ? (
        <div className="container max-w-7xl mt-20">
          <div className="mx-auto h-screen">
            <CareerLoader />
          </div>
        </div>
      ) : (
        <section className="border-t-2 border-brandLsPrimary mb-4 px-5 lg:px-0">
          <div className="my-6 max-w-5xl w-full mx-auto flex flex-col gap-6">
            {/* image */}
            <Image
              src={`${data.banner_file_url}`}
              alt="blog details image"
              width={1024}
              height={521}
            />
            {/* heading */}
            <h1 className="text-5xl leading-[56px] font-bold text-[#1C1C1C] ">
              {data.title}
            </h1>
            {/* border */}
            <p className="w-full h-[2px] bg-brandLsPrimary"></p>

            {/* texts */}
            <div className="w-full flex flex-col gap-6">
              <div
                className="py-5"
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></div>
              {/* chat with author */}
              <div className="flex flex-col gap-5">
                {/* heading */}
                <div className="flex items-center gap-3 text-[1.25rem] leading-7  text-brandDs font-bold">
                  <p>{t("ChatwithAuthor")}</p>
                  <Image
                    src="/assets/images/meet-partners/icons/chat.png"
                    alt="chat icon"
                    width={24}
                    height={19}
                  />
                </div>
                {/*  */}
                <div className="flex flex-col gap-2">
                  {!user_pid && (
                    <div className="text-[1rem] leading-6 flex items-center gap-1">
                      <p className="text-link hover:underline cursor-pointer ">
                        {t("Login")}
                      </p>
                      <p>{t("or")}</p>
                      <p className="text-link hover:underline cursor-pointer">
                        {t("Register")}
                      </p>
                      <p>{t("tochatwithauthor")}</p>
                    </div>
                  )}
                  {/*  */}
                  <div className="bg-bgSecondary rounded-[10px] border border-brandLsPrimary p-3 text-brandPrimary mb-10">
                    {/*  */}
                      <Input
                        buttonName={t("comment")}
                        value={com}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                      />
                    <div className="flex flex-col gap-5">
                      {commentData?.map((chat: any) => (
                        <Comment
                          key={chat?.comment_pid}
                          data={chat}
                          ownerId={data?.user_pid}
                          refetch={refetch}
                        />
                      ))}
                      {/*  */}
                    </div>
                    {data?.total_comments - showComment > 0 ? (
                      <button
                        onClick={() =>
                          newComments(data?.total_comments - showComment)
                        }
                        className="cursor-pointer py-1 px-2 hover:bg-brandLsSecondary rounded-md text-sm"
                      >
                        {t("Loadmore")}{" "}
                        {data?.total_comments - showComment > 5
                          ? "5"
                          : data?.total_comments - showComment}{" "}
                        {data?.total_comments === 1 ? "comment" : "comments"}
                      </button>
                    ) : (
                      data?.total_comments > 5 && (
                        <button
                          onClick={() => setShowComment(5)}
                          className="cursor-pointer py-1 px-2 hover:bg-brandLsSecondary rounded-md text-sm"
                        >
                          {t("Showless")}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogDetails;
