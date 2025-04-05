// "use client";
import Image from "next/image";
import React from "react";

//  ================================== ORDER DETAILS INTERFACE  ===================================
interface OrderDetails {
	productImage: string;
	productName: string;
	productQuantity: number;
	productUnitPrice: number;
}

const Order: React.FC<OrderDetails> = ({
	productImage,
	productName,
	productQuantity,
	productUnitPrice,
}) => {
	// console.log(productImage, productName, productQuantity, productUnitPrice);
	return (
		<>
			<div className="flex gap-8 border-b border-brandLsPrimary pb-4 mb-4 w-full">
				{/* ======================= ORDERED PRODUCT IMAGE ======================== */}
				<Image
					src={productImage}
					alt={`${productName}`}
					width={60}
					height={75}
					className="w-[60px] h-[75px] rounded"
				/>

				{/* ========================= PRODUCT DETAILS ================================ */}
				<div className="flex justify-between items-center w-full text-base font-normal">
					<div className="flex flex-col gap-1">
						{/* =================== PRODUCT NAME =========================== */}
						<h1 className="text-link">{productName}</h1>
						{/* ========================= QUANTITY ===================== */}
						<p className="text-greyPrimary">Qty: {productQuantity}</p>
						{/* =================== PRODUCT PRICE =========================== */}
						<p className="text-greyPrimary">
							Unit Price: {productUnitPrice} TK
						</p>
					</div>
					{/* ============= TOTAL COST FOR PER ORDER ======================= */}
					<div className="text-brandPrimary">
						{productQuantity * productUnitPrice} tk.
					</div>
				</div>
			</div>
		</>
	);
};

export default Order;
