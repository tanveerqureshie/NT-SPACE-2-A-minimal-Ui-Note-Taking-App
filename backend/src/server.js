import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// IMPORTANT: CORS must be before routes
app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Only apply rate limiter in production or with Redis
// For development, comment out rate limiter
// app.use(rateLimiter);

// Routes
app.use("/api/notes", notesRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ 
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server started on PORT: ${PORT}`);
    console.log(`📡 API URL: http://localhost:${PORT}/api/notes`);
  });
}).catch(err => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
});