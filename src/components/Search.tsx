import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <div className="sm:mx-2 mt-4 w-full flex flex-col mx-auto">
      <h1 className="text-xl mb-2">Search & Filters</h1>

      <div className="flex items-center border rounded-md py-1 px-1 gap-2 w-[90%]">
        <IoSearch className="text-gray-600" />
        <input
          type="text"
          placeholder="Seach projects.."
          className="outline-none"
        />
      </div>

      <div className="flex flex-col mt-3">
        <h2 className="text-l">Due Date</h2>
        <div className="w-[90%] border p-1 rounded-md">
          <input
            type="date"
            className="outline-none w-full px-2 [&::-webkit-calendar-picker-indicator]:ml-auto cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
