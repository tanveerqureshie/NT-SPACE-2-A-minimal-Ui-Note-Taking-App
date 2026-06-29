import { Notebook } from "lucide-react";
import { Link } from "react-router-dom";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center animate-fade-in">
      <div className="bg-cream-200 rounded-full p-8">
        <Notebook className="w-12 h-12 text-dark-400" />
      </div>
      <h3 className="text-2xl font-light text-dark-700">No notes yet</h3>
      <p className="text-dark-400 text-sm max-w-sm">
        Ready to organize your thoughts? Create your first note to get started.
      </p>
      <Link to="/create" className="btn-cream">
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;