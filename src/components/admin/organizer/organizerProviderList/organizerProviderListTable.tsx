/* eslint-disable react-hooks/exhaustive-deps */
"use client";

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
import { useMemo, useState } from "react";
import FilterDiv from "../../table/FilterDiv";
// import TableModel from "../../table/TableModel";
import ScaleLoader from "react-spinners/ScaleLoader";
import PaginationDiv from "../../table/PaginationDiv";
// import VenueAdd from "./venueForm/VenueAdd";
// import VenueEdit from "./venueForm/VenueEdit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { approveOrganizerProvider, getOrganizerProviders } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, CircleCheck, View, X } from "lucide-react";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import TableModel from "../../table/TableModel";
// import VeiwVenue from "./viewVenue/VeiwVenue";

const OrganizerProviderListTable = () => {
  // ============ DATA FETCHING ============
  const queryClient = useQueryClient();
  const { isLoading, data: allOrganizerProviders } = useQuery({
    queryKey: ["allOrganizerProviders"],
    queryFn: () => getOrganizerProviders(),
  });
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: ({
      organizerProvider_pid,
      data,
    }: {
      organizerProvider_pid: string | null;
      data: any;
    }) => approveOrganizerProvider(organizerProvider_pid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allOrganizerProviders"] });
    },
  });
  console.log("allOrganizerProviders", allOrganizerProviders);

  const [organizerProviderFlag, setOrganizerProviderFlag] = useState<
    string | null
  >("");
  const [organizerProviderId, setOrganizerProviderId] = useState<string | null>(
    ""
  );
  const [viewData, setViewData] = useState<any | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const cookies = useCookies();
  const user_pid = cookies.get("user_pid");
  // const handleEdit = (rowData: any) => {
  //   // console.log("rowData", rowData);
  //   setEditData(rowData); // Set the data to edit
  //   setEditModalOpen(true); // Open the Edit Dialog
  // };

  const handleView = (rowData: any) => {
    setViewData(rowData);
    setViewModalOpen(true);
  };

  const handleApproveStatus = (organizerProviderInfo: any, flag: string) => {
    setOrganizerProviderFlag(flag);
    setOrganizerProviderId(organizerProviderInfo?.org_pid);
    setApproveModalOpen(true);
  };

  // Close the Add modal
  // const handleCloseAdd = () => {
  //   setAddModalOpen(false);
  // };
  // ================ DEFINING COLUMN ===============
  // {
  //           "org_pid": "ORG240800000001",
  //           "org_name": "ati",
  //           "org_address": "Uttara",
  //           "designation": "admin",
  //           "org_type": "1",
  //           "org_website": "www"
  //       },
  const COLUMNS = [
    {
      header: "ID",
      accessorKey: "",
      enableColumnFilter: false,
      enableSorting: false,
      cell: (info: CellContext<any, any>) => info.row.index + 1,
    },
    {
      header: "Organizer Name",
      accessorKey: "org_name",
    },
    {
      header: "Designation",
      accessorKey: "designation",
    },
    // {
    //   header: "Address",
    //   accessorKey: "address_line",
    // },
    {
      header: "Approve Status",
      accessorKey: "approve_flag",
      cell: (row: any) => {
        const flag = () => {
          // f -> constant flag
          const f = row?.row?.original?.approve_flag?.toLowerCase();
          if (f === "y") return "Approved";
          if (f === "c") return "Rejected";
          if (f === "n") return "Pending";
        };
        return <div>{flag()}</div>;
      },
    },
    {
      header: "Approve Organizer Providers",
      accessorKey: "approve_flag",
      enableSorting: false,
      cell: (row: any) => {
        // f -> constant flag
        const f = row?.row?.original?.approve_flag?.toLowerCase();
        const isDisable = () => {
          if (f === "y") return true;
          if (f === "c") return true;
          if (f === "n") return false;
        };
        const disable = isDisable();
        return (
          <div className="flex justify-center items-center gap-3">
            <button
              disabled={disable}
              onClick={() => handleApproveStatus(row?.row?.original, "c")}
              className={`bg-[#c9332e] text-[#FEFCFF] font-medium text-sm p-2 px-4 rounded flex items-center gap-1 ${
                disable ? "opacity-25" : "opacity-100"
              }`}
            >
              <X className="w-4 h-4 text-[#FEFCFF]" />
              Cancel
            </button>
            <button
              disabled={disable}
              onClick={() => handleApproveStatus(row?.row?.original, "y")}
              className={`bg-[#288d57] text-[#FEFCFF] font-medium text-sm p-2 px-4 rounded flex items-center gap-1 ${
                disable ? "opacity-25" : "opacity-100"
              }`}
            >
              <Check className="w-4 h-4 text-[#FEFCFF]" />
              Approve
            </button>
          </div>
        );
      },
    },
    {
      header: "View Details",
      cell: (row: any) => {
        return (
          <div className="">
            <button
              onClick={() => handleView(row?.row?.original)}
              className="bg-green-100 text-green-700 flex items-center px-3 py-2 rounded-md"
            >
              <View /> View{" "}
            </button>
          </div>
        );
      },
    },
  ];

  // ================= MEMOIZATION ================
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => allOrganizerProviders, [allOrganizerProviders]);
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
      sorting: sorting,
      globalFilter: filtering,
      columnVisibility: columnVisibility,
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
    mutateAsync({ organizerProvider_pid: organizerProviderId, data: formData })
      .then((res) => {
        if (res?.meta?.status === true) {
          toast.success(res?.meta?.message);
        }
        setApproveModalOpen(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  const viewTableData = ({
        title,
        value,
        flag,
        img
      }: {
        title: string;
        value?: string | null | undefined;
        flag?: boolean;
        img?: string
      }) => {
        const isFlag = (flag: string | null | undefined) => {
          if (!flag) return;
          // f -> constant flag
          const f = flag.toLowerCase();
          if (f === "y") return "Approved";
          if (f === "c") return "Rejected";
          if (f === "n") return "Pending";
        };
    
        return (
          <div className="border p-2 grid grid-cols-2 rounded-md">
            <h2 className="text-base capitalize font-medium">{title}</h2>
            {<p className="border-l pl-2 text-sm">
              {" "}
              {flag ? isFlag(value) : value || "-"}
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
              <DialogContent className="max-w-[500px] bg-gray-100  border">
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
            </p>}
          </div>
        );
      };
  
  return (
    <>
      <ToastContainer />
      <section className="">
        <div className="text-3xl p-4 border-b-2 border-[#989898]">
          Organizer Provider List
        </div>
        <div className="p-6">
          <FilterDiv
            filtering={filtering}
            setFiltering={setFiltering}
            data={data}
            table={table}
            title={"Add OrganizerProvider"}
            open={addModalOpen}
            onOpenChange={setAddModalOpen}
            buttonEnable={false}
          >
            {/* <VenueAdd refetch={refetch} modalClose={handleCloseAdd} /> */}
          </FilterDiv>

          {isLoading ? (
            <ScaleLoader color="#421957" height={70} radius={8} width={10} />
          ) : (
            <TableModel table={table} />
          )}

          {!isLoading && <PaginationDiv table={table} />}
          <Dialog
            open={viewModalOpen}
            onOpenChange={() => setViewModalOpen(false)}
          >
            <DialogTrigger asChild>
              <Button variant="outline">View Organizer Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] bg-white py-5">
              <DialogTitle className="">View Organizer Details</DialogTitle>
              <div className="grid grid-cols-1 gap-1">
                
                {viewTableData({ title: "Organizer Name", value: viewData?.org_name })}
                {viewTableData({ title: "Email", value: viewData?.email })}
                {viewTableData({
                  title: "Mobile no",
                  value: viewData?.phone_no,
                })}
                {viewTableData({
                  title: "organizer address",
                  value: viewData?.org_address,
                })}
                {viewTableData({
                  title: "designation",
                  value: viewData?.designation,
                })} 
                               
              </div>
            </DialogContent>
          </Dialog>
          <Dialog
            open={approveModalOpen}
            onOpenChange={() => setApproveModalOpen(false)}
          >
            <DialogContent className="sm:max-w-[425px] bg-white py-10">
              {organizerProviderFlag === "c" ? (
                <X className="w-8 h-8 text-[#c9332e] mx-auto" />
              ) : (
                <CircleCheck className="w-8 h-8 text-[#288d57] mx-auto" />
              )}
              <DialogTitle className="text-center">Are you sure?</DialogTitle>
              <DialogDescription className="text-center">
                Do you want to{" "}
                {organizerProviderFlag === "c" ? "Cancel" : "Approve"} these
                Organizer provider records?
              </DialogDescription>

              <DialogFooter>
                <Button
                  type="submit"
                  className={`bg-${
                    organizerProviderFlag === "c" ? "[#c9332e]" : "[#288d57]"
                  } text-white px-3 py-2`}
                  onClick={() => handleApproveSubmit(organizerProviderFlag)}
                >
                  {isPending ? "Loading.." : "Yes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default OrganizerProviderListTable;
