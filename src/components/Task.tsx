import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useState, useEffect } from "react";


interface Task {
    id?: number;
    name: string;
    description: string;
    status: string;
}

interface TaskProps {
  taskId?: number;
  name: string;
  description: string;
  status: string;
  fetchtasks: () => void;
}

const TaskCard: React.FC<TaskProps> = ({
  taskId,
  name: initialName,
  description: initialDescription,
  status: initialStatus,
  fetchtasks
}) => {
  const { token } = useSelector((state: RootState) => state.user);
  const { id } = useParams();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [localName, setLocalName] = useState<string>(initialName);
  const [localDescription, setLocalDescription] = useState<string>(initialDescription);
  const [localStatus, setLocalStatus] = useState<string>(initialStatus);

  //   ------------------------------------------------------------------------------

  const deleteTask = async () => {
    const url = BASE_URL + id?.toString() + "/tasks/delete-task/" + taskId;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      fetchtasks();
    } else {
      setError(data.message);
      console.log(data.message);
    }
  };

  //   ------------------------------------------------------------------------------

  const handleUpdate = async () => {
    setError(null);
    setLoading(true);
    // /api/projects/{projectId}/tasks/update-task/{taskId}
    const url = BASE_URL + id + "/tasks/update-task/" + taskId;
    const task: Task = {
      name: localName,
      description: localDescription,
      status: localStatus,
    };

    console.log("task", task);
    console.log("name, description, status: ", localName, localDescription, localStatus);

    const res = await fetch (url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(task),
    })

    const data = await res.json();
    console.log(data);
    if (data.success) {
        setLoading(false);
        fetchtasks();
        setIsEditModalOpen(false);
    } else {
        setLoading(false);
        setError(data.message);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 p-4 w-full shadow-sm rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">{localName}</h1>

          <div className="flex gap-2">
            <MdModeEdit
              className="w-4 h-4 hover:scale-150 duration-150 cursor-pointer"
              onClick={() => setIsEditModalOpen(true)}
            />
            <MdDelete
              className="w-4 h-4 hover:scale-150 duration-150"
              onClick={deleteTask}
            />
          </div>
        </div>
        <p className="text-sm whitespace-pre-wrap line-clamp-3">
          {localDescription}
        </p>
        {error && (
          <div className="text-red-500 text-sm self-center">{error}</div>
        )}
      </div>

      {/* Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[600px]">
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col w-full gap-4 items-center self-center">
                <input
                  type="text"
                  placeholder="Task name.."
                  className="p-2 border outline-none rounded-md w-full"
                  value={localName}
                  onChange={(e) => setLocalName(e.target.value)}
                  required
                />

                <textarea
                  placeholder="Task description..."
                  className="p-2 border outline-none rounded-md w-full min-h-[400px]"
                  value={localDescription}
                  onChange={(e) => setLocalDescription(e.target.value)}
                  required
                />

                <div className="self-start w-full">
                  <h2 className="mb-2">Status: </h2>
                  <select
                    className="p-2 border outline-none rounded-md w-full"
                    value={localStatus}
                    onChange={(e) => setLocalStatus(e.target.value)}
                    required
                  >
                    <option value="BACKLOG">Backlog</option>
                    <option value="DOING">Doing</option>
                    <option value="DONE">Done</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center gap-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-black text-white rounded-md"
                  onClick={handleUpdate}
                >
                  Save
                </button>
              </div>

              {error && (
                <span className="text-sm text-red-600 m-2">{error}</span>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
