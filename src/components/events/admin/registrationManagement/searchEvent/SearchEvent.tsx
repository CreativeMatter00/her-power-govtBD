import { FiSearch } from "react-icons/fi";
import { useForm } from "react-hook-form";

const SearchEvent = ({ onSearch }:any) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data:any) => {
    onSearch(data.searchTerm); // Call the search handler with the input term
  };

  return (
    <section className="my-12 w-full">
      <h1 className="text-sm text-greyPrimary font-bold">Search Event</h1>
      <div className="w-1/2 mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between border border-brandDs rounded-full bg-brandLsSecondary w-full p-1">
            <input
              type="text"
              {...register("searchTerm")}
              placeholder="Search for events"
              className="w-full px-6 bg-transparent rounded-full outline-none"
            />
            <button type="submit" className="bg-brandDs rounded-full p-2">
              <FiSearch className="text-bgSecondary w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchEvent;
