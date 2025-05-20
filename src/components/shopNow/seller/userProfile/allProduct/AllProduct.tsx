"use client";

import { api, getSellerAllProducts, placeholderImage } from "@/api/api";
import FilterDiv from "@/components/admin/table/FilterDiv";
import PaginationDiv from "@/components/admin/table/PaginationDiv";
import TableModel from "@/components/admin/table/TableModel";
import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import ScaleLoader from "react-spinners/ScaleLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllProduct = () => {
  const t = useTranslations("talentHunt");

  const router = useRouter();
  // ? Get Seller Id

  const getUserInfo = JSON.parse(
    localStorage.getItem("loginDetails") as string
  );
  const sellerId = getUserInfo.enterpenure_pid;

  // =========== DATA FETCHING =========
  const {
    isLoading,
    isError,
    data: categories,
    refetch,
    error,
  } = useQuery({
    queryKey: ["getSellerAllProducts", sellerId],
    queryFn: ({ queryKey }) => getSellerAllProducts(queryKey[1]),
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>();

  // New state for category ID

  // ============ HANDLER FUNCTIONS =========
  const handleEdit = (category: any) => {
    // console.log(category);
    setSelectedCategory(category); // Pass full category object
    setEditModalOpen(true);
    router.push(`./all-product/${category?.product_pid}`);
  };

  // Close the Edit modal
  const handleCloseEdit = () => {
    setEditModalOpen(false);
  };
  // Close the Add modal
  const handleCloseAdd = () => {
    setAddModalOpen(false);
  };
  const handleDelete=async (category: any)=>{
    try {
      const response = await api.delete(
        `/api/admin/product/${category?.product_pid}`
      );
        toast.success("Product Deleted Successfully!", {
          position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        refetch();
    } catch (error: any) {
      toast.error("Product Delete failed! Please try again.", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("error", error.response ? error.response.data : error);
    }
  }
  // ============ DEFINING COLUMNS =========
  const COLUMNS = [
    {
      header: t("SL_no"),
      accessorKey: "id",
      enableColumnFilter: false,
      enableSorting: false,
      cell: (row: any) => row.row.index + 1,
    },
    {
      header: t("Brand_Name"),
      accessorKey: "brand_name",
    },
    {
      header: t("Product_Name"),
      accessorKey: "product_name",
    },
    {
      header: t("Stock"),
      accessorKey: "stock_available",
      filterFn: (row:any, columnId:any, filterValue:any) => {
        const stockAvailable = row.getValue(columnId);
        return stockAvailable?.toString().toLowerCase().includes(filterValue.toLowerCase());
      },
    },
    {
      header: t("Image"),
      accessorKey: "attachments",
      enableColumnFilter: false,
      enableSorting: false,
      cell: (row: any) => {
        const attachments = row.getValue() || [];
        const mainImage =
          attachments.length > 0 ? attachments[0].main_image : placeholderImage;

        return (
          <Image
            src={mainImage}
            alt="product image"
            width={200}
            height={200}
            className="w-24 h-24 object-cover rounded"
          />
        );
      },
    },
    {
      header: t("mrp"),
      accessorKey: "variant",
      cell: (row: any) => {
        const variants = row.getValue() || [];
        const mrp = variants.length > 0 ? variants[0].mrp : "N/A";

        return (
          <div className="text-base font-bold text-center">
            {mrp ? `৳${mrp}` : "N/A"}
          </div>
        );
      },
      filterFn: (row:any, columnId:any, filterValue:any) => {
        const variants = row.getValue(columnId) || [];
        const mrp = variants.length > 0 ? variants[0].mrp : null;
        return mrp?.toString().toLowerCase().includes(filterValue.toLowerCase());
      },
    },
    {
      header: t("Edit"),
      accessor: "edit",
      enableSorting: false,
      cell: (row: any) => (
        <button
          onClick={() => handleEdit(row.row.original)} // Pass the entire category object
          className="bg-[#F17B25] text-[#FEFCFF] font-medium text-sm px-6 py-3 rounded-sm "
        >
          <div className="flex items-center gap-2">
            <MdOutlineEdit className="w-4 h-4 text-[#FEFCFF]" />
            {/* {t("Edit")} */}
          </div>
        </button>
      ),
    },
    {
      header: t("Delete"),
      accessor: "delete",
      enableSorting: false,
      cell: (row: any) => (
        <button
          onClick={()=>handleDelete(row.row.original)}
          className="bg-[#f13325] text-[#FEFCFF] font-medium text-sm px-6 py-3 rounded-sm "
        >
          <div className="flex items-center gap-2">
          <MdDelete className="w-4 h-4 text-[#FEFCFF]" />
            {/* {t("Delete")} */}
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
    <ToastContainer/>
      <section>
        <div className="text-3xl p-4 border-b-2 border-[#989898]">
          <p className="container mx-auto">{t("All_Product")}</p>
        </div>
        <div className="p-6 container mx-auto">
          {isError ? (
            <div className="text-red-600">
              <p>{t("There_error_fetching_categories")}</p>
              <p>{error instanceof Error ? error.message : "Unknown error"}</p>
            </div>
          ) : isLoading ? (
            <div className="w-screen h-screen flex justify-center items-center">
              <ScaleLoader color="#421957" height={70} radius={8} width={10} />
            </div>
          ) : (
            <>
              <FilterDiv
                filtering={filtering}
                setFiltering={setFiltering}
                data={data}
                table={table}
                buttonEnable={false}
                open={addModalOpen}
                onOpenChange={setAddModalOpen}
              >
                {/* <CategoryAdd refetch={refetch} modalClose={handleCloseAdd} /> */}
              </FilterDiv>
              <TableModel table={table} />
              <PaginationDiv table={table} />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default AllProduct;
