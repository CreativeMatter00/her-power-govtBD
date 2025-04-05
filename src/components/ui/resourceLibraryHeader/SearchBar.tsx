"use client";
import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";

interface SearchForm {
  search: string;
}

const SearchBar = () => {
  const { register, handleSubmit, reset } = useForm<SearchForm>();
  const local = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchName = searchParams.get("search");
  const onSubmit = (data: SearchForm) => {
    // console.log(data.search);
    if (data.search) {
      router.push(`/${local}/career/search?search=${data.search}`);
      reset();
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between max-md:gap-2 divide-x divide-brandPrimary bg-bgPrimary text-greyPrimary text-base font-normal rounded-full w-full">
          <div className="flex items-center gap-2 max-md:px-4 px-6 py-2 w-full">
            <FiSearch className="w-6 h-6" />
            <input
              type="text"
              {...register("search")}
              defaultValue={searchName || ''}
              placeholder="Search career"
              className="w-full outline-none bg-white text-black"
            />
          </div>
          <div className=" ">
            <button
              type="submit"
              className="w-48 bg-brandPrimary text-white py-2 rounded-r-full font-medium text-lg hover:bg-brandHover"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};


export default SearchBar;