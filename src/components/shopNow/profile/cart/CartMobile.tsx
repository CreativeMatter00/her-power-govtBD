const CartMobile = (products: { products: any }) => {
	return (
		<div>
			{/* <div className="p-2 bg-bgPrimary border border-brandLsPrimary rounded-lg block md:hidden ">
				{products.map((product, index) => {
					return (
						<div className="py-2 border-b border-brandLsPrimary" key={index}>
							<div
								className="grid gap-4"
								style={{ gridTemplateColumns: "1fr 3fr" }}
							>
								<div className="flex items-center justify-center max-h-[150px]">
									<Image
										src={product.image}
										height={150}
										width={150}
										className="max-h-[150px]"
										alt="product"
									/>
								</div>

								<div className="flex flex-col justify-between">
									<div>
										<p className="text-link"> {product.title} </p>
										<div className="flex items-center gap-2  mx-auto">
											<button
												className="bg-brandDs text-white text-lg h-6 w-6 flex items-center justify-center rounded-full"
												// onClick={decrement}
											>
												-
											</button>

											<input
												type="number"
												className={`w-12 text-center font-bold text-sm border border-brandLsPrimary bg-transparent ${styles.counterShadow}`}
												readOnly
												value={0}
											/>
											<button
												className="bg-brandDs text-white text-lg h-6 w-6 flex items-center justify-center rounded-full"
												// onClick={increment}
											>
												+
											</button>
										</div>
									</div>

									<div className="flex items-center justify-between">
										<div>
											<p className="text-brandPrimary">
												{product.totalPrice}tk
											</p>
										</div>

										<div className="flex items-center gap-2">
											<button className="bg-warning text-white p-2 rounded-sm">
												<TfiReload />
											</button>

											<button className="bg-dangerPrimary text-white p-2 rounded-sm">
												<RiDeleteBin5Line />
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
				<div className="w-full md:w-[400px] ml-auto text-brandDs p-4 mb-8">
					<div className="flex justify-between w-full mb-2">
						<p className="font-bold">
							Subtotal <span className="font-normal"> (3 Items) </span>
						</p>
						<p> 4000tk. </p>
					</div>
					<div className="flex justify-between w-full mb-2">
						<p className="font-bold">Shipping Fee</p>
						<p> 80tk. </p>
					</div>
					<div className="flex justify-between w-full">
						<p className="font-bold">Total</p>
						<p className="text-success font-bold"> 4080tk. </p>
					</div>
				</div>
			</div>

			<div className="flex flex-col md:flex-row items-center justify-end py-6 gap-4">
				<Link href={`/${locale}/shop-now`}>
					<button className="px-10 py-4 rounded-full border border-brandPrimary text-sm hover:bg-brandDs hover:text-white">
						Continue Shopping
					</button>
				</Link>
				<button
					className="px-10 py-4 rounded-full border border-brandPrimary bg-brandDs text-white text-sm hover:bg-brandHover"
					onClick={() => setActive("checkout")}
				>
					Proceed to Checkout
				</button>
			</div> */}
		</div>
	);
};

export default CartMobile;
