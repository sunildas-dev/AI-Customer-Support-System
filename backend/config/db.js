import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("URI:", JSON.stringify(process.env.MONGO_URI));
    console.log(
      "Starts with mongodb+srv://",
      process.env.MONGO_URI.startsWith("mongodb+srv://")
    );

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;