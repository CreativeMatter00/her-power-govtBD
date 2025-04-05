"use client";

import {
	getAllEventCategories,
	placeholderImage,
} from "@/api/api";
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
import Image from "next/image";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CategoryEdit from "./categoryEdit/CategoryEdit";
import CategoryAdd from "./categoryAdd/CategoryAdd";

const CategoryTable = () => {
	// =========== DATA FETCHING =========
	const {
		isLoading,
		data: categories,
		refetch,
		error,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: () => getAllEventCategories(),
	});

	const [editModalOpen, setEditModalOpen] = useState(false);
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<any | null>();

	// console.log(categories);

	// ============ HANDLER FUNCTIONS =========
	const handleEdit = (category: any) => {
		setSelectedCategory(category); // Pass full category object
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
			accessorKey: "id",
			enableColumnFilter: false,
			enableSorting: false,
			cell: (row: any) => row.row.index + 1,
		},
		{
			header: "Category ID",
			accessorKey: "category_pid",
		},
		{
			header: "Category Name",
			accessorKey: "category_name",
		},
		{
			header: "Image",
			accessorKey: "category_file_url",
			cell: (row: any) => {
				const value = row.getValue();
				return value !== null ? (
					<Image
						src={value}
						alt="category image"
						width={200}
						height={200}
						className="w-24 h-24 object-cover rounded"
					/>
				) : (
					<Image
						src={placeholderImage}
						alt="category image"
						width={200}
						height={200}
						className="w-24 h-24 object-cover rounded"
					/>
				);
			},
		},
		{
			header: "Status",
			accessorKey: "status",
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
	const data = useMemo(() => categories ?? [], [categories]);

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

	if (error)
		return (
			<div className="text-center text-xl font-md py-8">
				Something went wrong. Please reload
			</div>
		);

	return (
		<>
			<section>
				<div className="text-3xl p-4 border-b-2 border-[#989898]">
					Event Category Setup
				</div>
				<div className="p-6">
					<h1 className="text-base text-[#1C1C1C] font-bold">
						Event Category Details
					</h1>

					{isLoading ? (
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
								title={"Add New Category"}
								open={addModalOpen}
								onOpenChange={setAddModalOpen}
							>
								<CategoryAdd refetch={refetch} modalClose={handleCloseAdd} />
							</FilterDiv>
							<TableModel table={table} />
							<PaginationDiv table={table} />
						</>
					)}
				</div>
			</section>

			<Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
				<DialogTrigger asChild></DialogTrigger>
				<DialogContent className="bg-white w-[80vw]">
					<CategoryEdit
						refetch={refetch}
						category={selectedCategory}
						modalClose={handleCloseEdit}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default CategoryTable;
