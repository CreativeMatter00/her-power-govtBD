/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { courseApprove, getAllProviders } from "@/api/api";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import ScaleLoader from "react-spinners/ScaleLoader";
import PaginationDiv from "../../table/PaginationDiv";
// import VenueAdd from "./venueForm/VenueAdd";
// import VenueEdit from "./venueForm/VenueEdit";
import { Button } from "@/components/ui/button";
import { rowValue } from "@/redux/Reducer/MainSlice";
import { Check, CircleCheck, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableModel from "../../table/TableModel";
// import VeiwVenue from "./viewVenue/VeiwVenue";
import { useCookies } from "next-client-cookies";
const ProviderListTable = () => {
  // ============ DATA FETCHING ============
  const {
    isLoading,
    isError,
    data: allProvidersData,
    refetch,
  } = useQuery({
    queryKey: ["getAllProviders"],
    queryFn: () => getAllProviders(),
  });
  const queryClient = useQueryClient();
const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ course_pid, data }: { course_pid: string | null; data: any }) =>
      courseApprove(course_pid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProviders"] });
    },
    
  });
  // console.log("all venue", allVenue)

  const dispatch = useDispatch();

  const [editData, setEditData] = useState<any | null>(null);
  const [viewData, setViewData] = useState<any | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [sellerFlag, setSellerFlag] = useState<string | null>("");
  const [courseId, setCourseId] = useState<string | null>("");
  const handleEdit = (rowData: any) => {
    // console.log("rowData", rowData);
    setEditData(rowData); // Set the data to edit
    setEditModalOpen(true); // Open the Edit Dialog
  };
  const cookies = useCookies();
  const user_pid = cookies.get("user_pid");
  const handleView = (rowData: any) => {
    // console.log("rowData", rowData);
    dispatch(rowValue(rowData)); // Dispatching the action to update Redux store
    setViewData(rowData); // Set the data to edit
    setViewModalOpen(true); // Open the Edit Dialog
  };
  const handleApproveStatus = (courseInfo: any, flag: string) => {
    setSellerFlag(flag);
    setCourseId(courseInfo?.providor_pid)
    setViewModalOpen(true);
  };
  // Close the Add modal
  const handleCloseAdd = () => {
    setAddModalOpen(false);
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
    // {
    // 	header: "Capacity",
    // 	accessorKey: "capacity",
    // },
    // {
    // 	header: "Perday Rent",
    // 	accessorKey: "per_day_rent",
    // },
    // {
    // 	header: "Active Status",
    // 	accessorKey: "active_status",
    // 	cell: (row: any) => (
    // 		<>
    // 			{row.row.original.active_status ? (
    // 				<div className="text-base font-bold text-[#49A700] text-center">
    // 					Active
    // 				</div>
    // 			) : (
    // 				<div className="text-base font-bold text-[#F55050] text-center">
    // 					Inactive
    // 				</div>
    // 			)}
    // 		</>
    // 	),
    // },
    // {
    // 	header: "Edit",
    // 	accessor: "edit",
    // 	enableSorting: false,
    // 	cell: (row: any) => (
    // 		<div className="flex justify-center items-center gap-3">
    // 			<button
    // 				onClick={() => handleEdit(row.row.original)}
    // 				className="bg-[#F17B25] text-[#FEFCFF] font-medium text-sm p-2 rounded"
    // 			>
    // 				<MdOutlineEdit className="w-4 h-4 text-[#FEFCFF]" />
    // 			</button>
    // 			<button
    // 				onClick={() => handleView(row.row.original)}
    // 				className="bg-[#F17B25] text-[#FEFCFF] font-medium text-sm p-2 rounded"
    // 			>
    // 				<LuEye className="w-4 h-4 text-[#FEFCFF]" />
    // 			</button>
    // 		</div>
    // 	),
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
      header: "Approve Sellers",
      accessorKey: "approve_flag",
      enableSorting: false,
      cell: (row: any) => {
        console.log(row?.row?.original?.approve_flag)
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
              onClick={() => handleApproveStatus(row?.row?.original, 'c')}
              className={`bg-[#c9332e] text-[#FEFCFF] font-medium text-sm p-2 px-4 rounded flex items-center gap-1 ${
                disable ? "opacity-25" : "opacity-100"
              }`}
            >
              <X className="w-4 h-4 text-[#FEFCFF]" />
              Cancel
            </button>
            <button
              disabled={disable}
              onClick={() =>
                handleApproveStatus(row?.row?.original, 'y')
              }
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
  ];

  // ================= MEMOIZATION ================
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => allProvidersData, [allProvidersData]);
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
      const formData = new FormData()
      if(user_pid) formData.append('user_pid', user_pid)
      formData.append('approve_status', flag?.toUpperCase())
      mutateAsync({course_pid: courseId, data: formData }).then((res) => {
        if (res?.meta?.status === true) {
          toast.success(res?.meta?.message);
        }
        setViewModalOpen(false)
      })
    };

  // console.log(table.getHeaderGroups());
  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );
  //   console.log(data);
  return (
    <>
      <section className="">
        <div className="text-3xl p-4 border-b-2 border-[#989898]">
          Provider List
        </div>
        <div className="p-6">
          <FilterDiv
            filtering={filtering}
            setFiltering={setFiltering}
            data={data}
            table={table}
            title={"Add User"}
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
            <DialogContent className="sm:max-w-[425px] bg-white py-10">
              {sellerFlag === "c" ? (
                <X className="w-8 h-8 text-[#c9332e] mx-auto" />
              ) : (
                <CircleCheck className="w-8 h-8 text-[#288d57] mx-auto" />
              )}
              <DialogTitle className="text-center">Are you sure?</DialogTitle>
              <DialogDescription className="text-center">
                Do you want to {sellerFlag === "c" ? "Cancel" : "Approve"} these
                course records?
              </DialogDescription>

              <DialogFooter>
                <Button
                
                  type="submit"
                  className={`bg-${
                    sellerFlag === "c" ? "[#c9332e]" : "[#288d57]"
                  } text-white px-3 py-2`}
                  onClick={() => handleApproveSubmit(sellerFlag)}
                >
                  {isPending ? "Loading..":"Yes"}
                  
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
						<DialogContent className="bg-white w-[80vw]">
							<VenueEdit
								setEditModalOpen={setEditModalOpen}
								refetch={refetch}
								editData={editData}
							/>
						</DialogContent>
					</Dialog> */}

          {/* <Dialog open={viewModalOpen} onOpenChange={setEditModalOpen}>
						<DialogContent className="bg-white w-[80vw]">
							<VeiwVenue
								viewData={viewData}
								setViewModalOpen={setViewModalOpen}
								refetch={refetch}
							/>
						</DialogContent>
					</Dialog> */}
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default ProviderListTable;
