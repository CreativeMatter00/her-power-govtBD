import { api } from "@/api/api";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import ReplyInput from "./ReplyInput";

interface ReplyModalProps {
	question: any;
	onClose: () => void;
	refetch: any;
}

const ReplyModal: React.FC<ReplyModalProps> = ({
	question,
	onClose,
	refetch,
}) => {
	  const t=useTranslations("chat")

	// ================= USEFORM =================
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<any>();

	const onSubmit = async (data: any) => {
		try {
			const response: any = await api.put(
				`/api/admin/chat-with-seller/${question.chat_pid}`,
				data
			);

			if (response?.data?.meta?.status === true) {
				// ? Add to cart toast notification
				toast.success("Chat replied successfully!", {
					position: "bottom-left",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				refetch();
				onClose();
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			toast.error("Something went wrong", {
				position: "bottom-left",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};

	return (
		<div className="p-4 ">
			<h2 className="text-lg font-semibold mb-4 pb-2 border-b-2">
				{t("Answer this question")}
			</h2>
			<div className="flex gap-8">
				<div className="w-36">
					<Image
						src={question.producimg}
						height={200}
						width={200}
						className="h-36w-full rounded-md"
						alt={question.product_name}
					/>
					<p className="text-gray-700">{question?.review_content}</p>
				</div>

				<div className="w-full border rounded-md p-3 flex flex-col gap-6 bg-bgPrimary">
					{/* <div className="mb-4">
            <p className="font-medium">Query ID:</p>
            <p className="text-gray-700">{question.query_id}</p>
          </div>

          <div className="mb-4">
            <p className="font-medium">Product ID:</p>
            <p className="text-gray-700">{question.product_id}</p>
          </div> */}

					<div className="flex gap-2 items-center ">
						<div className="text-center text-[#646464] text-2xl bg-greySecondary px-2">
							{t("Q")}
						</div>
						<div>
							{question.customerfirstname} {question.customerfirstname} |{" "}
						</div>
						<div>
							{new Date(question.cre_date).toLocaleDateString("en-GB", {
								day: "numeric",
								month: "long",
								year: "numeric",
							})}
						</div>
					</div>

					<div className="text-gray-700 text-xl">{question.review_content}</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<ReplyInput
							inputType="text"
							placeholderText={t("Enter question answer")}
							name="reply_content"
							label={t("Write your reply")}
							errors={errors}
							register={register}
						/>
						<div className="flex justify-end">
							<button
								type="submit"
								className="bg-link hover:bg-linkHover text-white px-4 py-2 rounded-full  marker:transition flex items-center gap-3"
							>
								<FaArrowRight /> {t("Reply")}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ReplyModal;
