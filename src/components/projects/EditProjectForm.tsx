import { ProjectFormData } from "@/types/index";
import { Link, useParams,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ProjectForm from "./ProjectForm";
import {useMutation, useQueryClient} from '@tanstack/react-query'
import { updateProject } from "@/services/ProjectAPI";

type EditProjectForm = {
  data: ProjectFormData;
};

const EditProjectForm = ({ data }: EditProjectForm) => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
    },
  });


  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: ({Msg}) => {
      queryClient.invalidateQueries({queryKey:['projects']})
      queryClient.invalidateQueries({queryKey:["editProject", projectId]})
      toast.success(Msg);
      navigate("/");
    }
  })

  const handleForm = (formData: ProjectFormData) => {
    const data = {
      formData,
      id: projectId
    }
    mutate(data)
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para editar el proyecto
        </p>
        <nav className="my-5">
          <Link
            to="/"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer rounded-lg transition-colors"
          >
            Volver a Proyectos
          </Link>
        </nav>

        <form
          onSubmit={handleSubmit(handleForm)}
          noValidate
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value="Guardar Cambiós"
            className="bg-fuchsia-600 hove:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

export default EditProjectForm;
