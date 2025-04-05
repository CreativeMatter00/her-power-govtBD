"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
// import TableHeading from "@/components/ui/table/TableHeading";

import { FaEdit } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import { getNews } from "@/api/api";
import FilterDiv from "@/components/admin/table/FilterDiv";
import TableModel from "@/components/admin/table/TableModel";
import PaginationDiv from "@/components/admin/table/PaginationDiv";
import ScaleLoader from "react-spinners/ScaleLoader";

const EventsTable = () => {
  const [editData, setEditData] = useState({});
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // const tableRef = useRef(null);

  const handleEdit = (rowData: any) => {
    setEditModalOpen(true);
    // dispatch(handleEditOpen());
    // dispatch(rowValue(rowData));
    setEditData(rowData);
  };

  const COLUMNS = [
    {
      header: "ID",
      accessorKey: "id",
      enableColumnFilter: false,
      enableSorting: false,
    },

    {
      header: "userId",
      accessorKey: "userId",
    },

    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Serial No",
      accessorKey: "serialNo",
    },
    {
      header: "Active Status",
      accessorKey: "activeStatus",
      cell: (row: any) => (
        <>
          {row.row.original.activeStatus ? (
            <div className="">Active</div>
          ) : (
            <div className="">Inactive</div>
          )}
        </>
      ),
    },

    {
      header: "Edit",
      accessor: "edit",
      enableSorting: false,
      cell: (row: any) => (
        <button className="" onClick={() => handleEdit(row.row.original)}>
          {<FaEdit />}
        </button>
      ),
    },
  ];

  const {
    isLoading,
    isError,
    data: posts,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getNews(),
  });

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => posts, [posts]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    // allColumns,
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

  return (
    <div className="border bg-white p-4 mt-4 rounded-lg print:p-0">
      <div>this is table</div>
      {/* <TableHeading headName="All Events" buttonName="Event Add"></TableHeading> */}

      <FilterDiv
        filtering={filtering}
        setFiltering={setFiltering}
        table={table}
        data={data}
      />

      {!isLoading && <TableModel table={table} />}

      {!isLoading && <PaginationDiv table={table} />}

      {/* <PaginationDiv table={table} /> */}
    </div>
  );
};

export default EventsTable;
