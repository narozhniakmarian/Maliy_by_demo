import mongoose from "mongoose";
import { Page } from "../models/modelsGallery.js"

export const connectMongoDB = async () => {
    try {

        const mongoUrl = process.env.MONGO_URL;
        await mongoose.connect(mongoUrl);
        console.log('✅ MongoDB connection established successfully');

        await Page.syncIndexes();
        console.log("Indexes synced successfully");

        if (!mongoUrl) {
            console.error("❌ MONGO_URL is not defined");
            process.exit(1);
        }
    }
    catch (error) {
        console.error('❌ Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }
};

