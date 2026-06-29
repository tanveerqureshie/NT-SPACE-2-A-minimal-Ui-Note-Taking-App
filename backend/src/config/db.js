import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/notesdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MONGODB CONNECTED: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Error connecting to MONGODB:", error.message);
    process.exit(1);
  }
};