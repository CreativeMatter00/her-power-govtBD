"use client";

import { getSkillSet } from "@/api/api";
import FilterDiv from "@/components/admin/table/FilterDiv";
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
import TableModel from "@/components/admin/table/TableModel";
import PaginationDiv from "@/components/admin/table/PaginationDiv";
import ScaleLoader from "react-spinners/ScaleLoader";
import AddSkillset from "./AddSkillset";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditSkillSet from "./EditSkillSet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SkillsetSetup = () => {
  // =========== DATA FETCHING =========
  const {
    isLoading,
    data: skillset,
    refetch,
    error,
  } = useQuery({
    queryKey: ["getSkillSet"],
    queryFn: () => getSkillSet(),
  });

  // console.log(skillset);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any | null>();

  // New state for category ID

  // ============ HANDLER FUNCTIONS =========
  const handleEdit = (skill: any) => {
    setSelectedSkill(skill); // Pass full category object
    setEditModalOpen(true);
  };

  // Close the Edit modal
  const handleCloseEdit = () => {
    setEditModalOpen(false);
  };
  // Close the Add modal
  const handleCloseAdd = () => {
    setAddModalOpen(false);
  };

  // ============ DEFINING COLUMNS =========
  const COLUMNS = [
    {
      header: "ID",
      accessorKey: "skill_pid",
      // enableColumnFilter: false,
      // enableSorting: false,
      // cell: (row: any) => row.row.index + 1,
    },
    {
      header: "Skill Name",
      accessorKey: "skill_name",
    },
    {
      header: "Skill Description",
      accessorKey: "skill_desc",
    },
    // {
    // 	header: "Status",
    // 	accessorKey: "status",
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
    {
      header: "Edit",
      accessor: "edit",
      enableSorting: false,
      cell: (row: any) => (
        <button
          onClick={() => handleEdit(row.row.original)} // Pass the entire category object
          className="bg-[#F17B25] text-[#FEFCFF] font-medium text-sm px-6 py-3 rounded-sm "
        >
          <div className="flex items-center gap-2">
            <MdOutlineEdit className="w-4 h-4 text-[#FEFCFF]" />
            Edit
          </div>
        </button>
      ),
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => skillset ?? [], [skillset]);

  // console.log(data);

  // ================= TABLE FUNCTIONALITY ============
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});

  // ================= TABLE INSTANCE PROPERTIES ============
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

  return (
    <>
      <section>
        <div className="text-3xl p-4 border-b-2 border-[#989898]">
          Skill Set Setup
        </div>
        <div className="p-6">
          <h1 className="text-base text-[#1C1C1C] font-bold">
            Skill Set Setup
          </h1>

          {error ? (
            <div className="text-center">
              Something went wrong, please reload
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center">
              <ScaleLoader color="#421957" height={70} radius={8} width={10} />
            </div>
          ) : (
            <>
              <FilterDiv
                filtering={filtering}
                setFiltering={setFiltering}
                data={data}
                table={table}
                title={"Add New Skillset"}
                open={addModalOpen}
                onOpenChange={setAddModalOpen}
              >
                <AddSkillset refetch={refetch} modalClose={handleCloseAdd} />
              </FilterDiv>
              <TableModel table={table} />
              <PaginationDiv table={table} />
            </>
          )}
        </div>
      </section>

      {/* Dialog for editing */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="bg-white w-[80vw]">
          <DialogTitle className="text-xl text-[#1C1C1C] font-bold">
            Edit Skillset
          </DialogTitle>
          <EditSkillSet
            skill={selectedSkill}
            refetch={refetch}
            modalClose={handleCloseEdit}
          />
        </DialogContent>
      </Dialog>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default SkillsetSetup;
