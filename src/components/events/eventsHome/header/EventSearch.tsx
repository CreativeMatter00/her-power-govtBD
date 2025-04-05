"use client";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

interface ISearchedEvent {
	searchedEvent: string;
}

const EventSearch = () => {
	// const t = useTranslations("SearchEvent");
	const local = useLocale();
	const router = useRouter();
	const { register, handleSubmit, reset } = useForm<ISearchedEvent>();
	const onSubmit = (data: ISearchedEvent) => {
		if (data.searchedEvent) {
			// console.log(data.searchedEvent);
			router.push(
				`/${local}/events/searched-events?eventName=${data.searchedEvent}`
			);
			reset();
		}
	};

	return (
		<div className="bg-bgSecondary">
			<div className="container mx-auto py-6">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col md:flex-row items-center gap-4 px-8">
						<input
							type="text"
							className="text-lg w-full md:w-4/5 rounded-full px-4 py-2 outline-none"
							placeholder="Search Products"
							{...register("searchedEvent")}
						/>

						<button
							type="submit"
							className="bg-brandDs w-auto md:w-1/5 rounded-full py-3 px-6 text-white"
						>
							Search
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EventSearch;
