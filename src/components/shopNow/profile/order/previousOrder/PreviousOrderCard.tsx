import Link from "next/link";
import { SiTicktick } from "react-icons/si";
import { RxCrossCircled } from "react-icons/rx";

type IPastOrderCard = {
	orderId: string;
	date: string;
	price: number;
	delivered: boolean;
	products: {
		productName: string;
		qty: number;
		productPrice: number;
	}[];
};

const PreviousOrderCard = (props: IPastOrderCard) => {
	return (
		<div className="bg-bgSecondary border border-brandLsPrimary rounded-lg p-4 mb-4">
			<div className="flex justify-between text-xl text-brandPrimary mb-4">
				<p className=""> Order ID# HPO{props.orderId} </p>
				<p className="font-bold "> 4080 Taka </p>
			</div>

			<p className="text-grey mb-4"> {props.date} </p>

			<div className="mb-2">
				{props.delivered ? (
					<div className="flex items-center gap-2 text-success">
						<SiTicktick className="text-xl" /> Delivered
					</div>
				) : (
					<div className="flex items-center gap-2 text-dangerPrimary">
						<RxCrossCircled className="text-xl" /> Cancelled
					</div>
				)}
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

						<button className="block md:hidden py-2 px-8 rounded-full text-brandPrimary border border-brandPrimary">
							Add to cart
						</button>
					</div>
				</div>

				<div className="flex-col justify-center hidden md:flex">
					<button className="py-2 px-8 rounded-full text-brandPrimary border border-brandPrimary">
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default PreviousOrderCard;
