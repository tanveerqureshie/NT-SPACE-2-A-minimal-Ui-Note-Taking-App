import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

const App = () => {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,#FDF0E0_0%,#FFF8F0_70%)]" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;