"use client";

import { fetchData, placeholderImage } from "@/api/api";
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
// import CategoryAdd from "../categoryForm/CategoryAdd/CategoryAdd";
import TableModel from "@/components/admin/table/TableModel";
import PaginationDiv from "@/components/admin/table/PaginationDiv";
import { Dialog, DialogContent, DialogTrigger } from "../../../../ui/dialog";
// import CategoryEdit from "../categoryForm/CategoryEdit/CategoryEdit";
import Image from "next/image";
import ScaleLoader from "react-spinners/ScaleLoader";

const SellerTable = () => {
  // =========== DATA FETCHING =========
  const {
    isLoading,
    isError,
    data: categories,
    refetch,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchData("admin/category"),
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>();

  // New state for category ID

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
      accessorKey: "file_url",
      cell: (row: any) => (
        <Image
          src={row.getValue() || `${placeholderImage}`}
          alt="category image"
          width={200}
          height={200}
          className="w-24 h-24 object-cover rounded"
        />
      ),
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
          Seller Approval
        </div>
        <div className="p-6">
          <h1 className="text-base text-[#1C1C1C] font-bold">Seller Details</h1>

          {isError ? (
            <div className="text-red-600">
              <p>There was an error fetching the categories.</p>
              <p>{error instanceof Error ? error.message : "Unknown error"}</p>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center">
              <ScaleLoader color="#421957" height={70} radius={8} width={10} />
            </div>
          ) : (
            <>
              {/* <FilterDiv
								filtering={filtering}
								setFiltering={setFiltering}
								data={data}
								table={table}
								title={"Add New Category"}
								open={addModalOpen}
								onOpenChange={setAddModalOpen}
							>
								<CategoryAdd refetch={refetch} modalClose={handleCloseAdd} />
							</FilterDiv> */}
              <div className="mt-6">
                <TableModel table={table} />
                <PaginationDiv table={table} />
              </div>
            </>
          )}
        </div>
      </section>

      {/* Dialog for editing */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogTrigger asChild>
          {/* Hidden trigger, Dialog manages its own open/close state */}
        </DialogTrigger>
        <DialogContent className="bg-white w-[80vw]">
          {/* Pass the selectedCategoryId to CategoryEdit */}
          {/* <CategoryEdit
						refetch={refetch}
						category={selectedCategory} // Pass full selected category object
						modalClose={handleCloseEdit}
					/> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SellerTable;
