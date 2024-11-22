import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import TaskCard from "../components/Task";

interface Task {
  id?: number;
  name: string;
  description: string;
  status: string;
}

const Tasks = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const { id } = useParams();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [backlogTasks, setBacklogTasks] = useState<Task[]>([]);
  const [doingTasks, setDoingTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const addTask = async () => {
    setError(null);
    setLoading(true);
    const task: Task = {
      name: name,
      description: description,
      status: "BACKLOG",
    };

    const url = BASE_URL + id + "/tasks/create-task";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    if (data.success) {
      setLoading(false);
      fetchtasks();
    } else {
      setLoading(false);
      setError(data.message);
    }
  };

  // const updateTask = async (taskId: number | undefined) => {

  //     setError(null);
  //     setLoading(true);
  //     // /api/projects/{projectId}/tasks/update-task/{taskId}
  //     const url = BASE_URL + id + "/tasks/update-task/" + taskId;
  //     const task: Task = {
  //         name: name,
  //         description: description,
  //         status: status
  //     };

  //     console.log(task);
  //     // const res = await fetch (url, {
  //     //     method: "PUT",
  //     //     headers: {
  //     //         "Content-Type": "application/json",
  //     //         Authorization: "Bearer " + token,
  //     //     },
  //     //     body: JSON.stringify(task),
  //     // })
  //     // const data = await res.json();
  //     // if (data.success) {
  //     //     setLoading(false);
  //     //     fetchtasks();
  //     // } else {
  //     //     setLoading(false);
  //     //     setError(data.message);
  //     // }

  // }

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
    if (data.success) {
      setTasks(data.tasks);
    }
  };

  useEffect(() => {
    fetchtasks();
  }, []);

  useEffect(() => {
    setBacklogTasks(tasks?.filter((task) => task.status == "BACKLOG") || []);
    setDoingTasks(tasks?.filter((task) => task.status == "DOING") || []);
    setDoneTasks(tasks?.filter((task) => task.status == "DONE") || []);
  }, [tasks]);

  return (
    <div className="pt-[60px]">
      <div className="my-6 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-12 flex flex-col items-center justify-center gap-4">
        {/* Add Task */}
        <div className="flex flex-col w-full max-w-7xl min-h-[400px] border shadow-md rounded-lg gap-4 ">
          <div className="flex flex-col gap-1 mx-4 mt-4 mb-2">
            <h1 className="text-2xl font-semibold">Kanban Board</h1>
            <span className="text-sm text-gray-500">
              Organize your tasks efficiently
            </span>
          </div>

          <hr />

          <div className="flex flex-col self-center w-[30rem] gap-4 mb-10">
            <input
              type="text"
              placeholder="Task title.."
              className="border rounded-lg outline-none p-2 w-full shadow-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              name=""
              id=""
              placeholder="Task description.."
              className="border rounded-lg outline-none p-2 w-full shadow-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div
              className="bg-black text-white p-2 rounded-lg hover:scale-105 duration-300 flex items-center justify-center gap-2 cursor-pointer"
              onClick={addTask}
            >
              <AiOutlinePlusCircle />
              {loading ? "Adding..." : "Add Task"}
            </div>

            {error && (
              <span className="text-red-500 text-sm self-center">{error}</span>
            )}
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex flex-col md:flex-row  w-full justify-center items-center gap-4">
          <div className="w-[400px] min-h-[500px] border shadow-md rounded-md shrink-0">
            <h1 className="text-xl font-semibold pb-2 p-4">Backlog</h1>
            <hr />
            {backlogTasks?.map((task, index) => (
              <div className="p-2" key={index}>
                <TaskCard
                  taskId={task.id}
                  name={task.name}
                  description={task.description}
                  status={task.status}
                  fetchtasks={fetchtasks}
                />
              </div>
            ))}
          </div>
          <div className="min-w-[400px] min-h-[500px] border shadow-md rounded-md">
            <h1 className="text-xl font-semibold pb-2 p-4">Doing</h1>
            <hr />
            {doingTasks?.map((task, index) => (
              <div className="p-2" key={index}>
                <TaskCard
                  taskId={task.id}
                  name={task.name}
                  description={task.description}
                  status={task.status}
                  fetchtasks={fetchtasks}
                />
              </div>
            ))}
          </div>
          <div className="min-w-[400px] min-h-[500px] border shadow-md rounded-md">
            <h1 className="text-xl font-semibold pb-2 p-4">Done</h1>
            <hr />
            {doneTasks?.map((task, index) => (
              <div className="p-2" key={index}>
                <TaskCard
                  taskId={task.id}
                  name={task.name}
                  description={task.description}
                  status={task.status}
                  fetchtasks={fetchtasks}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
