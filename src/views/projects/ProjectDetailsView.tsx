import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/services/ProjectAPI";
import Spinner from "@/components/spinner/Spinner";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";

const ProjectDetailsView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  return (
    <>
      {isLoading && (
        <div className="w-full flex items-center justify-center relative">
          <Spinner />
        </div>
      )}
      {isError && <Navigate to="/404" />}
      {data && (
        <>
          <h1 className="text-5xl font-black">{data.data.projectName}</h1>
          <p className="text-2xl font-light text-gray-500 mt-5">
            {data.data.description}
          </p>
          <nav className="mt-5 flex gap-3">
            <button
              onClick={() => navigate(location.pathname + "?newTask=true")}
              type="button"
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            >
              Agregar Tarea
            </button>
          </nav>
          <TaskList tasks={data.data.tasks} />
          <AddTaskModal />
          <EditTaskData />
          <TaskModalDetails />
        </>
      )}
    </>
  );
};

export default ProjectDetailsView;
