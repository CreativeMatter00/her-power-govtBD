import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { UseFormRegister } from "react-hook-form";

interface FieldInfo {
	label: string;
	inputType: string;
	unitType: string;
	placeholderText: string;
	name: string;
	errors: any;
	register: UseFormRegister<any>;
}
const ProductInputWithSelectUnit: React.FC<FieldInfo> = ({
	inputType,
	unitType,
	placeholderText,
	name,
	errors,
	label,
	register,
}) => {
	return (
		<>
			<div className="w-full text-base">
				<label className="text-brandPrimary font-normal text-sm pl-6">
					{label}
				</label>
				<div className="flex justify-between items-center mt-1 placeholder:text-[#CACACA] max-md:pl-4 max-md:pr-2 px-4 border border-brandLsPrimary rounded-full bg-white">
					<input
						type={inputType}
						placeholder={placeholderText}
						{...register(name)}
						className="w-full outline-none"
					/>

					<div>
						<Select>
							<SelectTrigger className="border-0 text-brandDs gap-2">
								<SelectValue placeholder="kg" defaultValue={"kg"} />
							</SelectTrigger>
							<SelectContent className="min-w-fit text-brandPrimary">
								<SelectGroup className="">
									<SelectItem className="hover:bg-brandLsSecondary" value="pb">
										Pb
									</SelectItem>
									<SelectItem className="hover:bg-brandLsSecondary" value="kg">
										kg
									</SelectItem>
									<SelectItem className="hover:bg-brandLsSecondary" value="gm">
										gm
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>

				{errors[name] && (
					<p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
				)}
			</div>
		</>
	);
};

export default ProductInputWithSelectUnit;
