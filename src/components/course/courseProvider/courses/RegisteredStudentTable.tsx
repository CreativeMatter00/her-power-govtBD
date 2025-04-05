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
import TableModel from "@/components/admin/table/TableModel";
import { Dialog, DialogContent, DialogTrigger } from "../../../../components/ui/dialog";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTranslations } from "next-intl";

const RegisteredStudentTable = ({ id }: any) => {
  const t = useTranslations("course");
  // =========== DATA FETCHING =========
  const {
    isLoading,
    isError,
    data: registeredStudents,
    refetch,
    error,
  } = useQuery({
    queryKey: [`registeredStudents${id}`],
    queryFn: () => fetchData(`admin/course-by-student/${id}`),
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>();

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
      header: t("ID"),
      accessorKey: "id",
      enableColumnFilter: false,
      enableSorting: false,
      cell: (row: any) => row.row.index + 1,
    },
    {
      header: t("Student ID"),
      accessorKey: "student_pid",
    },
    {
      header: t("Student Name"),
      accessorKey: "full_name",
    },
    {
        header: t("Email"),
        accessorKey: "email",
      }, 
    {
        header: t("Mobile Number"),
        accessorKey: "mobile_no",
      }, 
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => registeredStudents?.students_enroll ?? [], [registeredStudents]);

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
      <section className=" overflow-x-auto">
        <div className="text-3xl p-4 border-b-2 border-[#989898]">
          {t("Registered Student")}
        </div>
        <div className="p-6">
          <h1 className="text-base text-[#1C1C1C] font-bold">
            {t("Registered Student Details")}
          </h1>

          {isError ? (
            <div className="text-red-600">
              <p>{t("There was an error fetching the categories")}</p>
              <p>{error instanceof Error ? error.message : "Unknown error"}</p>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center">
              <ScaleLoader color="#421957" height={70} radius={8} width={10} />
            </div>
          ) : !registeredStudents || registeredStudents?.students_enroll?.length === 0 ? (
            <div className="text-center text-gray-500">
              {t("No registered students found.")}
            </div>
          ) : (
            <>
              <FilterDiv
                filtering={filtering}
                setFiltering={setFiltering}
                data={data}
                table={table}
                buttonEnable={false}
                title={t("Add New Category")}
                open={addModalOpen}
                onOpenChange={setAddModalOpen}
              >
                {/* <CategoryAdd refetch={refetch} modalClose={handleCloseAdd} /> */}
              </FilterDiv>
              <TableModel table={table} />
              {/* <PaginationDiv table={table} /> */}
            </>
          )}
        </div>
      </section>

      {/* Dialog for editing */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogTrigger asChild>
          {/* Hidden trigger, Dialog manages its own open/close state */}
        </DialogTrigger>
        <DialogContent className="bg-white min-w-[80vw]">
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

export default RegisteredStudentTable;