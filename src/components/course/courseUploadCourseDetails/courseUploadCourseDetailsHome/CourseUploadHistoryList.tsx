"use client"
import { getCourseLessons } from "@/api/api";
import FilterDiv from "@/components/admin/table/FilterDiv"
import PaginationDiv from "@/components/admin/table/PaginationDiv";
import TableModel from "@/components/admin/table/TableModel";
import { statusColors, statusLabels } from "@/utils/status";
import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";

import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
  } from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { useParams } from "next/navigation";

const CourseUploadHistoryList = () => {
  const {id} = useParams()
  const { isLoading, error, data } = useQuery({
    queryKey: ["CourseLessons"],
    queryFn: () => getCourseLessons(Array.isArray(id) ? id[0] : id),
    enabled: !!id,
  });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filtering, setFiltering] = useState("");
    const [columnVisibility, setColumnVisibility] = useState({});
    const COLUMNS: ColumnDef<any, any>[] = [
        {
          header: "Sl",
          accessorKey: "id",
          cell: (row: any) => row.row.index + 1,
        },
        {
          header: "Title",
          accessorKey: "session_title",
        },
        {
          header: "Description",
          accessorKey: "session_description",
          cell: (row) => {
            return <p dangerouslySetInnerHTML={{ __html: row?.row?.original?.session_description || "" }}></p>
          }
        },
        {
          header: "Status",
          accessorKey: "video_code",
          
        },
        {
          header: "Video",
          accessorKey: "video_url",
          cell: (row) => {
            const videoUrl = row.row.original.video_url;
            return (
              <div style={{ width: 120, height: 80 }}>
                <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
              </div>
            );
          },
        },
      ]
    const columns = useMemo(() => COLUMNS, []);
    const table = useReactTable({
        data: data || [],
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
    return <div>
        <div className="w-full">
            {/* ====================== FILTERING METHOD ====================== */}
            <FilterDiv
              filtering={filtering}
              setFiltering={setFiltering}
              data={[]}
              table={table}
              buttonEnable={false}
            ></FilterDiv>
            {/* =========================== TABLE MODEL ======================== */}
            <TableModel table={table} enableFiltering={false} />
            {/* =========================== PAGINAITON ====================== */}
            <PaginationDiv table={table} />
          </div>
    </div>
}

export default CourseUploadHistoryList