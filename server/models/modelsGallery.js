import mongoose from "mongoose"; // ✅

const gallerySchema = new mongoose.Schema({
    description: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const GalleryImage =
    mongoose.models.GalleryImage || mongoose.model("GalleryImage", gallerySchema);