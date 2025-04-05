"use client"
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

const SearchCourse = () => {
const [searchValue,setSearchValue]=useState("")
	const t = useTranslations("ShopNowHome");
	const locale = useLocale();
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	  };
	return (
		<div className="">
			<div className="container mx-auto">
				<div className="flex items-center flex-col md:flex-row gap-2 md:gap-8 py-8 ">
					<input
						type="text"
						onChange={handleInputChange}
						placeholder={t("searchPlaceholder")+"..."}
						className="my-6 py-2 px-4 text-xl flex-grow rounded-full w-full bg-white border border-brandPrimary"
					/>
					<Link href={`/${locale}/course/search-results?searchQuery=${searchValue}`}>
						<button className="w-48 bg-[#9839C2] text-white py-2 rounded-full font-medium text-lg hover:bg-brandHover">
							{t("search")}
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SearchCourse;
