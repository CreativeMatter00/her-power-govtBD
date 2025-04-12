"use client";
import { getCommentById, getUserInfo, url } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import axios from "axios";
import Input from "./Input";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useCookies } from "next-client-cookies";
import { useTranslations } from "next-intl";

const Comment = ({ data, ownerId, refetch }: any) => {
  const cookies = useCookies();
  const user_pid = cookies.get("user_pid");
  const params = useParams();
  const { id } = params;
  const [com, setCom] = useState("");
  const [showReply, setShowReply] = useState<number>(0);
  const [openReply, setOpenReply] = useState(false);
  const [replyData, setReplyData] = useState(data?.reply ? [data.reply] : []);
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { refetch: userRefetch, data: user } = useQuery({
    queryKey: ["userInfo", data?.user_pid],
    queryFn: () => getUserInfo(data?.user_pid as string),
  });

  const { refetch: replyRefetch, data: reply } = useQuery({
    queryKey: ["getCommentById", data?.comment_pid, showReply],
    queryFn: () => getCommentById(data?.comment_pid, showReply),
  });
  console.log("PM",data);
  // console.log("GGT",reply);

  useEffect(() => {
    if (reply) {
      setReplyData(() => [...reply]);
    }
  }, [reply]);

  useEffect(() => {
    if (edit) {
      inputRef?.current?.focus();
    }
  }, [edit]);

  const newReplies = (value: number) => {
    if (value > 2) {
      value = 2;
    }
    setShowReply((prev) => prev + value);
    replyRefetch();
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("comm_text", com);
    if (user_pid) formData.append("user_pid", user_pid);
    formData.append("active_status", "1");
    formData.append("parent_comment_pid", data?.comment_pid);
    try {
      await axios.post(`${url}/api/admin/blog-comment/${id}`, formData);
      refetch();
      replyRefetch();
      setCom("");
      setOpenReply(false);
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
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleSave = async () => {
    const formData = new FormData();
    if (inputRef.current)
      formData.append("comm_text", inputRef.current.innerText);
    if (user_pid) formData.append("user_pid", user_pid);
    try {
      const response = await axios.post(
        `${url}/api/admin/blog-comment-update/${data?.comment_pid}`,
        formData
      );
      if (response?.data?.meta?.status === true) {
        toast.success("Comment Edited Successfully!", {
          position: "bottom-left",
          autoClose: 3001,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEdit(false);
        refetch();
      } else {
        toast.error("Comment Edit failed! Please try again.", {
          position: "bottom-left",
          autoClose: 3001,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error: any) {
      toast.error("Comment Edit failed! Please try again.", {
        position: "bottom-left",
        autoClose: 3001,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("error", error.response ? error.response.data : error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${url}/api/admin/delete-comment/${data?.comment_pid}`
      );
      if (response?.data?.meta?.status === true) {
        toast.success("Comment Deleted Successfully!", {
          position: "bottom-left",
          autoClose: 3001,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        refetch();
      } else {
        toast.error("Delete failed! Please try again.", {
          position: "bottom-left",
          autoClose: 3001,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error: any) {
      toast.error("Job Posting failed! Please try again.", {
        position: "bottom-left",
        autoClose: 3001,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("error", error.response ? error.response.data : error);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCom(event.target.value);
  };
  const t = useTranslations("Blog");
  return (
    <div className="flex items-start gap-1 my-1 p-2 rounded-md relative">
      {data?.total_reply > 0 && (
        <div className=" border border-greyPrimary absolute top-7 bottom-5 left-3.5" />
      )}
      {data?.total_reply > 0 && (
        <div className=" border border-greyPrimary absolute bottom-5 left-3.5 right-[92%] md:right-[96%] lg:right-[97%]" />
      )}
      <Image
        src={"/assets/images/meet-partners/icons/user 1.png"}
        alt="user icon"
        width={16}
        height={16}
        className="my-1"
      />

      {/* texts */}
      <div className="flex flex-col gap-1 flex-1">
        {/* name date */}
        <div className="flex items-center gap-2">
          <div className="text-brandPrimary flex gap-2">
            <p className={`${data?.user_pid === ownerId ? "text-link" : ""}`}>
              {user?.fname}{" "}
            </p>
            {data?.user_pid === ownerId && "(Author)"}
          </div>
          <Image
            src={"/assets/images/meet-partners/icons/Ellipse 246.png"}
            width={6}
            height={6}
            alt="dot icon"
          />
          <p className="text-greyPrimary">
            {data?.comm_date?.split(" ")[0].split("-").reverse().join("-")}
          </p>
        </div>
        {/* reply description */}
        <p
          className="pl-2"
          contentEditable={edit}
          suppressContentEditableWarning={edit}
          ref={inputRef}
        >
          {data?.comm_text}
        </p>
        <div className="flex flex-col pl-1">
          {data?.user_pid === user_pid ? (
            edit ? (
              <>
                <div className="flex gap-4">
                  <button
                    className="text-brandPrimary font-bold"
                    onClick={handleSave}
                  >
                    {t("Save")}
                  </button>
                  <button
                    className="text-brandHover font-bold"
                    onClick={() => {
                      if (inputRef.current) {
                        inputRef.current.innerText = data?.comm_text;
                      }
                      setEdit(false);
                    }}
                  >
                    {t("Cancel")}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-4">
                  <button
                    className="text-brandPrimary font-bold"
                    onClick={() => setEdit(true)}
                  >
                    {t("Edit")}
                  </button>
                  <button
                    className="text-brandHover font-bold"
                    onClick={handleDelete}
                  >
                    {t("Delete")}
                  </button>
                </div>
              </>
            )
          ) : (
            <div>
              <div className="flex gap-4 text-sm pl-1">
                {user_pid && (
                  <button
                    className="text-brandHover font-bold"
                    onClick={() => setOpenReply((prev) => !prev)}
                  >
                    {t("Reply")}
                  </button>
                )}
                {data?.total_reply > 0 && <div> | </div>}
                {data?.total_reply > 0 && (
                  <p>
                    {data?.total_reply}{" "}
                    {data?.total_reply === 1 ? t("reply") : t("replies")}
                  </p>
                )}
              </div>
              {openReply && (
                <div className="w-full">
                  <Input
                    buttonName={t("comment")}
                    value={com}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="pl-3">
          {replyData?.map((d: any) => (
            <Comment
              key={d?.comment_pid}
              data={d}
              ownerId={ownerId}
              refetch={replyRefetch}
            />
          ))}
        </div>
        <div>
          {data?.total_reply - showReply > 0 ? (
            <button
              onClick={() => newReplies(data?.total_reply - showReply)}
              className="cursor-pointer py-1 px-2 hover:bg-brandLsSecondary rounded-md text-sm"
            >
              {t("See1")}{" "}
              {data?.total_reply - showReply > 2
                ? "2"
                : data?.total_reply - showReply}{" "}
              {t("more")} {data?.total_reply === 1 ? t("reply") : t("replies")}
            </button>
          ) : (
            data?.total_reply > 0 && (
              <button
                onClick={() => setShowReply(0)}
                className="cursor-pointer py-1 px-2 hover:bg-brandLsSecondary rounded-md text-sm"
              >
                {t("Show less")}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
