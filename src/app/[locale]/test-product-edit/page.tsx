"use client";
import EditProductNew from "@/components/shopNow/seller/editProduct/editProductNew/EditProductNew";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const page = () => {
	const queryClient = new QueryClient();

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<EditProductNew />
				{/* <Example /> */}
			</QueryClientProvider>
		</>
	);
};

export default page;
