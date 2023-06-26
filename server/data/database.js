import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "ECommerce",
    });
    console.log(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.log("MongoDB connection failed.", error);
    process.exit(1);
  }
};
