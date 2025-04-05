import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const ContactInfo: React.FC<{ setActive: Function }> = ({ setActive }) => {
	return (
		<div className="container mx-auto py-10">
			<p className="text-brandPrimary text-3xl mb-6"> Register Now </p>
			<p className="text-brandDs font-bold border-b border-brandLsPrimary py-2">
				Contact Information
			</p>

			<div className="flex items-center gap-2 py-2">
				<p className="text-brandPrimary">
					Logged in as <span className="font-bold">samiul333@gmail.com</span>
				</p>

				<Link href={""} className="text-link">
					Not You?
				</Link>
			</div>

			<div className="py-8">INPUTFIELD</div>

			<div className="mb-10">
				<div className="flex items-center space-x-2">
					<Checkbox id="email" />
					<label
						htmlFor="email"
						className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Send me emails about the best events happening nearby or online.
					</label>
				</div>

				<div className="flex items-center gap-2 py-2">
					<p className="text-brandPrimary">
						By clicking Register, I agree to the
					</p>

					<Link href={""} className="text-link">
						Terms and Conditions
					</Link>
				</div>
			</div>

			<button
				onClick={() => setActive("getTicket")}
				className="py-3 px-8 rounded-full bg-link text-white"
			>
				Register
			</button>
		</div>
	);
};

export default ContactInfo;
