import { FaCalendar } from "react-icons/fa";
import { FaEuroSign } from "react-icons/fa";
import { MdNumbers } from "react-icons/md";
import { MdDelete } from "react-icons/md";


interface ProjectCardProps {
  name: string;
  description: string;
  dueDate: string;
  cost: number;
  storyPoints: number;
}


const ProjectCard: React.FC<ProjectCardProps> = (
  {name, description, dueDate, cost, storyPoints}
) => {
  return (
    <div className="w-[400px] h-[350px] border rounded-lg shadow-md flex flex-col gap-4 py-4 px-4 hover:cursor-pointer relative">

      <MdDelete className="w-6 h-6 absolute top-6 right-2 hover:scale-150 duration-150"/>

      <h1 className="text md:text-xl font-semibold">
        {name}
      </h1>

      <p className="line-clamp-6 text-slate-500">
        {description}
      </p>


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
