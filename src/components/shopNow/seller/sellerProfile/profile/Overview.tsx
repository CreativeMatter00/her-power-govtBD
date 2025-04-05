import { getSellerBasicInfo } from "@/api/api";
import { calculateAge } from "@/utils/calculateAge";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FaStar } from "react-icons/fa";
import ScaleLoader from "react-spinners/ScaleLoader";

const Overview = () => {
	const params = useParams();

	// console.log(params.id);

	const { isLoading, error, data } = useQuery({
		queryKey: ["getSellerBasicInfo"],
		queryFn: () => getSellerBasicInfo(params.id as string),
	});

	// console.log(data);



	if (isLoading)
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<ScaleLoader color="#421957" height={70} radius={8} width={10} />
			</div>
		);

	if (error)
		return (
			<div className="text-center text-xl font-md py-8">
				Something went wrong. Please reload
			</div>
		);

	return (
		<div>
			{/* //?-----------Seller Overview----------- */}

			<div className="grid grid-cols-4 gap-4 mb-6">
				<div className="border-r border-greyPrimary">
					<p className="text-brandPrimary mb-2"> Seller in Her Power </p>
					<p className="text-link text-4xl"> {calculateAge(data.cre_date)} </p>
				</div>
				<div className="border-r border-greyPrimary">
					<p className="text-brandPrimary mb-2"> Shipped on Time </p>
					<p className="text-link text-4xl"> 100% </p>
				</div>
				<div className="border-r border-greyPrimary">
					<p className="text-brandPrimary mb-2"> Chat Response Rate </p>
					<p className="text-link text-4xl"> 97% </p>
				</div>
				<div>
					<p className="text-brandPrimary mb-2"> Chat Response time </p>
					<p className="text-link text-4xl">
						{" "}
						<span className="text-base text-greyPrimary"> Active in: </span> 30
						mins{" "}
					</p>
				</div>
			</div>

			{/* //?-----------Seller Ratings----------- */}

			{/* <div className="mb-6">
				<p className="text-xl text-brandPrimary mb-6">
					Seller Positive Ratings
				</p>

				<div className="">
					<div className="flex">
						<div className="flex items-center py-8 pr-6 gap-8 border-r border-brandLsPrimary">
							<p className="text-5xl text-brandPrimary"> 4.0 </p>
							<p className="text-brandDs text-4xl">
								<FaStar />
							</p>
						</div>

						<div className="pl-10">
							<div className="flex items-center gap-2">
								<p className="text-grey"> 5 </p>
								<p className="text-grey">
									<FaStar />
								</p>
								<div className="bg-greySecondary w-48 h-2">
									<div className="bg-brandDs w-[70%] h-full"> </div>
								</div>
								<p className="text-brandDs"> 17 </p>
							</div>

							<div className="flex items-center gap-2">
								<p className="text-grey"> 4 </p>
								<p className="text-grey">
									<FaStar />
								</p>
								<div className="bg-greySecondary w-48 h-2">
									<div className="bg-brandDs w-[20%] h-full"> </div>
								</div>
								<p className="text-brandDs"> 2 </p>
							</div>

							<div className="flex items-center gap-2">
								<p className="text-grey"> 3 </p>
								<p className="text-grey">
									<FaStar />
								</p>
								<div className="bg-greySecondary w-48 h-2">
									<div className="bg-brandDs opacity-60 w-[30%] h-full"> </div>
								</div>
								<p className="text-brandDs"> 1 </p>
							</div>

							<div className="flex items-center gap-2">
								<p className="text-grey"> 2 </p>
								<p className="text-grey">
									<FaStar />
								</p>
								<div className="bg-greySecondary w-48 h-2">
									<div className="bg-warning w-[20%] h-full"> </div>
								</div>
								<p className="text-brandDs"> 2 </p>
							</div>

							<div className="flex items-center gap-2">
								<p className="text-grey"> 1 </p>
								<p className="text-grey">
									<FaStar />
								</p>
								<div className="bg-greySecondary w-48 h-2">
									<div className="bg-dangerPrimary w-[10%] h-full"> </div>
								</div>
								<p className="text-brandDs"> 1 </p>
							</div>
						</div>
					</div>
				</div>

				<p className="text-greyPrimary mt-6"> Based on 107 customer reviews </p>
			</div> */}
		</div>
	);
};

export default Overview;
