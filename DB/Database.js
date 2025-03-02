import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // MongoDB connection URL
        const url = "mongodb://127.0.0.1:27017/finmanager";

        // Connect to MongoDB
        const { connection } = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connected successfully to ${connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit process on failure
    }
};
