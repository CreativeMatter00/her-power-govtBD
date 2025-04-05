import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// *======= EVENTS TYPE DEFINITION ===========
interface IEventCategory {
	category_file_url: string;
	category_name: string;
	category_pid: string;
}

// *======== PROPS TYPE DEFINITION ==============
interface IProps {
	event: IEventCategory;
}

const EventCategoryCard: React.FC<IProps> = ({ event }) => {
	const locale = useLocale();
	// console.log(event);
	// ======================= DESTRUCTURING EVENT PROPERTIES =============================
	const { category_file_url, category_name, category_pid } = event;

	return (
		<>
			<Link href={`/${locale}/events/events-category/${category_pid}`}>
			<div className="group hover:cursor-pointer">
				<div className="flex justify-center items-center">
					{/* ======= EVENT IMAGE =========== */}
					<div className="flex justify-center items-center w-[92px] h-[92px] border border-brandPrimary group-hover:border-none group-hover:bg-brandLsPrimary rounded-full ">
						{category_file_url && (
							<div>
								<Image
									src={category_file_url}
									alt={`${category_name}`}
									width={92}
									height={92}
									className=" w-[92px] h-[92px] rounded-full"
								/>
							</div>
						)}
					</div>
				</div>
				{/* ======== EVENT NAME =========== */}
				<div className="text-sm text-center pt-2 group-hover:text-brandDs">
					{category_name ? <p>{category_name}</p> : <p>Static Event Name</p>}
				</div>
			</div>
			</Link>
		</>
	);
};

export default EventCategoryCard;
