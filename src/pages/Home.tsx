import Search from "../components/Search";
import ProjectCard from "../components/ProjectCard";

const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col sm:flex-row">
      {/* Fixed Search sidebar */}
      <div id="1" className="w-[300px] sm:w-[250px] md:w-[300px] lg:w-[400px] sm:border-r fixed h-screen">
        <Search />
      </div>

      {/* Scrollable content area with offset */}
      <div id="2" className="w-full sm:ml-[250px] md:ml-[300px] lg:ml-[400px] min-h-screen overflow-y-auto">
        <div className="m-6">
          <div className="flex items-center justify-between w-full mb-8">
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 text-transparent bg-clip-text">
              Project Wise
            </h1>
            <button className="bg-black text-white py-2 px-4 rounded-xl">
              + New Project
            </button>
          </div>
          
          {/* Projects */}
          <div className="flex flex-wrap gap-8">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;