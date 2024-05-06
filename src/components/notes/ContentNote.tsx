import { useAuth } from "@/hooks/useAuth";
import { deleteNote } from "@/services/NoteAPI";
import { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type ContentNoteProps = {
  note: Note;
};

const ContentNote = ({ note }: ContentNoteProps) => {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = params.projectId!;
  const taskId = queryParams.get("viewTask")!;
  const queryClient = useQueryClient();
  const { data } = useAuth();

  const conDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: ({ Msg }) => {
      toast.success(Msg);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });

  return (
    <div
      key={note._id}
      className="text-sm flex flex-col text-slate-400 pb-4 space-y-3 border-b border-gray-200"
    >
      <div className="flex justify-between">
        <span className="text-slate-600 font-semibold ">
          Creada por: <span className="font-normal">{note.createdBy.name}</span>
        </span>
        <span className="font-medium">{formatDate(note.createdAt)}</span>
      </div>{" "}
      <div className="flex justify-between">
        <span className="text-slate-600 font-semibold">
          Comentario: <span className="font-normal">{note.content}</span>
        </span>
        {conDelete && (
          <button
            onClick={() =>
              mutate({
                projectId,
                taskId,
                noteId: note._id,
              })
            }
            type="button"
            className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default ContentNote;
