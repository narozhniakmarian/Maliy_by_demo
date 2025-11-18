
import createHttpError from "http-errors";
import { Page } from "../models/modelsGallery";
import { saveFileToCloudinary } from "../untils/saveFileToCloudinary";

export const getAllPage = async (req, res, next) => {
    try {
        const pages = await Page.find();

        res.status(200).json(pages);
    } catch (error) {
        next(error);
    }
};



export const getPageById = async (req, res, next) => {
    const { pageId } = req.params;
    const page = await Page.findById(pageId);
    if (!page) {
        next(createHttpError(404, 'image not found'));
    }
    res.status(200).json(page);
};


export const createPage = async (req, res, next) => {
    try {
        const { alt } = req.body;

        if (!req.file) {
            return next(createHttpError(400, 'No image uploaded'));
        }

        if (!alt || alt.trim().length === 0) {
            return next(createHttpError(400, 'Alt text is required'));
        }

        const { optimizedUrl } = await saveFileToCloudinary(req.file.buffer);

        const page = await Page.create({ src: optimizedUrl, alt: alt.trim() });

        res.status(201).json({ url: optimizedUrl, page });
    } catch (err) {
        next(err);
    }
};


export const deletePage = async (req, res, next) => {
    const { pageId } = req.params;
    const page = await Page.findOneAndDelete({
        _id: pageId,
    });

    if (!page) {
        next(createHttpError(404, "image not found"));
        return;
    }
    res.status(200).json(page);
};

export const updatePage = async (req, res, next) => {
    try {
        const { pageId } = req.params;

        const existingPage = await Page.findById(pageId);
        if (!existingPage) {
            return next(createHttpError(404, 'Page not found'));
        }

        const updates = {};

        if (req.body.alt) {
            updates.alt = req.body.alt.trim();
        }

        if (req.file) {
            const { optimizedUrl } = await saveFileToCloudinary(req.file.buffer);
            updates.src = optimizedUrl;
        }

        if (Object.keys(updates).length === 0) {
            return next(createHttpError(400, 'No data provided for update'));
        }

        const updatedPage = await Page.findByIdAndUpdate(pageId, updates, {
            new: true,
        });

        res.status(200).json(updatedPage);
    } catch (err) {
        next(err);
    }
};

