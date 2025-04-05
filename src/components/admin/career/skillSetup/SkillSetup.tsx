"use client";
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
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddSkill from "./AddSkill";
import { getAllSkill } from "@/api/api";
import EditSkill from "./EditSkill";

const SkillSetup = () => {
	// =========== DATA FETCHING =========
	const {
		isLoading,
		data: allSkills,
		refetch,
		error,
	} = useQuery({
		queryKey: ["getAllSkill"],
		queryFn: () => getAllSkill(),
	});

	// console.log(allSkills);

	const [editModalOpen, setEditModalOpen] = useState(false);
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [selectedSkill, setSelectedSkill] = useState<any | null>();

	// ============ HANDLER FUNCTIONS =========
	const handleEdit = (skill: any) => {
		setSelectedSkill(skill);
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
		},
		{
			header: "Skillset Name",
			accessorKey: "skillset_name",
		},
		{
			header: "Skill Name",
			accessorKey: "skill_name",
		},
		{
			header: "Skill Description",
			accessorKey: "skill_desc",
		},
		{
			header: "Edit",
			accessor: "edit",
			enableSorting: false,
			cell: (row: any) => (
				<button
					onClick={() => handleEdit(row.row.original)} // Pass the entire skill object
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
	const data = useMemo(() => allSkills ?? [], [allSkills]);

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
					Skill Setup
				</div>
				<div className="p-6">
					<h1 className="text-base text-[#1C1C1C] font-bold">Skill Setup</h1>

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
								title={"Add New Skill"}
								open={addModalOpen}
								onOpenChange={setAddModalOpen}
							>
								<AddSkill refetch={refetch} modalClose={handleCloseAdd} />
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
					<DialogTitle className="text-xl text-[#1C1C1C] font-bold">Edit Skill</DialogTitle>
					<EditSkill
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

export default SkillSetup;
