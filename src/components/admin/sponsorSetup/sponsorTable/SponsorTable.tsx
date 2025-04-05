/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { getAllSponsers, placeholderImage } from "@/api/api";
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ScaleLoader from "react-spinners/ScaleLoader";
import EditSponsor from "../sponsorForm/EditSponsor";
import AddSponsor from "../sponsorForm/AddSponsor";
import Image from "next/image";
import { LuEye } from "react-icons/lu";
import ViewSponsor from "../viewSponsor/ViewSponsor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SponsorTable = () => {
	// ============ DATA FETCHING ============
	const {
		isLoading,
		error,
		data: allSponsers,
		refetch,
	} = useQuery({
		queryKey: ["allSponsers"],
		queryFn: () => getAllSponsers(),
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
		setViewData(rowData); // Set the data to edit
		setViewModalOpen(true); // Open the Edit Dialog
	};

	// Close the Add modal
	const handleCloseAdd = () => {
		setAddModalOpen(false);
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
			accessorKey: "sponsor_name",
		},
		{
			header: "Address",
			accessorKey: "address_line",
		},
		{
			header: "Description",
			accessorKey: "description",
		},
		{
			header: "Image",
			accessorKey: "sponsor_image",
			cell: (row: any) => (
				<Image
					src={`${row.getValue()}` || `${placeholderImage}`}
					alt="category image"
					width={200}
					height={200}
					className="w-24 h-24 object-cover rounded"
				/>
			),
		},
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
	const data = useMemo(() => allSponsers, [allSponsers]);

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
					Sponsor Setup
				</div>
				<div className="p-6">
					<FilterDiv
						filtering={filtering}
						setFiltering={setFiltering}
						data={data}
						table={table}
						title={"Add Sponsor"}
						open={addModalOpen}
						onOpenChange={setAddModalOpen}
					>
						<AddSponsor refetch={refetch} modalClose={handleCloseAdd} />
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
							<EditSponsor
								setEditModalOpen={setEditModalOpen}
								refetch={refetch}
								editData={editData}
							/>
						</DialogContent>
					</Dialog>

					<Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
						<DialogContent className="bg-white w-[80vw]">
							<ViewSponsor
								setViewModalOpen={setViewModalOpen}
								viewData={viewData}
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

export default SponsorTable;
