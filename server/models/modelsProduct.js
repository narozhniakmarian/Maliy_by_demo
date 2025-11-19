import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    image: [String],
    length: Number,
    height: Number,
    width: Number,
    weight: Number,
    colors: [String],
});


export const Product = model('Product', ProductSchema);