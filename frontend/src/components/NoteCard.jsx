import { Pen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group cream-card rounded-xl p-6 block animate-fade-in hover:translate-y-[-4px]"
    >
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-medium text-dark-700 mb-2 line-clamp-1">
          {note.title}
        </h3>
        <p className="text-dark-500 text-sm line-clamp-3 flex-1">
          {note.content}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-cream-200">
          <span className="text-xs text-dark-400">
            {formatDate(new Date(note.createdAt))}
          </span>
          <button
            onClick={(e) => handleDelete(e, note._id)}
            className="p-1.5 rounded-lg text-dark-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;