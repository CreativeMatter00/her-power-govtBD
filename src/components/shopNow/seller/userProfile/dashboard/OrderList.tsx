"use client";
import TableModel from "@/components/admin/table/TableModel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { MdOutlineEdit } from "react-icons/md";
import ViewOrder from "./ViewOrder";
import OrderEdit from "./orderEditForm/OrderEdit";
import PaginationDiv from "@/components/admin/table/PaginationDiv";
import FilterDiv from "@/components/admin/table/FilterDiv";
import { useQuery } from "@tanstack/react-query";
import { sellerOrderList } from "../../../../../api/api";
import ProductLoader from "../../../../shared/loader/ProductLoader";
import { statusColors, statusLabels } from "@/utils/status";
import { useTranslations } from "next-intl";

const OrderList = ({
  dashboardOverViewRefetch,
}: {
  dashboardOverViewRefetch: any;
}) => {
  const t = useTranslations("talentHunt");

  const loginDetails = localStorage.getItem("loginDetails");
  const userLoginDetails = JSON.parse(loginDetails as any);
  const entrprId = userLoginDetails?.enterpenure_pid;
  // console.log(entrprId);

  const [editData, setEditData] = useState<any | null>(null);
  const [viewData, setViewData] = useState<any | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const handleEdit = (rowData: any) => {
    setEditData(rowData); // Set the data to edit
    setEditModalOpen(true); // Open the Edit Dialog
  };

  const handleView = (rowData: any) => {
    setViewData(rowData);
    setViewModalOpen(true);
  };
  const formatDate = (dateString: string) => {
    const options: any = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const COLUMNS: ColumnDef<any, any>[] = [
    {
      header: t("Serial"),
      enableColumnFilter: false,
      accessorKey: "id",
      cell: (row: any) => row.row.index + 1,
    },
    {
      header: t("Order_ID"),
      accessorKey: "order_pid",
    },
    {
      header: t("Customer_Name"),
      accessorKey: "full_name",
    },
    {
      header: t("Customer_Address"),
      accessorKey: "full_address",
    },
    {
      header: t("Customer_Mobile"),
      accessorKey: "mobile_no",
    },
    {
      header: t("Total_Cost_BDT"),
      accessorKey: "total_amount",
    },
    {
      header: t("Total_Cost_BDT"),
      accessorKey: "total_amount",
    },
    {
      header: t("Order_Date"),
      accessorKey: "order_date",
      cell: ({ getValue }: { getValue: any }) => formatDate(getValue()),
    },
    {
      header: t("Status"),
      accessorKey: "order_status_numb",
      cell: ({ getValue }) => {
        const statusValue = getValue<number>(); // Specify the type of the value
        return (
          <span className={statusColors[statusValue]}>
            {statusLabels[statusValue]}
          </span>
        );
      },
    },
    {
      header: t("Edit"),
      accessorKey: "edit",
      enableColumnFilter:false,
      enableSorting: false,
      cell: (row: any) => (
        <div className="flex items-center gap-6">
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

  const {
    isLoading,
    error,
    data: allOrderDetails,
    refetch,
  } = useQuery({
    queryKey: ["allOrderDetails"],
    queryFn: () => sellerOrderList(entrprId),
    enabled: !!entrprId,
  });

  // console.log("allOrderDetails", allOrderDetails);

  // ================= MEMOIZATION ================
  const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => allOrderDetails, [allOrderDetails]);
  const data = useMemo(() => allOrderDetails, [allOrderDetails]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});

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
        {t("Something_went_wrong")}
      </div>
    );

  return (
    <section className="container mx-auto mb-16">
      {/* <div className="py-10 lg:py-16 w-full ">
        <h1 className="text-sm text-[#a5a5a5] font-normal">
          Search Order by SKU
        </h1>
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:justify-between items-center max-md:gap-4 mt-2">
            <div className="flex items-center border border-brandDs rounded-full basis-2/4 p-0.5 w-full">
              <div className="basis-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className=" py-1.5 px-4 outline-none bg-transparent "
                />
              </div>
              <div className="flex justify-center items-center w-10 h-10 bg-brandDs rounded-full">
                <IoIosSearch className="text-bgSecondary w-5 h-5 font-bold" />
              </div>
            </div>
            <div className="text-link text-base font-normal">Draft (2)</div>
          </div>
        </div>
      </div> */}

      {isLoading ? (
        <ProductLoader />
      ) : (
        <div className="">
          {/* ============= COURSE HISTORY TABLE  TITLE ============== */}
          <h1 className="font-bold text-base text-brandDs pb-6 mt-4">
            {t("All_Order_List")}
          </h1>
          <div className="w-full">
            {/* ====================== FILTERING METHOD ====================== */}
            <FilterDiv
              filtering={filtering}
              setFiltering={setFiltering}
              data={data}
              table={table}
              buttonEnable={false}
            ></FilterDiv>
            {/* =========================== TABLE MODEL ======================== */}
            <TableModel table={table} enableFiltering={true} />
            {/* =========================== PAGINAITON ====================== */}
            <PaginationDiv table={table} />
          </div>
          {/* =========================== EDIT MODAL ====================== */}
          <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
            <DialogContent className="bg-white w-[80vw]">
              <OrderEdit
                editData={editData}
                setEditModalOpen={setEditModalOpen}
                refetch={refetch}
                dashboardOverViewRefetch={dashboardOverViewRefetch}
              />
            </DialogContent>
          </Dialog>
          {/* ====================== VIEW MODAL ================= */}
          <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
            <DialogContent className="bg-white w-[80vw]">
              <ViewOrder
                viewData={viewData}
                setEditModalOpen={setEditModalOpen}
                refetch={refetch}
              />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </section>
  );
};

export default OrderList;
