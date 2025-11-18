import { Schema, model } from "mongoose";


const PageSchema = new Schema({
    src: {
        type: String,
        required: true,
        trim: true,
    },
    alt: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});


export const Page = model('Page', PageSchema);