import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import { FaCalendar } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";
import { FaEuroSign } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

interface projectToUpdate {
    name: string;
    description: string;
    dueDate: string;
    cost: number;
    storyPoints: number;
}

const ProjectDetails = () => {
    const { id } = useParams();
    const { token } = useSelector((state: RootState) => state.user);
    const [project, setProject] = useState<any>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const navigate = useNavigate();

    const [projectDetails, setProjectDetails] = useState<projectToUpdate>({
        name: "",
        description: "",
        dueDate: "",
        cost: 0,
        storyPoints: 0,
    });


    const updateProject = async () => {
        
        setError(null);
        setLoading(true);
        const url = BASE_URL + "update-project/" + id;
        const res = await fetch (url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(projectDetails)
        });
        const data = await res.json();
        if (data.success) {
            setEditing(false);
            fetchProject();
            setLoading(false);
        }
        else {
            setError(data.message);
            setLoading(false);
        }
    }

    const fetchProject = async () => {
        setError(null);
        const url = BASE_URL + id?.toString();
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        });
        const data = await res.json();
        if (data.success) {
            console.log(data.projects[0]);
            setProject(data.projects[0]);
        } else {
            setError(data.message);
        }
    };

    useEffect(() => {
        fetchProject();
    }, []);

    useEffect(() => {
        setProjectDetails({
            name: project?.name,
            description: project?.description,
            dueDate: project?.dueDate,
            cost: project?.cost,
            storyPoints: project?.storyPoints,
        });
    }, [project]);

    return (
        <div className="pt-[60px]">
            {error && (
                <div className="text-red-500 text-sm self-center">{error}</div>
            )}

            <div className="my-6 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-12 flex flex-col items-center justify-center gap-4">
                <div className="w-[90%] max-w-7xl min-h-[400px] border rounded-lg shadow-md mt-6 flex flex-col py-4 px-5 gap-6 relative">
                    <MdEdit
                        className="w-6 h-6 absolute top-2 right-2 hover:scale-125 duration-150 hover:cursor-pointer"
                        onClick={() => setEditing(!editing)}
                    />

                    {editing && (
                        <>
                            <input
                                type="text"
                                placeholder="Project Name"
                                value={projectDetails?.name}
                                onChange={(e) =>
                                    setProjectDetails({
                                        ...projectDetails,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full h-10 p-2 border-b-2 rounded-lg outline-none font-semibold text-2xl"
                            />

                            <div className="flex justify-between items-center w-[80%] text-slate-500">
                                <div className="flex gap-3 items-center">
                                    <FaCalendar />
                                    <input
                                        type="date"
                                        placeholder="Due Date"
                                        className="w-full h-10 p-2 border-b-2 rounded-lg outline-none "
                                        value={projectDetails?.dueDate}
                                        onChange={(e) =>
                                            setProjectDetails({
                                                ...projectDetails,
                                                dueDate: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex gap-3 items-center">
                                    <FaUser className="" />
                                    <span>Owner: {project?.owner.email}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center w-[80%] text-slate-500">
                                <div className="flex gap-3 items-center">
                                    <AiOutlineNumber />

                                    <input
                                        type="number"
                                        placeholder="Story Points"
                                        className="w-full h-10 p-2 border-b-2 rounded-lg outline-none "
                                        min={10}
                                        max={42}
                                        value={projectDetails?.storyPoints}
                                        onChange={(e) =>
                                            setProjectDetails({
                                                ...projectDetails,
                                                storyPoints: Number(
                                                    e.target.value
                                                ),
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex gap-3 items-center">
                                    <FaEuroSign className="" />

                                    <input
                                        type="number"
                                        placeholder="Cost"
                                        className="w-full h-10 p-2 border-b-2 rounded-lg outline-none "
                                        min={1000}
                                        max={10000}
                                        value={projectDetails?.cost}
                                        onChange={(e) =>
                                            setProjectDetails({
                                                ...projectDetails,
                                                cost: Number(e.target.value),
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <textarea
                                className="w-full min-h-[240px] p-2 border rounded-lg outline-none"
                                value={projectDetails?.description}
                                onChange={(e) =>
                                    setProjectDetails({
                                        ...projectDetails,
                                        description: e.target.value,
                                    })
                                }
                            />

                            <button className="w-40 bg-black text-white py-2 px-4 rounded-lg hover:scale-105 duration-200 self-center" onClick={updateProject}>
                                {loading ? "Updating.." : "Update"}
                            </button>
                            {error && <div className="text-red-500 text-sm self-center">{error}</div>}
                        </>
                    )}

                    {!editing && (
                        <>
                            <h1 className="text-2xl font-semibold">
                                {project?.name}
                            </h1>

                            <div className="flex justify-between items-center w-[80%] text-slate-500">
                                <div className="flex gap-3 items-center">
                                    <FaCalendar />
                                    <span>{project?.dueDate}</span>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <FaUser className="" />
                                    <span>Owner: {project?.owner.email}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center w-[80%] text-slate-500">
                                <div className="flex gap-3 items-center">
                                    <AiOutlineNumber />
                                    <span>
                                        {project?.storyPoints} Story Points
                                    </span>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <FaEuroSign className="" />
                                    <span>{project?.cost}</span>
                                </div>
                            </div>

                            <p style={{ whiteSpace: "pre-wrap" }}>{project?.description}</p>
                        </>
                    )}

                </div>

                <button 
                    className="bg-black text-white p-2 rounded-lg hover:scale-105 duration-150" 
                    onClick={() => navigate("/projects/" + id + "/tasks")}
                >
                    Open Tasks Board
                </button>
            </div>
        </div>
    );
};

export default ProjectDetails;
