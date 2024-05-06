import { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/services/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

const AddNoteForm = () => {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = params.projectId!;
  const taskId = queryParams.get("viewTask")!;
  const queryClient = useQueryClient();

  const initialValues: NoteFormData = {
    content: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: ({ Msg }) => {
      toast.success(Msg);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      reset();
    },
  });

  const handleAddNote = (formData: NoteFormData) => {
    const data = {
      formData,
      projectId,
      taskId,
    };
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      noValidate
      className="mt-10 space-y-3"
    >
      <div className="flex flex-col gap-2">
        <label className="font-bold" htmlFor="content">
          Crear Nota
        </label>
        <input
          {...register("content", {
            required: "El Contenido de la nota es obligatoria",
          })}
          type="text"
          id="content"
          placeholder="Escribe tu nota"
          className="w-full p-3 border border-gray-300"
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>
      <input
        type="submit"
        value="Crea tu nota"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer  "
      />
    </form>
  );
};

export default AddNoteForm;
