import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Tasks = () => {
    const { token } = useSelector((state: RootState) => state.user);
    const { id } = useParams();

    const fetchtasks = async () => {
        const url = BASE_URL + id?.toString() + "/tasks";
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        console.log(data);
    };

    useEffect(() => {
        fetchtasks();
    }, []);

    return (
        <div className="pt-[60px]">
            <div className="my-6 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-12 flex flex-col items-center justify-center gap-4">

                {/* Add Task */}
                <div className="flex flex-col w-full max-w-7xl min-h-[500px] border shadow-md rounded-lg gap-4 ">
                    
                    <div className="flex flex-col gap-1 mx-4 mt-4 mb-2">
                        <h1 className="text-2xl font-semibold">Kanban Board</h1>
                        <span className="text-sm text-gray-500">Organize your tasks efficiently</span>
                    </div>

                    <hr />

                    <div className="flex flex-col self-center w-[30rem] gap-4 mb-10">
                        <input type="text" placeholder="Task title.." className="border rounded-lg outline-none p-2 w-full shadow-md" />
                        <textarea name="" id="" placeholder="Task description.." className="border rounded-lg outline-none p-2 w-full shadow-md"></textarea>

                        <div 
                            className="bg-black text-white p-2 rounded-lg hover:scale-105 duration-300 flex items-center justify-center gap-2 cursor-pointer"
                            onClick={() => console.log("Add Task")}
                        >
                            <AiOutlinePlusCircle />
                            Add Task
                        </div>
                    </div>


                </div>

                {/* Kanban Board */}
                <div className="flex flex-col sm:flex-row  w-full justify-center items-center gap-4">
                    <div className="min-w-[400px] min-h-[500px] border shadow-md rounded-md  p-4">
                        <h1 className="text-xl font-semibold pb-2">Backlog</h1>
                        <hr />
                    </div>
                    <div className="min-w-[400px] min-h-[500px] border shadow-md rounded-md  p-4">
                        <h1 className="text-xl font-semibold pb-2">Doing</h1>
                        <hr />
                    </div>
                    <div className="min-w-[400px] min-h-[500px] border shadow-md rounded-md  p-4">
                        <h1 className="text-xl font-semibold pb-2">Done</h1>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tasks;
