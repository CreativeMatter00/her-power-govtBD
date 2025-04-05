const Overview = () => {
	return (
		<div className="container mx-auto">
			<div className="">
				{/* //?-----------Seller Overview----------- */}

				<div className="grid grid-cols-4 gap-4 mb-6">
					<div className="border-r border-greyPrimary">
						<p className="text-brandPrimary mb-2"> Seller in Her Power </p>
						<p className="text-link text-4xl"> 7+ years </p>
					</div>
					<div className="border-r border-greyPrimary">
						<p className="text-brandPrimary mb-2"> Shipped on Time </p>
						<p className="text-link text-4xl"> 83% </p>
					</div>
					<div className="border-r border-greyPrimary">
						<p className="text-brandPrimary mb-2"> Chat Response Rate </p>
						<p className="text-link text-4xl"> 97% </p>
					</div>
					<div>
						<p className="text-brandPrimary mb-2"> Chat Response time </p>
						<p className="text-link text-4xl">
							{" "}
							<span className="text-base text-greyPrimary">
								{" "}
								Active in:{" "}
							</span>{" "}
							30 mins{" "}
						</p>
					</div>
				</div>

				{/* //?-----------Seller Ratings----------- */}
			</div>
		</div>
	);
};

export default Overview;
