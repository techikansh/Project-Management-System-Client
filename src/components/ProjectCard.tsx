import { FaCalendar } from "react-icons/fa";
import { FaEuroSign } from "react-icons/fa";
import { MdNumbers } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    cost: number;
    storyPoints: number;
    fetchProjects: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    id,
    name,
    description,
    dueDate,
    cost,
    storyPoints,
    fetchProjects,
}) => {
    const { token } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const deleteProject = async () => {
        const url = BASE_URL + "delete-project/" + id;
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        const data = await res.json();
        if (data.success) {
            fetchProjects();
        } else {
            alert(data.message);
            console.log(data.message);
        }
    };

    return (
        <div
            className="w-[400px] h-[350px] border rounded-lg shadow-md flex flex-col gap-4 py-4 px-4 hover:cursor-pointer relative"
            onClick={() => navigate(`/projects/${id}`)}
        >
            <MdDelete
                className="w-6 h-6 absolute top-6 right-2 hover:scale-150 duration-150"
                onClick={(e) => {
                    e.stopPropagation(); // Stop event from bubbling up
                    deleteProject();
                }}
            />

            <h1 className="text md:text-xl font-semibold">{name}</h1>

            <p className="line-clamp-6 text-slate-500">{description}</p>

            <div className="flex flex-col gap-2 text-slate-800 text-sm">
                <div className="flex items-center gap-3">
                    <FaCalendar />
                    <span>{dueDate}</span>
                </div>

                <div className="flex items-center gap-3">
                    <FaEuroSign />
                    <span>{cost}</span>
                </div>

                <div className="flex items-center gap-3">
                    <MdNumbers />
                    <span>{storyPoints} Story Points</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
