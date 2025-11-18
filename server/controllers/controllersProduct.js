
import createHttpError from "http-errors";
import { Product } from "../models/modelsProduct";
import { saveFileToCloudinary } from "../untils/saveFileToCloudinary";


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
        if (!req.file) {
            return next(createHttpError(400, 'No product image uploaded'));
        }

        const { optimizedUrl } = await saveFileToCloudinary(req.file.buffer, 'products');

        const productData = {
            ...req.body,
            images: [optimizedUrl],
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

        if (req.file) {
            const { optimizedUrl } = await saveFileToCloudinary(req.file.buffer, 'products');
            updates.images = [optimizedUrl];
        }

        Object.assign(updates, req.body);

        const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

        res.status(200).json(updatedProduct);
    } catch (err) {
        next(err);
    }
};