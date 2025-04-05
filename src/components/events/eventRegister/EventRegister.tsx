"use client";

import { useState } from "react";
import ContactInfo from "./contactInfo/ContactInfo";
import GetTicket from "./getTicket/GetTicket";
import Payment from "./payment/Payment";

const EventRegister = () => {
	const [active, setActive] = useState("contactInfo");

	return (
		<div>
			{active === "contactInfo" && <ContactInfo setActive={setActive} />}
			{active === "getTicket" && <GetTicket setActive={setActive} />}
			{active === "payment" && <Payment setActive={setActive} />}
		</div>
	);
};

export default EventRegister;
