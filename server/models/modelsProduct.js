import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: [String],
        required: true,
        validate: [arr => arr.length > 0, 'At least one image is required'],

    },
    description: {
        type: String,
        default: '',
        trim: true,
    },
    dimensions: {
        length: { type: Number, required: true },
        height: { type: Number, required: true },
        width: { type: Number, required: true },
    },
    weight: {
        type: Number,
        required: true,
    },
    colors: {
        type: [String],
        required: true,
        validate: [arr => arr.length > 0, 'At least one color is required'],
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },

}, {
    timestamps: true,
    versionKey: false,
});


export const Product = model('Product', ProductSchema);