"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getSellerChat } from "../../../../../api/api";
import PaginationDiv from "../../../../admin/table/PaginationDiv";
import TableModel from "../../../../admin/table/TableModel";
import ReplyModal from "./ReplyModal";
import { FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTranslations } from "next-intl";

const Chat = (props: { sellerId: string }) => {
  const t=useTranslations("chat")
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [queryNumber,setQueryNumber]=useState(10);
  const [selectedQuestion, setSelectedQuestion] = useState<any>({});

  // ? API Calls

  const {
    isLoading,
    error,
    data: chatData,
    refetch,
  } = useQuery({
    queryKey: ["getSellerChat", props.sellerId],
    queryFn: ({ queryKey }) => getSellerChat(queryKey[1] as string,page,queryNumber),
  });
  const COLUMNS = [
    {
      header: t("Product Name"),
      accessorKey: "product_name",
    },
    {
      header: t("Question"),
      accessorKey: "product",
      cell: (row: any) => (
        <div className="flex items-center flex-col">
          <Image
            height={100}
            width={100}
            src={row.row.original?.producimg}
            alt={row.row.original?.product_name}
            className="w-24 h-24 "
          />
        </div>
      ),
      // console.log(row.row.original.producimg),
    },
    {
      header: t("Question"),
      accessorKey: "review_content",
    },
    {
      header: t("Answer"),
      accessorKey: "reply_content",
    },
    {
      header: t("Action"),
      accessorKey: "action",
      cell: (row: any) => (
        <>
          {/* {row.row.original.active_status &&  */}
          {
            <div>
              <button
                className="bg-sale px-4 py-2 text-white rounded flex items-center gap-3"
                onClick={() => {
                  setSelectedQuestion(row.row.original);
                  setOpen(true);
                }}
              >
                <FaArrowRight /> {t("Reply")}
              </button>
            </div>
          }
        </>
      ),
    },
  ];
  // ================= MEMOIZATION ================

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => chatData?.chatinfo?.data || [], [chatData]);

  // ================ TABLE FUNCITONALITY ===============
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});

  // ================= TABLE INSTANCE PROPERTIES ==================
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      columnVisibility: columnVisibility,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onColumnVisibilityChange: setColumnVisibility,
  });
  useEffect(()=>{
    setPage(table?.getState()?.pagination?.pageIndex + 1 || 1);
  },[table?.getState()?.pagination?.pageIndex]);
  useEffect(()=>{
    setQueryNumber(table.getState().pagination.pageSize);
  },[table.getState().pagination.pageSize])
  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something went wrong. Please reload")}
      </div>
    );

  return (
    <>
      <section className="container p-4">
        <h1 className="text-brandDs font-bold text-base mb-4">
          {t("Question & Answer")}
        </h1>

        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
          <DialogTrigger asChild>
            {/* Trigger for Dialog is now handled by button click */}
          </DialogTrigger>
          <DialogContent className="bg-white w-[80vw]">
            {selectedQuestion && (
              <ReplyModal
                question={selectedQuestion}
                onClose={() => setOpen(false)}
                refetch={refetch}
              />
            )}
          </DialogContent>
        </Dialog>

        {isLoading ? (
          <div className="w-screen h-screen flex justify-center items-center">
            <ScaleLoader color="#421957" height={70} radius={8} width={10} />
          </div>
        ) : (
          <div>
            <TableModel table={table} />
            <PaginationDiv table={table}/>
          </div>
        )}
        <ToastContainer />
      </section>
    </>
  );
};

export default Chat;
