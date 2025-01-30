// KẾT NỐI DATABASE ( MONGOOSEDB )


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb+srv://doducduong0001:BIgSYrBPdeFRE8eT@cluster0.jja7n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = {
  serverApi: {
    version: "1" as const,
    strict: true,
    deprecationErrors: true,
  },
};

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db!.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
