"use client";
import React, { FC, useState } from "react";
// import DateInput from "./inputFields/DateInput";
import FileInput from "./inputFields/FileInput";
import InputField from "./inputFields/InputField";
import TextInput from "./inputFields/TextInput";
import styles from "@/styles/Events.module.css";
import { RxCross2 } from "react-icons/rx";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import DateInput from "./inputFields/DateInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import axios from "axios";
import NewsFormSchema from "./NewsFormSchema";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Reducer/MainSlice";
import EditInput from "./inputFields/EditInput";
import { token, url } from "@/api/api";
import EditFileInput from "./inputFields/EditFileInput";

interface IFormInput {
  news_title: string;
  news_content: string;
  effectivefrom: string;
  effectiveto: string;
  news_author: string;
  attachments?: any;
}

interface IEditProps {
  setEditModalOpen: Function;
  refetch: any;
}

const EditLatesNewsForm: FC<IEditProps> = ({ setEditModalOpen, refetch }) => {
  const editData = useSelector((state: RootState) => state.Initial.val);
  //   console.log(editData);
  const [selectedFiles, setSelectedFiles] = useState<any>();
  const [isActive, setIsActive] = useState<boolean>(true);

  const [date, setDate] = React.useState<Date>();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // DD/MM/YYYY format
  };

  // ================ RESOLVER ====================
  const resolver = yupResolver(NewsFormSchema);

  // ======================== USE FORM ========================
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ resolver });

  // ================== FORM SUBMIT ==================
  const onSubmit = async (data: IFormInput) => {
    // console.log(data);
    // alert(JSON.stringify(data));

    const newsData = new FormData();
    newsData.append("news_title", data.news_title);
    newsData.append("news_content", data.news_content);
    newsData.append("effectivefrom", data.effectivefrom); // Ensure this is in the correct format
    newsData.append("effectiveto", data.effectiveto); // Ensure this is in the correct format
    newsData.append("ud_serialno", "1"); // Example static data
    newsData.append("news_author", data.news_author);

    if (selectedFiles && selectedFiles[0]) {
      newsData.append("attachments", selectedFiles[0]); // Attach the file
    } else {
      console.warn("No files selected");
    }

    try {
      const response = await axios.post(
        `${url}/api/admin/news/${editData.news_pid}?_method=PUT`,
        newsData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("API Response:", response.data);
      // alert("News submitted successfully!");
      refetch();
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      // alert("Failed to submit news.");
    }
    setEditModalOpen(false);
  };

  return (
    <>
      <section className="w-full">
        <main className={`rounded-2xl`}>
          <div className={`p-2`}>
            {/* ========================== HEADING PART ======================= */}
            <div className="border-b border-[#989898]">
              <div className="mx-12 my-4 flex justify-between items-center">
                <h1 className="text-xl text-[#1C1C1C] font-bold">
                  Add Latest News
                </h1>
                {/* <RxCross2 className="h-8 w-8 cursor-pointer" /> */}
              </div>
            </div>
            {/* ===================== FORM PART ========================= */}
            <div className="mx-12 my-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <div className="flex items-start gap-6">
                  {/* =========================== LEFT SIDE ======================== */}
                  <div className="basis-1/2 flex flex-col gap-4">
                    <EditInput
                      register={register}
                      errors={errors}
                      labelName="News Title"
                      inputName="news_title"
                      defaultValue={editData.news_title}
                      placeholderText="Enter News Title"
                      optional={true}
                    />
                    <div>
                      <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
                        News Description
                        <span
                          className={`text-dangerPrimary
                          }`}
                        >
                          *
                        </span>
                      </label>

                      <textarea
                        rows={13}
                        cols={10}
                        placeholder="News Descriptions"
                        defaultValue={editData?.news_content}
                        className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded w-full"
                        {...register("news_content")}
                      />
                      {errors.news_content && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.news_content?.message}
                        </p>
                      )}
                    </div>
                    {/* <TextInput /> */}
                    {/* <TextInput register={register} errors={errors} /> */}
                  </div>
                  {/* ===================== RIGHT SIDE ========================== */}
                  <div className="basis-1/2 flex flex-col gap-4">
                    {" "}
                    <EditFileInput // created new component form edit the file
                      selectedFiles={editData.attached_url}
                      setSelectedFiles={setSelectedFiles}
                      errors={errors}
                      register={register}
                    />
                    <div className="flex items-start gap-6 w-full">
                      <div className="w-full flex justify-between items-center gap-6">
                        <div className="w-1/2">
                          <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
                            Effective From
                            <span
                              className={`text-dangerPrimary
                            `}
                            >
                              *
                            </span>
                          </label>

                          <input
                            type="text"
                            defaultValue={formatDate(editData.effectivefrom)}
                            placeholder="DD/MM/YYYY"
                            className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded w-full"
                            {...register("effectivefrom")}
                          />
                          {errors.effectivefrom && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.effectivefrom?.message}
                            </p>
                          )}
                        </div>
                        <div className="w-1/2">
                          <label className="text-sm font-normal pb-2 pl-3 text-brandPrimary">
                            Effective To
                            <span
                              className={`text-dangerPrimary
                            `}
                            >
                              *
                            </span>
                          </label>

                          <input
                            type="text"
                            placeholder="DD/MM/YYYY"
                            defaultValue={formatDate(editData.effectivefrom)}
                            className="mt-1 block outline-none placeholder:text-[#cacaca] text-base py-2 pl-6 border border-brandLsPrimary rounded w-full"
                            {...register("effectiveto")}
                          />
                          {errors.effectiveto && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.effectiveto?.message}
                            </p>
                          )}
                        </div>
                      </div>
                      {/* <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover> */}
                      {/* <DateInput
												labelName="From"
												error={errors}
												register={register}
											/>

											<DateInput
												labelName="To"
												error={errors}
												register={register}
											/> */}
                    </div>
                    {/* ===================== AUTHOR ===================== */}
                    <EditInput
                      register={register}
                      errors={errors}
                      labelName="Author Name"
                      inputName="news_author"
                      defaultValue={editData.news_author}
                      placeholderText="Ente author name..."
                      optional={false}
                    />
                    {/* ========================= IS ACTIVE ========================== */}
                    {/* <div className="mt-4 w-full">
                      <div className="bg-[#F2F2F2]">
                        <div className="p-3 flex">
                          <button
                            type="button"
                            onClick={() => setIsActive(false)}
                            className={`${
                              isActive
                                ? "text-[#646464]"
                                : "bg-link text-[#FFFFFF]"
                            } text-base w-1/2 rounded py-3`}
                          >
                            Active
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsActive(true)}
                            className={`${
                              isActive
                                ? "bg-link text-[#FFFFFF]"
                                : "text-[#646464]"
                            } text-base w-1/2 rounded py-3`}
                          >
                            Inactive
                          </button>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* ======================== SUBMIT FORM =================== */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-success text-bgPrimary text-sm font-medium px-8 py-3 rounded-sm"
                  >
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default EditLatesNewsForm;
