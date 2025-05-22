"use client"
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CellContext,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Check, CircleCheck, Eye as View, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// UI Components
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { approveBlogProvider, getBlogs } from "@/api/api";
import { Button } from "@/components/ui/button";
import { useCookies } from "next-client-cookies";
import FilterDiv from "../../table/FilterDiv";
import PaginationDiv from "../../table/PaginationDiv";
import TableModel from "../../table/TableModel";

const BlogListTable = () => {
  const queryClient = useQueryClient();
  const cookies = useCookies();
  const user_pid = cookies.get("user_pid");

  const [blogFlag, setBlogFlag] = useState<string | null>("");
  const [blogId, setBlogId] = useState<string | null>("");
  const [viewData, setViewData] = useState<any | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const { isLoading, data: allBlogs } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: getBlogs,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ blog_pid, data }: { blog_pid: string | null; data: any }) =>
      approveBlogProvider(blog_pid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
    },
  });

  const handleView = (rowData: any) => {
    setViewData(rowData);
    setViewModalOpen(true);
  };

  const handleApproveStatus = (blogInfo: any, flag: string) => {
    setBlogFlag(flag);
    setBlogId(blogInfo?.bpost_pid);
    setApproveModalOpen(true);
  };

  const handleApproveSubmit = async (flag: string | null) => {
    if (!flag) return;
    const formData = new FormData();
    if (user_pid) formData.append("user_pid", user_pid);
    formData.append("approve_status", flag?.toUpperCase());

    const res = await mutateAsync({ blog_pid: blogId, data: formData });
    if (res?.meta?.status === true) {
      toast.success(res?.meta?.message);
      setApproveModalOpen(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (info: CellContext<any, any>) => info.row.index + 1,
      },
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Description",
        accessorKey: "description",
        cell: (row: any) => (
          <p
            className="line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: row?.row?.original?.description,
            }}
          />
        ),
      },
      {
        header: "Approve Status",
        accessorKey: "approve_flag",
        cell: (row: any) => {
          const f = row?.row?.original?.approve_flag?.toLowerCase();
          if (f === "y") return "Approved";
          if (f === "c") return "Rejected";
          if (f === "n") return "Pending";
        },
      },
      {
        header: "Approve Blogs",
        accessorKey: "approve_flag",
        enableSorting: false,
        cell: (row: any) => {
          const f = row?.row?.original?.approve_flag?.toLowerCase();
          const disable = f === "y" || f === "c";
          return (
            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => handleApproveStatus(row?.row?.original, "c")}
                disabled={disable}
                className={`bg-[#c9332e] text-white text-sm p-2 px-4 rounded flex items-center gap-1 ${
                  disable ? "opacity-25" : "opacity-100"
                }`}
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                onClick={() => handleApproveStatus(row?.row?.original, "y")}
                disabled={disable}
                className={`bg-[#288d57] text-white text-sm p-2 px-4 rounded flex items-center gap-1 ${
                  disable ? "opacity-25" : "opacity-100"
                }`}
              >
                <Check className="w-4 h-4" /> Approve
              </button>
            </div>
          );
        },
      },
      {
        header: "View Details",
        cell: (row: any) => (
          <button
            onClick={() => handleView(row?.row?.original)}
            className="bg-green-100 text-green-700 flex items-center px-3 py-2 rounded-md"
          >
            <View className="mr-1" /> View
          </button>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => allBlogs || [], [allBlogs]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});

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
    const formatFlag = (f: string | null | undefined) => {
      if (!f) return;
      f = f.toLowerCase();
      if (f === "y") return "Approved";
      if (f === "c") return "Rejected";
      if (f === "n") return "Pending";
    };

    return (
      <div className="border p-2 grid grid-cols-2 rounded-md">
        <h2 className="text-base font-medium">{title}</h2>
        <p className="border-l pl-2 text-sm">
          {flag ? formatFlag(value) : value || "-"}
          {img && (
            <Dialog>
              <DialogTrigger asChild>
                <Image
                  src={img}
                  alt="Preview"
                  width={60}
                  height={40}
                  className="cursor-pointer rounded hover:scale-105 transition border"
                />
              </DialogTrigger>
              <DialogContent className="max-w-[500px] bg-gray-100 border">
                <Image
                  src={img}
                  alt="Zoomed"
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
      <ToastContainer />
      <section>
        <div className="text-3xl p-4 border-b-2 border-[#989898]">Blog List</div>
        <div className="p-6">
          <FilterDiv
            filtering={filtering}
            setFiltering={setFiltering}
            data={data}
            table={table}
            title="Add Blog"
            open={addModalOpen}
            onOpenChange={setAddModalOpen}
            buttonEnable={false}
          />

          <TableModel table={table} />
          <PaginationDiv table={table} />

          {/* View Modal */}
          <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
            <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-y-auto bg-white py-5">
              <DialogTitle>View Blog Details</DialogTitle>
              <div className="grid grid-cols-1 gap-2">
                {viewTableData({ title: "Title", value: viewData?.title })}
                {viewTableData({ title: "Description", value: viewData?.description })}
                {viewTableData({ title: "Banner", img: viewData?.banner_file_url })}
                {viewTableData({ title: "Thumbnail", img: viewData?.thumbnail_file_url })}
                {viewTableData({
                  title: "Approve Status",
                  value: viewData?.approve_flag,
                  flag: true,
                })}
              </div>
            </DialogContent>
          </Dialog>

          {/* Approve Modal */}
          <Dialog open={approveModalOpen} onOpenChange={setApproveModalOpen}>
             <DialogContent className="sm:max-w-[425px] bg-white py-10">
              {blogFlag === "c" ? (
                <X className="w-8 h-8 text-[#c9332e] mx-auto" />
              ) : (
                <CircleCheck className="w-8 h-8 text-[#288d57] mx-auto" />
              )}
              <DialogTitle className="text-center">Are you sure?</DialogTitle>
              <DialogDescription className="text-center">
                Do you want to {blogFlag === "c" ? "Cancel" : "Approve"} these
                Blog records?
              </DialogDescription>

              <DialogFooter>
                <Button
                  type="submit"
                  className={`bg-${
                    blogFlag === "c" ? "[#c9332e]" : "[#288d57]"
                  } text-white px-3 py-2`}
                  onClick={() => handleApproveSubmit(blogFlag)}
                >
                  {isPending ? "Loading.." : "Yes"}
                </Button>
              </DialogFooter>
            </DialogContent>

          </Dialog>
        </div>
      </section>
    </>
  );
};

export default BlogListTable;
