import Image from "next/image";
import im from "../../../../public/assets/images/course/course enroll/Nagad_logo.png";
const PaymentMethod = () => {
	return (
		<>
			<h1 className="text-base font-bold text-center mt-6">Payment Method</h1>
			<div className="flex justify-center items-center gap-3 mt-3">
				<Image
					src={"/assets/images/course/course enroll/Upay_logo.png"}
					alt="Upay"
					width={21}
					height={20}
					className="w-auto h-8"
				/>
				<Image
					src={"/assets/images/course/course enroll/Nagad_logo.png"}
					alt="Nagad"
					width={47}
					height={20}
					className="w-auto h-8"
				/>
				<Image
					src={"/assets/images/course/course enroll/Rocket_Logo.png"}
					alt="Rocket"
					width={47}
					height={30}
					className="w-auto h-8"
				/>
				<Image
					src={"/assets/images/course/course enroll/bKash_logo.png"}
					alt="Bkash"
					width={65}
					height={30}
					className="w-auto h-8"
				/>
			</div>
		</>
	);
};

export default PaymentMethod;
