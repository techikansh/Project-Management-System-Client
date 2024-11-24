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
import { IoMdPersonAdd } from "react-icons/io";
import { MdCancel } from "react-icons/md";

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
    const [displayAddMember, setDisplayAddMember] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [emails, setEmails] = useState<string[]>([]);
    const [isSelectingEmail, setIsSelectingEmail] = useState<boolean>(false);

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
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(projectDetails),
        });
        const data = await res.json();
        if (data.success) {
            setEditing(false);
            fetchProject();
            setLoading(false);
        } else {
            setError(data.message);
            setLoading(false);
        }
    };

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
            setProject(data.projects[0]);
        } else {
            setError(data.message);
        }
    };

    const fetchEmails = async () => {
        const url = BASE_URL + "fetch-emails";
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(email),
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
            setEmails(data.emails);
        } else {
            setError(data.message);
        }
    };

    const addMember = async () => {
        const url = BASE_URL + "add-member/" + id;
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                email: email,
            }),
        });
        const data = await res.json();
        if (data.success) {
            fetchProject();
            console.log(project.members);
        } else {
            setError(data.message);
        }
    };

    const removeMember = async (email: string) => {
        const url = BASE_URL + "delete-member/" + id;
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                email: email,
            }),
        });
        const data = await res.json();
        if (data.success) {
            fetchProject();
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

    useEffect(() => {
        if (email.length >= 3 && isSelectingEmail == false) {
            fetchEmails();
        }
    }, [email]);

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

                            <button
                                className="w-40 bg-black text-white py-2 px-4 rounded-lg hover:scale-105 duration-200 self-center"
                                onClick={updateProject}
                            >
                                {loading ? "Updating.." : "Update"}
                            </button>
                            {error && (
                                <div className="text-red-500 text-sm self-center">
                                    {error}
                                </div>
                            )}
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

                            <p style={{ whiteSpace: "pre-wrap" }}>
                                {project?.description}
                            </p>
                        </>
                    )}
                </div>

                <div className="w-[90%] max-w-7xl flex items-center gap-4">
                    <h1 className="text-2xl font-semibold">Project Members</h1>

                    <button
                        className="bg-black text-white p-2 rounded-lg hover:scale-105 duration-150 ml-auto flex items-center gap-2"
                        onClick={() => setDisplayAddMember(!displayAddMember)}
                    >
                        <IoMdPersonAdd />
                        Add Members
                    </button>
                </div>

                {displayAddMember && (
                    <div className="w-[88%] max-w-7xl h-40 flex flex-col items-center gap-4 shadow-md rounded-lg p-4">
                        <div className="flex flex-col gap-2 self-start w-full relative">
                            <h2 className="text-lg self-start">Email</h2>
                            <div className="w-full h-10 border rounded-lg p-2 flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter email.."
                                    className="w-full outline-none"
                                    value={email}
                                    onChange={(e) => {
                                        setIsSelectingEmail(false);
                                        setEmail(e.target.value);
                                    }}
                                />

                                <MdCancel
                                    className="text-lg hover:scale-125 duration-150 cursor-pointer"
                                    onClick={() => {
                                        setIsSelectingEmail(false);
                                        setEmail("");
                                        setEmails([]);
                                    }}
                                />
                            </div>

                            {emails && (
                                <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg top-full max-h-48 overflow-y-auto z-10 left-0">
                                    {emails.map((emailItem, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                                                onClick={() => {
                                                    setIsSelectingEmail(true);
                                                    setEmail(emailItem);
                                                    setEmails([]);
                                                }}
                                            >
                                                {emailItem}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2 self-end">
                            <button
                                className="border border-black p-2 rounded-lg hover:scale-105 duration-200"
                                onClick={() => setDisplayAddMember(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-black text-white p-2 rounded-lg hover:scale-105 duration-200"
                                onClick={addMember}
                            >
                                Add Member
                            </button>
                        </div>
                    </div>
                )}

                <div className="w-[90%] max-w-7xl flex flex-col items-center gap-2">
                    {project?.members &&
                        project?.members.length > 0 &&
                        project.members.map((member: any, index: number) => (
                            <div
                                key={index}
                                className="w-full border p-2 rounded-lg flex items-center"
                            >
                                <h2 className="text-lg ">{member.email}</h2>
                                <MdCancel
                                    className="ml-auto text-xl hover:scale-105 duration-150 cursor-pointer"
                                    onClick={() => removeMember(member.email)}
                                />
                            </div>
                        ))}
                </div>

                <div className="flex gap-4 items-center">
                    <button
                        className="border p-2 rounded-lg flex items-center gap-2 hover:scale-105 duration-150 hover:border-black"
                        onClick={() => {
                            window.open("https://meet.google.com/new")
                        }}
                    >
                        <img
                            src="https://img.icons8.com/?size=100&id=pE97I4t7Il9M&format=png&color=000000"
                            alt="googleIcon"
                            className="w-6 h-6"
                        />
                        Start Google Meet
                    </button>

                    <button
                        className="bg-black text-white p-2 rounded-lg hover:scale-105 duration-150"
                        onClick={() => navigate("/projects/" + id + "/tasks")}
                    >
                        Open Tasks Board
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
