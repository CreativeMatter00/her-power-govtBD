/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { getAllSpeakers } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import {
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
import TableModel from "../../table/TableModel";
import PaginationDiv from "../../table/PaginationDiv";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ScaleLoader from "react-spinners/ScaleLoader";
import SpeakersAdd from "./speakerForm/SpeakersAdd";
import SpeakersEdit from "./speakerForm/SpeakersEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuEye } from "react-icons/lu";
import ViewSpeaker from "./viewSpeaker/ViewSpeaker";

const SpeakersTable = () => {
  // ============ DATA FETCHING ============

  const {
    isLoading,
    error,
    data: allSpeakers,
    refetch,
  } = useQuery({
    queryKey: ["allSpeakers"],
    queryFn: () => getAllSpeakers(),
  });

  const [editData, setEditData] = useState<any | null>(null);
  const [viewData, setViewData] = useState<any | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleEdit = (rowData: any) => {
    setEditData(rowData); // Set the data to edit
    setEditModalOpen(true); // Open the Edit Dialog
  };

  const handleView = (rowData: any) => {
    // console.log("rowData", rowData);
    setViewData(rowData); // Set the data to edit
    setViewModalOpen(true); // Open the Edit Dialog
  };
  // Close the Add modal
  const handleCloseAdd = () => {
    setAddModalOpen(false);
  };

  // Close the view modal
  const handleCloseView = () => {
    setViewModalOpen(false);
  };

  // ================ DEFINING COLUMN ===============

  const COLUMNS = [
    // {
    //   header: "ID",
    //   accessorKey: "id",
    //   enableColumnFilter: false,
    //   enableSorting: false,
    // },
    {
      header: "Name",
      accessorKey: "speaker_name",
    },
    {
      header: "Email",
      accessorKey: "speaker_email",
    },
    {
      header: "Phone No",
      accessorKey: "phone_no",
    },
    {
      header: "Organization Address",
      accessorKey: "org_address",
    },
    {
      header: "Designation",
      accessorKey: "designation",
    },
    // {
    // 	header: "Description",
    // 	accessorKey: "description",
    // },
    {
      header: "Active Status",
      accessorKey: "active_status",
      cell: (row: any) => (
        <>
          {row.row.original.active_status ? (
            <div className="text-base font-bold text-[#49A700] text-center">
              Active
            </div>
          ) : (
            <div className="text-base font-bold text-[#F55050] text-center">
              Inactive
            </div>
          )}
        </>
      ),
    },
    {
      header: "Edit",
      accessor: "edit",
      enableSorting: false,
      cell: (row: any) => (
        <div className="flex justify-between items-center gap-3">
          <button
            onClick={() => handleEdit(row.row.original)}
            className="bg-[#F17B25] text-[#FEFCFF] font-medium text-sm p-2 rounded"
          >
            <MdOutlineEdit className="w-4 h-4 text-[#FEFCFF]" />
          </button>
          <button
            onClick={() => handleView(row.row.original)}
            className="bg-[#F17B25] text-[#FEFCFF] font-medium text-sm p-2 rounded"
          >
            <LuEye className="w-4 h-4 text-[#FEFCFF]" />
          </button>
        </div>
      ),
    },
  ];

  // ================= MEMOIZATION ================

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => allSpeakers, [allSpeakers]);

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

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        Something went wrong. Please reload
      </div>
    );

  return (
    <>
      <section className="">
        <div className="text-3xl p-4 border-b-2 border-[#989898]">
          Speakers Setup
        </div>
        <div className="p-6">
          <FilterDiv
            filtering={filtering}
            setFiltering={setFiltering}
            data={data}
            table={table}
            title={"Add Speakers"}
            open={addModalOpen}
            onOpenChange={setAddModalOpen}
          >
            <SpeakersAdd refetch={refetch} modalClose={handleCloseAdd} />
          </FilterDiv>

          {isLoading ? (
            <ScaleLoader color="#421957" height={70} radius={8} width={10} />
          ) : (
            // <p>ok</p>
            <TableModel table={table} />
          )}

          {!isLoading && <PaginationDiv table={table} />}

          <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
            <DialogContent className="bg-white w-[80vw]">
              <SpeakersEdit
                editData={editData}
                setEditModalOpen={setEditModalOpen}
                refetch={refetch}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={viewModalOpen} onOpenChange={setEditModalOpen}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="bg-white w-[80vw]">
              <ViewSpeaker
                viewData={viewData}
                setViewModalOpen={setViewModalOpen}
                refetch={refetch}
              />
            </DialogContent>
          </Dialog>
        </div>

        <ToastContainer />
      </section>
    </>
  );
};

export default SpeakersTable;
