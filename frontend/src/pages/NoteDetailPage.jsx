import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeft, Trash2, Loader } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-dark-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-dark-500 hover:text-dark-700 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <button 
              onClick={handleDelete} 
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>

          <div className="cream-card rounded-xl p-8 animate-fade-in">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Note title..."
                  className="input-cream"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Content
                </label>
                <textarea
                  placeholder="Write your thoughts..."
                  className="textarea-cream h-40"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="flex justify-end">
                <button 
                  className="btn-cream min-w-[120px]"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;