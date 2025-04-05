"use client";
import Navbar from "@/components/admin/Navbar/Navbar";
import Sidebar from "@/components/admin/Sidebar/Sidebar";
import store from "@/redux/Store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";

function Layout({ children }: { children: ReactNode }) {
	const [isSidebarVisible, setSidebarVisible] = useState(
		window.innerWidth > 767
	);

	const queryClient = new QueryClient();

	useEffect(() => {
		const handleResize = () => {
			setSidebarVisible(window.innerWidth > 767);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<div className="flex relative overflow-x-hidden ">
					<Sidebar />

					<div
						className={`${
							isSidebarVisible
								? "ease-in-out duration-500 pl-72 max-md:pl-0"
								: " ease-in-out duration-500 pl-0"
						} h-screen w-full relative`}
					>
						<Navbar
							isSidebarVisible={isSidebarVisible}
							setSidebarVisible={setSidebarVisible}
						/>
						<div className="pt-14">
							<div className="py-4">{children}</div>
						</div>
					</div>
				</div>
			</QueryClientProvider>
		</Provider>
	);
}

export default Layout;
