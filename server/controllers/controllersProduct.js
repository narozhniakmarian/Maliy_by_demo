
import createHttpError from "http-errors";
import { Product } from "../models/modelsProduct.js";
import { saveFileToCloudinary } from "../untils/saveFileToCloudinary.js";


export const getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};



export const getProductById = async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
        next(createHttpError(404, 'product not found'));
        return;
    }
    res.status(200).json(product);
};


export const createProduct = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return next(createHttpError(400, 'No product image uploaded'));
        }

        const uploadResults = await Promise.all(req.files.map((file) => saveFileToCloudinary(file.buffer, 'products')));
        const optimizedUrls = uploadResults.map((r) => r.optimizedUrl);

        const productData = {
            ...req.body,
            images: optimizedUrls,
        };

        const product = await Product.create(productData);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};


export const deleteProduct = async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findOneAndDelete({
        _id: productId,
    });

    if (!product) {
        next(createHttpError(404, "product not found"));
        return;
    }
    res.status(200).json(product);
};


export const updateProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return next(createHttpError(404, "Product not found"));
        }

        const updates = {};

        if (req.files && req.files.length > 0) {
            const uploadResults = await Promise.all(req.files.map((file) => saveFileToCloudinary(file.buffer, 'products')));
            const optimizedUrls = uploadResults.map((r) => r.optimizedUrl);
            updates.images = optimizedUrls;
        }

        Object.assign(updates, req.body);

        const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

        res.status(200).json(updatedProduct);
    } catch (err) {
        next(err);
    }
};