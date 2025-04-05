/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getAllStudents, getAllUsers, getAllVenue } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import {
  CellContext,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import FilterDiv from "../../table/FilterDiv";
// import TableModel from "../../table/TableModel";
import PaginationDiv from "../../table/PaginationDiv";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ScaleLoader from "react-spinners/ScaleLoader";
// import VenueAdd from "./venueForm/VenueAdd";
// import VenueEdit from "./venueForm/VenueEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { rowValue } from "@/redux/Reducer/MainSlice";
import { LuEye } from "react-icons/lu";
import TableModel from "../../table/TableModel";
// import VeiwVenue from "./viewVenue/VeiwVenue";

const StudentListTable = () => {
  // ============ DATA FETCHING ============
  const {
    isLoading,
    isError,
    data: allStudents,
    refetch,
  } = useQuery({
    queryKey: ["allStudents"],
    queryFn: () => getAllStudents(),
  });

  // console.log("all venue", allVenue)

  const dispatch = useDispatch();

  const [editData, setEditData] = useState<any | null>(null);
  const [viewData, setViewData] = useState<any | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleEdit = (rowData: any) => {
    // console.log("rowData", rowData);
    setEditData(rowData); // Set the data to edit
    setEditModalOpen(true); // Open the Edit Dialog
  };

  const handleView = (rowData: any) => {
    // console.log("rowData", rowData);
    dispatch(rowValue(rowData)); // Dispatching the action to update Redux store
    setViewData(rowData); // Set the data to edit
    setViewModalOpen(true); // Open the Edit Dialog
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
      accessorKey: "full_name",
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
  ];

  // ================= MEMOIZATION ================
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => allStudents, [allStudents]);

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
          Student List
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

export default StudentListTable;
