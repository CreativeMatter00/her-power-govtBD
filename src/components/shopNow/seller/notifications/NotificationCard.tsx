/* eslint-disable react/no-unescaped-entities */

import { Checkbox } from "@/components/ui/checkbox";

type INotificationCard = {
	title: string;
	time: string;
};

const NotificationCard = (props: INotificationCard) => {
	return (
		<div
			className="px-4 py-3 grid border border-brandLsPrimary rounded-md mb-4"
			style={{ gridTemplateColumns: "7fr 1fr" }}
		>
			<div className="flex items-center space-x-2">
				<Checkbox id="" />
				<label htmlFor="" className="text-brandPrimary">
					{props.title}
				</label>
			</div>
			<div className="text-greyPrimary text-sm text-right"> {props.time} </div>
		</div>
	);
};

export default NotificationCard;
