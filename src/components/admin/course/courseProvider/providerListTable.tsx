/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { courseApprove, getAllProviders } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CellContext,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Check, CircleCheck, View, X } from "lucide-react";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useMemo, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterDiv from "../../table/FilterDiv";
import PaginationDiv from "../../table/PaginationDiv";
import TableModel from "../../table/TableModel";
const ProviderListTable = () => {
  // ============ DATA FETCHING ============
  const { isLoading, data: allProvidersData } = useQuery({
    queryKey: ["getAllProviders"],
    queryFn: () => getAllProviders(),
  });
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      course_pid,
      data,
    }: {
      course_pid: string | null;
      data: any;
    }) => courseApprove(course_pid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProviders"] });
    },
  });

  const [viewData, setViewData] = useState<any | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [courseFlag, setCourseFlag] = useState<string | null>("");
  const [courseId, setCourseId] = useState<string | null>("");

  const cookies = useCookies();
  const user_pid = cookies.get("user_pid");
  const handleView = (rowData: any) => {
    setViewData(rowData);
    setViewModalOpen(true);
  };
  const handleApproveStatus = (courseInfo: any, flag: string) => {
    setCourseFlag(flag);
    setCourseId(courseInfo?.providor_pid);
    setApproveModalOpen(true);
  };

  // ================ DEFINING COLUMN ===============
  const COLUMNS = [
    {
      header: "ID",
      accessorKey: "",
      enableColumnFilter: false,
      enableSorting: false,
      cell: (info: CellContext<any, any>) => info.row.index + 1,
    },
    {
      header: "Name",
      accessorKey: "providor_name",
    },
    {
      header: "E-mail",
      accessorKey: "email_id",
    },

    {
      header: "Mobile No.",
      accessorKey: "mobile_no",
    },
    {
      header: "Approve Status",
      accessorKey: "approve_flag",
      enableColumnFilter: false,
      cell: (row: any) => {
        const f = row?.row?.original?.approve_flag?.toLowerCase();
        if (f === "y") return "Approved";
        if (f === "c") return "Rejected";
        if (f === "n") return "Pending";
      },
    },
    {
      header: "Approve Sellers",
      enableColumnFilter: false,
      enableSorting: false,
      cell: (row: any) => {
        const f = row?.row?.original?.approve_flag?.toLowerCase();
        console.log({ f });
        const isDisable = () => f === "y" || f === "c";
        const disable = isDisable();
        return (
          <div className="flex justify-center items-center gap-3">
            <button
              disabled={disable}
              onClick={() => handleApproveStatus(row?.row?.original, "c")}
              className={`bg-[#c9332e] text-white text-sm p-2 px-4 rounded flex items-center gap-1 ${
                disable ? "opacity-25" : "opacity-100"
              }`}
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              disabled={disable}
              onClick={() => handleApproveStatus(row?.row?.original, "y")}
              className={`bg-[#288d57] text-white text-sm p-2 px-4 rounded flex items-center gap-1 ${
                disable ? "opacity-25" : "opacity-100"
              }`}
            >
              <Check className="w-4 h-4" />
              Approve
            </button>
          </div>
        );
      },
    },
    {
      header: "View Details",
      cell: (row: any) => (
        <div>
          <button
            onClick={() => handleView(row?.row?.original)}
            className="bg-green-100 text-green-700 flex items-center px-3 py-2 rounded-md"
          >
            <View /> View
          </button>
        </div>
      ),
    },
  ];

  // ================= MEMOIZATION ================
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => allProvidersData || [], [allProvidersData]);
  // ================ TABLE FUNCITONALITY ===============
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});

  // ================= TABLE INSTANCE PROPERTIES ===========
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onColumnVisibilityChange: setColumnVisibility,
  });

  const handleApproveSubmit = (flag: string | null) => {
    if (!flag) return;
    const formData = new FormData();
    if (user_pid) formData.append("user_pid", user_pid);
    formData.append("approve_status", flag?.toUpperCase());
    mutateAsync({ course_pid: courseId, data: formData }).then((res) => {
      if (res?.meta?.status === true) {
        toast.success(res?.meta?.message);
      }
      setApproveModalOpen(false);
    });
  };

  const viewTableData = ({
    title,
    value,
    flag,
    img,
  }: {
    title: string;
    value?: string | null;
    flag?: boolean;
    img?: string;
  }) => {
    const isFlag = (flagValue: string | null | undefined) => {
      const f = flagValue?.toLowerCase();
      if (f === "y") return "Approved";
      if (f === "c") return "Rejected";
      if (f === "n") return "Pending";
    };

    return (
      <div className="border p-2 grid grid-cols-2 rounded-md">
        <h2 className="text-base capitalize font-medium">{title}</h2>
        <p className="border-l pl-2 text-sm">
          {flag ? isFlag(value) : value}
          {img && (
            <Dialog>
              <DialogTrigger asChild>
                <Image
                  src={img}
                  alt="Image preview"
                  width={60}
                  height={40}
                  className="cursor-pointer rounded hover:scale-105 transition border"
                />
              </DialogTrigger>
              <DialogContent className="max-w-[500px] bg-gray-100 border">
                <Image
                  src={img}
                  alt="Zoomed image"
                  width={300}
                  height={200}
                  className="w-full h-auto rounded object-contain"
                />
              </DialogContent>
            </Dialog>
          )}
        </p>
      </div>
    );
  };
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );
  }
  return (
    <>
      <section className="">
        <div className="text-3xl p-4 border-b-2 border-[#989898]">
          Course Provider List
        </div>
        <div className="p-6">
          <FilterDiv
            filtering={filtering}
            setFiltering={setFiltering}
            data={data}
            table={table}
            title="Add Seller"
            open={addModalOpen}
            onOpenChange={setAddModalOpen}
            buttonEnable={false}
          ></FilterDiv>

          <TableModel table={table} />
          <PaginationDiv table={table} />
        </div>
        <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">View Seller Details</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-y-scroll bg-white py-5">
            <DialogTitle>View Seller Details</DialogTitle>
            <div className="grid grid-cols-1 gap-1">
              {viewTableData({ title: "Name", value: viewData?.providor_name })}
              {viewTableData({ title: "Email", value: viewData?.email_id })}
              {viewTableData({ title: "Mobile No.", value: viewData?.mobile_no })}
              {viewTableData({ title: "address", value: viewData?.address_line })}
              {viewTableData({ title: "trade license", value: viewData?.trade_licence })}
              {viewTableData({ title: "VAT Registration ID ", value: viewData?.vat_reg_id })}
              {viewTableData({ title: "TIN No.", value: viewData?.tin_number })}
              {viewTableData({
                title: "Approve",
                value: viewData?.approve_flag,
                flag: true,
              })}
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          open={approveModalOpen}
          onOpenChange={() => setApproveModalOpen(false)}
        >
          <DialogContent className="sm:max-w-[425px] bg-white py-10">
            {courseFlag === "c" ? (
              <X className="w-8 h-8 text-[#c9332e] mx-auto" />
            ) : (
              <CircleCheck className="w-8 h-8 text-[#288d57] mx-auto" />
            )}
            <DialogTitle className="text-center">Are you sure?</DialogTitle>
            <DialogDescription className="text-center">
              Do you want to {courseFlag === "c" ? "Cancel" : "Approve"} these
              course records?
            </DialogDescription>

            <DialogFooter>
              <Button
                type="submit"
                className={`bg-${
                  courseFlag === "c" ? "[#c9332e]" : "[#288d57]"
                } text-white px-3 py-2`}
                onClick={() => handleApproveSubmit(courseFlag)}
              >
                {isPending ? "Loading.." : "Yes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <ToastContainer />
      </section>
    </>
  );
};

export default ProviderListTable;
