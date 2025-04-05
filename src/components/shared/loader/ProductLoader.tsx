import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductLoader = () => {
	return (
		<div className="flex flex-col space-y-3">
			<Skeleton className="h-[250px] w-[250px] rounded-xl bg-gray-100" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px] bg-gray-100" />
				<Skeleton className="h-4 w-[200px] bg-gray-100" />
			</div>
		</div>
	);
};

export default ProductLoader;
