"use client"
import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import {
  CellContext,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// UI Components
import { deleteEvent, getEvents } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { useCookies } from "next-client-cookies";
import FilterDiv from "../../table/FilterDiv";
import PaginationDiv from "../../table/PaginationDiv";
import TableModel from "../../table/TableModel";

const EventListTable = () => {
  const queryClient = useQueryClient();
  const cookies = useCookies();
  const [eventId, setEventId] = useState<string | null>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const { isLoading, data: allEvents } = useQuery({
    queryKey: ["allEvents"],
    queryFn: getEvents,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ event_pid }: { event_pid: string | null }) =>
      deleteEvent(event_pid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
    },
  });

  const handleDeleteEvent = (eventInfo: any) => {
    setEventId(eventInfo?.event_pid);
    setDeleteModalOpen(true);
  };

  const handleDeleteSubmit = async (pid: string | null) => {
    if (!pid) return;
    const res = await mutateAsync({ event_pid: eventId });
    if (res?.data?.status === true) {
      toast.success(res?.data?.message);
      setDeleteModalOpen(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (info: CellContext<any, any>) => info.row.index + 1,
      },
      {
        header: "Title",
        accessorKey: "event_title",
      },
      {
        header: "Description",
        accessorKey: "event_desc",
        cell: (row: any) => (
          <p
            className="line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: row?.row?.original?.event_desc,
            }}
          />
        ),
      },
      {
        header: "Delete Event",
        cell: (row: any) => (
          <button
            onClick={() => handleDeleteEvent(row?.row?.original)}
            className="bg-rose-100 text-rose-700 flex items-center px-3 py-2 rounded-md"
          >
            <Trash2 className="mr-1" /> Delete
          </button>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => allEvents || [], [allEvents]);

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
      sorting,
      globalFilter: filtering,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onColumnVisibilityChange: setColumnVisibility,
  });

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <section>
        <div className="text-3xl p-4 border-b-2 border-[#989898]">event List</div>
        <div className="p-6">
          <FilterDiv
            filtering={filtering}
            setFiltering={setFiltering}
            data={data}
            table={table}
            title="Add event"
            open={addModalOpen}
            onOpenChange={setAddModalOpen}
            buttonEnable={false}
          />

          <TableModel table={table} />
          <PaginationDiv table={table} />
          <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
             <DialogContent className="sm:max-w-[425px] bg-white py-10">
              <X className="w-8 h-8 text-[#c9332e] mx-auto" />
              <DialogTitle className="text-center">Are you sure?</DialogTitle>
              <DialogDescription className="text-center">
                Do you want to delete these event records?
              </DialogDescription>

              <DialogFooter>
                <Button
                  type="submit"
                  className={`bg-rose-600 text-white px-3 py-2`}
                  onClick={() => handleDeleteSubmit(eventId)}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>

          </Dialog>
        </div>
      </section>
    </>
  );
};

export default EventListTable;
