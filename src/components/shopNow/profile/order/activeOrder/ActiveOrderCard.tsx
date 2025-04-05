import Link from "next/link";
import { MdAvTimer } from "react-icons/md";

type IPastOrderCard = {
	orderId: string;
	date: string;
	price: number;
	products: {
		productName: string;
		qty: number;
		productPrice: number;
	}[];
};

const ActiveOrderCard = (props: IPastOrderCard) => {
	return (
		<div className="bg-bgSecondary border border-brandLsPrimary rounded-lg p-4 mb-4">
			<div className="flex justify-between text-xl text-brandPrimary mb-4">
				<p className=""> Order ID# HPO{props.orderId} </p>
				<p className="font-bold "> 4080 Taka </p>
			</div>

			<p className="text-grey mb-4"> {props.date} </p>

			<div className="flex gap-2 items-center text-warning mb-2">
				<MdAvTimer className="text-xl" /> In Progress
			</div>

			<div className="flex w-full gap-8">
				<div className="border-t-2 border-brandLsPrimary flex-grow">
					{props.products.map((product, index) => {
						return (
							<div
								key={index}
								className="flex gap-6 py-2 border-b-2 border-brandLsPrimary"
							>
								<p> {index + 1} </p>
								<p>
									{product.productName} {product.qty} X {product.productPrice}
									tk.
								</p>
							</div>
						);
					})}

					<div className="my-4 flex items-center justify-between">
						<Link href="#" className="text-link">
							View Order
						</Link>

						<button className="block md:hidden py-2 px-8 rounded-full text-dangerPrimary border border-dangerPrimary">
							Cancel Order
						</button>
					</div>
				</div>

				<div className="flex-col justify-center hidden md:flex">
					<button className="py-2 px-8 rounded-full text-dangerPrimary border border-dangerPrimary">
						Cancel Order
					</button>
				</div>
			</div>
		</div>
	);
};

export default ActiveOrderCard;
