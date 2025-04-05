import { UseFormRegister } from "react-hook-form";

interface CandidateInputFieldInfo {
	inputType: string;
	inputName: string;
	placeholderText: string;
	error: any;
	register: UseFormRegister<any>;
}
const CourseEnrollInput: React.FC<CandidateInputFieldInfo> = ({
	inputType,
	inputName,
	placeholderText,
	error,
	register,
}) => {
	return (
		<>
			<div>
				<input
					type={inputType}
					placeholder={placeholderText}
					{...register(inputName)}
					className="w-full outline-none border-b border-[#252525] bg-transparent placeholder:text-[#252525] text-base px-2 py-1"
				/>
				{error[inputName] && (
					<p className="text-red-500 text-sm pl-3 mt-1">
						{error[inputName]?.message}
					</p>
				)}
			</div>
		</>
	);
};

export default CourseEnrollInput;
