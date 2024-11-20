import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

interface AddProjectProps {
    setAddProjectVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface project {
    name: string;
    description: string;
    dueDate: string;
    cost: number;
    storyPoints: number;
}

const AddProject: React.FC<AddProjectProps> = ({ setAddProjectVisible }) => {

    const { token } = useSelector((state: RootState) => state.user);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState<project>({
        name: '',
        description: '',
        dueDate: '',
        cost: 0,
        storyPoints: 0
    });

    const createProject = async () => {

        setError(null);
        setLoading(true);
        const url: string = BASE_URL + "create-project"; 
        const res = await fetch (url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify(project)
        });
        const data = await res.json();
        if (data.success) {
            setProject({name: '', description: '', dueDate: '', cost: 0, storyPoints: 0});
            setAddProjectVisible(false);
            setLoading(false);
        }
        else {
            setError(data.message);
            setLoading(false);
        }
        console.log(data);
    }


    return (
        <div className="w-full min-h-[400px] flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-xl font-semibold">Create new Project</h1>

            <div>
                <input
                    type="text"
                    placeholder="Project Name"
                    className="w-full h-10 p-2 border rounded-lg outline-none "
                    value={project?.name}
                    onChange={(e) => setProject({...project, name: e.target.value})}
                />
            </div>

            <div>
                <textarea
                    placeholder="Project Description"
                    className="w-full h-[240px] p-2 border rounded-lg outline-none "
                    value={project?.description}
                    onChange={(e) => setProject({...project, description: e.target.value})}
                />
            </div>

            <div className="flex gap-4">
                <input
                    type="date"
                    placeholder="Due Date"
                    className="w-full h-10 p-2 border rounded-lg outline-none "
                    value={project?.dueDate}
                    onChange={(e) => setProject({...project, dueDate: e.target.value})}
                />
                <input
                    type="number"
                    placeholder="Cost"
                    className="w-full h-10 p-2 border rounded-lg outline-none "
                    min={1000}
                    max={10000}
                    value={project?.cost}
                    onChange={(e) => setProject({...project, cost: Number(e.target.value)})}
                />
                <input
                    type="number"
                    placeholder="Story Points"
                    className="w-full h-10 p-2 border rounded-lg outline-none "
                    min={10}
                    max={36}
                    value={project?.storyPoints}
                    onChange={(e) => setProject({...project, storyPoints: Number(e.target.value)})}
                />
            </div>

            {error && <div className="text-red-500 text-sm self-center">{error}</div>}

            <div className="flex justify-end gap-4">
                <button 
                    className="border-[1px] border-black text-black py-2 px-4 rounded-lg hover:scale-105 duration-200" 
                    onClick={() => setAddProjectVisible(false)}
                >Cancel
                </button>
                <button 
                    className="bg-black text-white py-2 px-4 rounded-lg hover:scale-105 duration-200" 
                    onClick={createProject}
                    disabled={loading}
                > 
                    {loading ? "Creating.." : "Create"}
                </button>
            </div>
        </div>
    );
};

export default AddProject;

