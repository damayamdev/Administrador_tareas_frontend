import { Task } from "@/types/index"
import AddNoteForm from "./AddNoteForm"
import AcordionNotes from "./AcordionNotes"

type NotesPanelProps = {
    notes: Task['notes']
}

const NotesPanel = ({notes}: NotesPanelProps) => {
  return (
    <>
      <AddNoteForm />
      <div className="divide-y divide-gray-100 mt-10">
        {
            notes.length ? (
                <AcordionNotes notes={notes} />
            ) : null
        }
      </div>
    </>
  )
}

export default NotesPanel
