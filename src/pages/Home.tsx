import Search from "../components/Search";
import ProjectCard from "../components/ProjectCard";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import AddProject from "../components/AddProject";

const Home = () => {
    const { token } = useSelector((state: RootState) => state.user);
    const [projects, setProjects] = useState<any[]>([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [addProjectVisible, setAddProjectVisible] = useState(false);

    const fetchProjects = async () => {
        setError(null);
        setLoading(true);
        const url = BASE_URL;
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (data.success) {
            console.log(data.projects);
            setProjects(data.projects);
            setLoading(false);
        } else {
            setError(data.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="h-screen w-full flex flex-col sm:flex-row pt-[60px]">
            {/* Fixed Search sidebar */}
            <div
                id="1"
                className="w-[300px] sm:w-[250px] md:w-[300px] lg:w-[400px] sm:border-r fixed h-screen top-[60px]"
            >
                <Search
                    setProjects={setProjects}
                    fetchProjects={fetchProjects}
                    setError={setError}
                />
            </div>

            {/* Scrollable content area with offset */}
            <div
                id="2"
                className="w-full sm:ml-[250px] md:ml-[300px] lg:ml-[400px] min-h-screen overflow-y-auto"
            >
                <div className="my-6 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-12">
                    <div className="flex items-center justify-between w-full mb-8">
                        <h1 className="text-3xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 text-transparent bg-clip-text">
                            Project Wise
                        </h1>
                        <button
                            className="bg-black text-white py-2 px-4 rounded-xl"
                            onClick={() => setAddProjectVisible(true)}
                        >
                            + New Project
                        </button>
                    </div>

                    {/* Add Project Component */}
                    {addProjectVisible && (
                        <AddProject
                            setAddProjectVisible={setAddProjectVisible}
                            fetchProjects={fetchProjects}
                        />
                    )}

                    {/* Projects */}
                    {loading && (
                        <div className="flex justify-center items-center">
                            Loading...
                        </div>
                    )}
                    {error && (
                        <div className="flex justify-center items-center">
                            Error: {error}
                        </div>
                    )}
                    {!error && !loading && (
                        <div className="flex flex-wrap gap-8 mt-8">
                            {projects.map((project: any, id: number) => {
                                return (
                                    <ProjectCard
                                        key={id}
                                        {...project}
                                        fetchProjects={fetchProjects}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
