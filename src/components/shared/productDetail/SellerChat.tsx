import { format } from "date-fns";
import Image from "next/image";
import React from "react";

interface IData {
	chat_pid: string;
	customerfirstname: string;
	customerlastname: string;
	shop_name: string; // seller name
	review_content: string; // question
	reply_content: string; // answer
	cre_date: string;
	sellerfirstname: string;
	sellerlastname: string;
	sellerimg?: string;
	cutomerimg?: string;
}

interface IProps {
	chatData: IData[];
}

const SellerChat: React.FC<IProps> = ({ chatData }) => {
	// const SellerChat = ({ chatData }) => {
	// console.log(chatData);

	const isValidImageUrl = (url: string) => {
		// Regex to check for common image extensions (e.g., .jpg, .jpeg, .png, .gif, etc.)
		const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
		return imageExtensions.test(url);
	};
	return (
		<>
			{chatData?.map((chat: any, index: number) => {
				const formattedDate = format(
					new Date(chat.cre_date),
					"dd MMM, yyyy" // Format: 28 Apr, 2024
				);
				return (
					<div
						key={index}
						className="p-4 border border-brandLsPrimary rounded-lg bg-bgSecondary mb-2"
					>
						<div className="mb-4">
							<div className="flex flex-wrap items-center gap-4">
								{chat?.customerImg && isValidImageUrl(chat?.customerImg) ? (
									<Image
										// src={"/assets/images/shop-now/avatar/1.png"}
										src={chat?.customerImg}
										height={32}
										width={32}
										alt="user"
										className="w-8 h-8 rounded-full"
									/>
								) : (
									<div>
										<div className="bg-red-500 text-white rounded-full px-3 py-1">
											<span className="font-bold">C</span>
										</div>
									</div>
								)}

								{/*----------- USER QUESTION ----------- */}
								<p className="text-brandPrimary">
									{" "}
									{chat?.customerFirstName} {chat?.customerLastName}{" "}
								</p>
								<p className="text-grey text-sm"> {formattedDate} </p>
							</div>
							<p className="ml-12">{chat?.review_content}</p>
						</div>

						<div>
							<div className="flex flex-wrap items-center gap-4">
								{chat.sellerImg && isValidImageUrl(chat.sellerImg) ? (
									<Image
										// src={"/assets/images/shop-now/avatar/1.png"}
										src={chat.sellerImg}
										height={32}
										width={32}
										alt="user"
										className="w-8 h-8 rounded-full"
									/>
								) : (
									<div>
										<div className="bg-green-500 text-white rounded-full px-3 py-1">
											<span className="font-bold">S</span>
										</div>
									</div>
								)}
								{/* ----------- SELLER ANSWER ----------- */}
								<p className="text-link"> {chat.shop_name} </p>
								<p className="text-brandPrimary">(Seller) </p>
								{/* <p className="text-grey text-sm"> 7 Nov, 2023 </p> */}
							</div>
							<p className="ml-12">{chat.reply_content}</p>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default SellerChat;
