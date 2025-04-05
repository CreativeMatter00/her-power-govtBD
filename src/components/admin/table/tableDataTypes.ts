import React from "react";

export type THeaderGroup = {
	id: string;
	column: {
		// handler function for toggling the sorting state
		getToggleSortingHandler: () =>
			| React.MouseEventHandler<HTMLDivElement> // a function type that handles mouse events on a div element
			| undefined; // if sorting not available
		columnDef: {
			header:
				| string
				| number
				| boolean
				| React.ReactElement<any, string | React.JSXElementConstructor<any>>
				| React.ReactPortal
				| React.ComponentType<any>
				| null
				| undefined;
		};
		getIsSorted: () => string; // This method returns a string that indicates the current sorting state of the column, such as "asc" for ascending or "desc" for descending.
		getCanFilter: () => any; // This method returns a value indicating whether the column can be filtered. The return type is any, which means it can return any type of value.
		setFilterValue: (arg0: string) => void; // This method sets the filter value for the column. It takes a single argument arg0, which is a string, and returns nothing (void).
		getContext: () => any;
	};
};

export type TCell = {
	id: string;
	column: {
		columnDef: {
			cell:
				| string
				| number
				| boolean
				| React.ReactElement<any, string | React.JSXElementConstructor<any>>
				| React.ReactPortal
				| React.ComponentType<any>
				| null
				| undefined;
		};
	};
	getContext: () => any;
};
