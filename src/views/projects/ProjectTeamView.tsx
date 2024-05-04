import AddMemberModal from "@/components/team/AddMemberModal";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjectTeam, removeUserFromProject } from "@/services/TeamAPI";
import Spinner from "@/components/spinner/Spinner";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react/jsx-runtime";
import { toast } from "react-toastify";
import { TeamMember } from "@/types/index";

const ProjectTeamView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { isLoading, isError, data } = useQuery({
    queryKey: ["projectTeam", projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false,
  });

  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn:removeUserFromProject,
    onError: (error) =>{
        toast.error(error.message)
    },
    onSuccess: ({Msg}) => {
        queryClient.invalidateQueries({queryKey: ["projectTeam", projectId]})
        toast.success(Msg)
    }
  }) 

  const handleDeleteUserToProject = (userId: TeamMember['_id']) => {
    const data = {
        projectId,
        userId
    }
    mutate(data)
  }
 
  if (isError) {
    return <Navigate to={"/404"} />;
  }

  return (
    <>
      <h1 className="text-5xl font-black">Administrar Equipo</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Administra el equipo de trabajo para este proyecto
      </p>
      <nav className="mt-5 flex gap-3">
        <button
          onClick={() => navigate(location.pathname + "?addMember=true")}
          type="button"
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
        >
          Agregar Colaborador
        </button>
        <Link
          to={`/projects/${projectId}`}
          className="bg-purple-600 hover:bg-purple-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
        >
          Volver a Proyecto
        </Link>
      </nav>

      {isLoading && (
        <div className="relative bg-white flex items-center mt-10 justify-center w-full h-20">
          <Spinner />
        </div>
      )}

      {data?.length? (
        <>
          <h2 className="text-4xl font-black my-10">Miembros actuales</h2>
          <ul
            role="list"
            className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
          >
            {data?.map((member) => (
              <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-black text-gray-600">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.email}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon
                        className="h-9 w-9"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                          <button
                            onClick={() => handleDeleteUserToProject(member._id)}
                            type="button"
                            className="block px-3 py-1 text-sm leading-6 text-red-500"
                          >
                            Eliminar el Proyecto
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-center py-20">No hay miembros en este equipo</p>
      )}

      <AddMemberModal />
    </>
  );
};

export default ProjectTeamView;
