import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#FFF8F0',
            color: '#1A1A1A',
            border: '1px solid #FBE8D0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);