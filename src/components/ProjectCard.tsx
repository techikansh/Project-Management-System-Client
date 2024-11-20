import { FaCalendar } from "react-icons/fa";
import { FaEuroSign } from "react-icons/fa";
import { MdNumbers } from "react-icons/md";


const ProjectCard = () => {
  return (
    <div className="w-[400px] h-[350px] border rounded-lg shadow-md flex flex-col gap-4 py-4 px-4">

      <h1 className="text-2xl font-semibold">
        Real Estate Platform (Immobilieinmarkt)
      </h1>

      <p className="line-clamp-6 text-slate-500">
        This project involves the development of a comprehensive real estate
        platform designed to facilitate seamless interactions between property
        buyers, sellers, and real estate agents. The platform features an
        intuitive user interface built with React.js, ensuring a responsive and
        interactive experience for users.
      </p>


        <div className="flex flex-col gap-2 text-slate-800 text-sm">
            <div className="flex items-center gap-3">
                <FaCalendar />
                <span>22.11.2024</span>
            </div>

            <div className="flex items-center gap-3">
                <FaEuroSign />
                <span>6700</span>
            </div>

            <div className="flex items-center gap-3">
                <MdNumbers />
                <span>13 Story Points</span>
            </div>
        </div>


    </div>
  );
};

export default ProjectCard;
