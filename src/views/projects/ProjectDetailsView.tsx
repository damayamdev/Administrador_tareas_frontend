import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFullProject } from "@/services/ProjectAPI";
import Spinner from "@/components/spinner/Spinner";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useMemo } from "react";

const ProjectDetailsView = () => {
  const { data: user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getFullProject(projectId),
    retry: false,
  });
  const conEdit = useMemo(() => data?.manager === user?._id, [data, user])

  return (
    <>
      {isLoading && authLoading && (
        <div className="w-full flex items-center justify-center relative">
          <Spinner />
        </div>
      )}
      {isError && <Navigate to="/404" />}
      {data && user && (
        <>
          <h1 className="text-5xl font-black">{data.projectName}</h1>
          <p className="text-2xl font-light text-gray-500 mt-5">
            {data.description}
          </p>
          {isManager(data.manager, user._id) && (
            <nav className="mt-5 flex gap-3">
              <button
                onClick={() => navigate(location.pathname + "?newTask=true")}
                type="button"
                className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
              >
                Agregar Tarea
              </button>
              <Link
                to={"team"}
                className="bg-purple-600 hover:bg-purple-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
              >
                Colaboradores
              </Link>
            </nav>
          )}

          <TaskList tasks={data.tasks} conEdit={conEdit} />
          <AddTaskModal />
          <EditTaskData />
          <TaskModalDetails />
        </>
      )}
    </>
  );
};

export default ProjectDetailsView;
