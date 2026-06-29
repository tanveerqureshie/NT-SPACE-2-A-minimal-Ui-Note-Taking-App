import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-cream-200 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-light tracking-tight text-dark-700">
            <span className="font-medium">NT</span>Space
          </h1>
          <Link 
            to="/create" 
            className="btn-cream flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            New Note
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;