"use client";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
// import { PiMapPinArea } from "react-icons/pi";

interface SearchForm {
	search: string;
}

const SearchBar = () => {
	const t = useTranslations("Events");
	const { register, handleSubmit, reset } = useForm<SearchForm>();
	const local = useLocale();
	const router = useRouter();
	const onSubmit = (data: SearchForm) => {
		// console.log(data.search);
		if (data.search) {
			router.push(
			`/${local}/events/searched-events?search=${data.search}`
			);
			reset();
		}
	};
	return (
		// <div className="flex justify-between max-md:gap-2 divide-x divide-greyPrimary bg-bgPrimary text-greyPrimary text-base font-normal rounded-full max-md:px-4 px-6 py-2 w-full">
		<div>
			{/* ==================================== SEARCH EVENTS ================================= */}
			{/* ================================== WILL HAVE A MODAL =============================== */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex justify-between max-md:gap-2 divide-x divide-brandPrimary bg-bgPrimary text-greyPrimary text-base font-normal rounded-full w-full">
					<div className="flex items-center gap-2 max-md:px-4 px-6 py-2 w-full">
						<FiSearch className="w-6 h-6" />
						{/* <h1>Search Events</h1>{" "} */}
						<input
							type="text"
							{...register("search")}
							placeholder={t("SearchPlaceholder")}
							className="w-full outline-none text-black"
						/>
					</div>

					<div className=" ">
						<button
							type="submit"
							className="w-48 bg-brandPrimary text-white py-2 rounded-r-full font-medium text-lg hover:bg-brandHover"
						>
							{t("Search")}
						</button>
					</div>
				</div>
			</form>
			{/* ================================ LOCATION ================================ */}
			{/* ============================= WILL HAVE A MODAL ====================================== */}
			{/* <div className="flex items-center gap-2 max-md:pl-2 pl-4">
				 <PiMapPinArea className="w-5 h-5" />
				 <h1>Dhaka not</h1>{" "}
			 </div> */}
		</div>
	);
};

export default SearchBar;
