import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/services/ProjectAPI";
import Spinner from "@/components/spinner/Spinner";
import EditProjectForm from "@/components/projects/EditProjectForm";

const EditProjectView = () => {
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["editProject", projectId],
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
      {
        isError && <Navigate to='/404' />
      }
      {
        data && <EditProjectForm  data={data}/>
      }
    </>
  );
};

export default EditProjectView;
