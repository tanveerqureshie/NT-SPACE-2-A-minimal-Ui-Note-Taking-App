import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast");
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-dark-500 hover:text-dark-700 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Notes
          </Link>

          <div className="cream-card rounded-xl p-8 animate-slide-up">
            <h2 className="text-2xl font-light text-dark-700 mb-6">
              Create New Note
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Note title..."
                  className="input-cream"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-600 mb-2">
                  Content
                </label>
                <textarea
                  placeholder="Write your thoughts..."
                  className="textarea-cream h-40"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="btn-cream min-w-[120px]"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;