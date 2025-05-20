"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';
import ScaleLoader from "react-spinners/ScaleLoader";
import "react-toastify/dist/ReactToastify.css";
import { api, sellerOrderDetails } from "../../../../../../api/api";
import EditInput from "./EditInput";

interface IEditProps {
	editData: any;
	setEditModalOpen: Function;
	refetch: any;
	dashboardOverViewRefetch: any;
}

interface IProductDetails {
	file_url: string;
	order_pid: string;
	product_name: string;

	product_pid: string;
	quantity: number;
	mrp_price: number;
	delivery_charge: number;
	sales_amount: number;
	order_status: string;
	order_status_numb: number;
}

const OrderEdit: React.FC<IEditProps> = ({
	editData,
	setEditModalOpen,
	refetch,
	dashboardOverViewRefetch,
}) => {
	// console.log("editData", editData);
	// const [productDetailsMap, setProductDetailsMap] = useState<{
	// 	[key: string]: any;
	// }>({});

	const {
		isLoading,
		isError,
		data: singleOrderDetails,
	} = useQuery({
		queryKey: ["singleOrderDetails"],
		queryFn: () => sellerOrderDetails(editData?.order_pid),
	});

	const ORDER_STATUS = {
		0: "CANCELLED",
		1: "PENDING",
		2: "PROCESSING",
		3: "DELIVERED",
	};

	const handleStatusChange = async (
		order_pid: string,
		product_pid: string,
		newStatus: string
	) => {
		// console.log("New Status:", order_pid, product_pid, newStatus);
		try {
			const response = await api.put(`/api/admin/order/${order_pid}`, {
				order_status: Number(newStatus),
				product_pid: product_pid,
			});
			// console.log("Response Data:", response.data);
			toast.success(`Order updated: ${order_pid} - ${product_pid}`, {
				position: "top-left",
				duration: 3000,
			});
			refetch();
			dashboardOverViewRefetch();
			//   setEditModalOpen(false)
		} catch (error) {
			console.error(error);
			toast.error(`Failed to update order: ${order_pid} - ${product_pid}`, {
				position: "top-left",
				duration: 3000,
			});
		}
	};

	if (isLoading)
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<ScaleLoader color="#421957" height={70} radius={8} width={10} />
			</div>
		);

	return (
		<div className="">
			<h2 className="text-lg font-semibold mb-4">
				Edit Order : {editData?.order_pid || "Order ID"}
			</h2>
			<div className="max-h-[70vh] overflow-y-auto">
			<table className="table-auto w-full border-collapse">
				<thead>
					<tr className="bg-gray-100 border-b">
						{/* <th className="py-2 px-4">Order PID</th> */}
						<th className="py-2 px-4">Product Image</th>
						<th className="py-2 px-4">Product Name</th>
						<th className="py-2 px-4">Product PID</th>
						<th className="py-2 px-4">Quantity</th>
						{/* <th className="py-2 px-4">MRP Price</th>
            <th className="py-2 px-4">Delivery Charge</th> */}
						<th className="py-2 px-4">Sales Amount</th>
						{/* <th className="py-2 px-4">Current Status</th> */}
						<th className="py-2 px-4">Change Status</th>
					</tr>
				</thead>
				<tbody >
					{singleOrderDetails?.map((product: IProductDetails) => {
						// const productDetails = productDetailsMap[product.product_pid];

						return (
							<tr key={product?.order_pid} className="border-b">
								{/* <td className="py-2 px-4">{product?.order_pid}</td> */}
								<td className="py-2 px-4">
									<Image
										src={product?.file_url || "/default-image.png"}
										height={80}
										width={80}
										className="w-24 h-12 object-cover"
										alt="Product Image"
									/>
								</td>
								<td className="py-2 px-4">
									{product?.product_name.slice(0, 15) || "Loading..."} ...
								</td>

								<td className="py-2 px-4">{product?.product_pid}</td>

								<td className="py-2 px-4">{product?.quantity}</td>
								{/* <td className="py-2 px-4">{product?.mrp_price}</td>
                <td className="py-2 px-4">{product?.delivery_charge}</td> */}
								<td className="py-2 px-4">{product?.sales_amount}</td>
								{/* <td className="py-2 px-4">{product?.order_status}</td> */}

								<td className="py-2 px-4">
									<EditInput
										labelName="Change Status"
										inputName={`orderStatus_${product?.order_pid}`}
										statusOptions={ORDER_STATUS}
										statusValue={product?.order_status_numb}
										errors={{}}
										optional={false}
										onChange={(value) =>
											handleStatusChange(
												product?.order_pid,
												product?.product_pid,
												value
											)
										}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			</div>
			<Toaster/> 
		</div>
	);
};

export default OrderEdit;
