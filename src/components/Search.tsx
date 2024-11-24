import { Dispatch, SetStateAction, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BASE_URL } from "../utils/constants";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

interface SearchProps {
    setProjects: Dispatch<SetStateAction<any[]>>;
    setError: Dispatch<SetStateAction<string | null>>;
    fetchProjects: () => void;
}

const Search: React.FC<SearchProps> = ({
    setProjects,
    setError,
    fetchProjects,
}) => {
    const { token } = useSelector((state: RootState) => state.user);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [dueDate, setDueDate] = useState<string>("");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const url =
            BASE_URL + "?searchTerm=" + searchTerm + "&dueDate=" + dueDate;
        console.log(url);
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        });

        const data = await res.json();
        console.log(data);
        if (data.success) {
            setProjects(data.projects);
        } else {
            setError(data.message);
        }
    };

    return (
        <form className="sm:mx-2 mt-4 w-full flex flex-col mx-auto" onSubmit={handleSearch}>
            <h1 className="text-xl mb-2">Search & Filters</h1>

            <div className="flex items-center border rounded-md py-1 px-1 gap-2 w-[90%]">
                <IoSearch className="text-gray-600" />
                <input
                    type="text"
                    placeholder="Seach projects.."
                    className="outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex flex-col mt-3">
                <h2 className="text-l">Due Date</h2>
                <div className="w-[90%] border p-1 rounded-md">
                    <input
                        type="date"
                        className="outline-none w-full px-2 [&::-webkit-calendar-picker-indicator]:ml-auto cursor-pointer"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
            </div>

            <button
                className="bg-black text-white p-2 rounded-lg hover:scale-105 duration-200 w-48 m-2 self-center"
                type="submit"
            >
                Search
            </button>
        </form>
    );
};

export default Search;
