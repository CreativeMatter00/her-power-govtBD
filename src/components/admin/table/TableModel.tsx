"use client";
import { flexRender } from "@tanstack/react-table";
import React, { useState } from "react";
import {
	TiArrowSortedDown,
	TiArrowSortedUp,
	TiArrowUnsorted,
} from "react-icons/ti";
import { BiSearchAlt } from "react-icons/bi";

type TTableModelProps = {
	table?: any;
	enableFiltering?: boolean;
};

const TableModel: React.FC<TTableModelProps> = ({
	table,
	enableFiltering = true,
}) => {
	const [selectedRows, setSelectedRows] = useState<string[]>([]);

	const handleRowClick = (rowId: string) => {
		setSelectedRows((prevSelectedRows) =>
			prevSelectedRows?.includes(rowId)
				? prevSelectedRows?.filter((id) => id !== rowId)
				: [...prevSelectedRows, rowId]
		);
	};

	return (
		<>
			<section className="overflow-x-auto overflow-y-auto mx-1">
				<table className="border-separate border-spacing-x-1 table-auto w-full">
					{/* ======================== HEADING ====================== */}
					<thead className="">
						{table
							.getHeaderGroups()
							.map((headerGroup: { id: string; headers: any[] }) => (
								<tr key={headerGroup?.id} className="bg-[#D4D4D4]">
									{headerGroup?.headers.map((header) => (
										<th
											key={header.id}
											className="px-2 py-1 text-[#444444] text-base font-bold "
										>
											<div
												onClick={header?.column.getToggleSortingHandler()}
												className=""
											>
												<div className="flex items-center gap-2">
													<div className="text-start">
														{flexRender(
															header?.column.columnDef.header,
															header?.getContext()
														)}
													</div>
													{header?.column.getCanSort() &&
														(header?.column.getIsSorted() === "asc" ? (
															<TiArrowSortedUp />
														) : header?.column.getIsSorted() === "desc" ? (
															<TiArrowSortedDown />
														) : (
															<TiArrowUnsorted />
														))}
												</div>
											</div>
											<div className="mt-4">
												{enableFiltering && header?.column.getCanFilter() ? (
													<div className="bg-white flex items-center gap-2 p-1 rounded-md">
														<BiSearchAlt className="text-[#646464] w-4 h-4" />
														<input
															type="text"
															className="outline-none font-normal "
															onChange={(e) =>
																header?.column.setFilterValue(e.target.value)
															}
														/>
													</div>
												) : null}
											</div>
										</th>
									))}
								</tr>
							))}
					</thead>

					{/* ========================== ROWS ================================= */}
					<tbody>
						{table
							?.getRowModel()
							?.rows.map(
								(row: { id: string; getVisibleCells: () => any[] }) => (
									<tr
										key={row.id}
										className={`${
											selectedRows.includes(row.id)
												? "bg-slate-300"
												: "odd:bg-[#FEFCFF] even:bg-[#F2F2F2]"
										}`}
										// onClick={() => handleRowClick(row.id)}
									>
										{row.getVisibleCells().map((cell) => (
											<td
												key={cell.id}
												className="px-4 py-1 text-[#1C1C1C] font-normal text-base"
											>
												{flexRender(
													cell?.column.columnDef.cell,
													cell?.getContext()
												)}
											</td>
										))}
									</tr>
								)
							)}
					</tbody>
				</table>
			</section>
		</>
	);
};

export default TableModel;
