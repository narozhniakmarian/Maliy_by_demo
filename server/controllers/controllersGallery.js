
import createHttpError from 'http-errors';
import { GalleryImage } from '../models/modelsGallery.js';
import { saveFileToCloudinary } from '../untils/saveFileToCloudinary.js';

export const getAllPage = async (req, res, next) => {
    try {
        const pages = await GalleryImage.find();

        res.status(200).json(pages);
    } catch (error) {
        next(error);
    }
};



export const getPageById = async (req, res, next) => {
    const { pageId } = req.params;
    const page = await GalleryImage.findById(pageId);
    if (!page) {
        next(createHttpError(404, 'image not found'));
    }
    res.status(200).json(page);
};


export const createPage = async (req, res, next) => {
    try {
        console.log('CREATE PAGE TRIGGERED');

        const { description } = req.body;
        console.log('req.body:', req.body);
        console.log('req.file:', req.file);

        if (!req.file) {
            return next(createHttpError(400, 'No image uploaded'));
        }

        // if (!description || description.trim().length === 0) {
        //     return next(createHttpError(400, 'Alt text is required'));
        // }

        const { optimizedUrl } = await saveFileToCloudinary(req.file.buffer);

        const page = await GalleryImage.create({ image: optimizedUrl, description: description ? description.trim() : '' });
        console.log('Saved page:', page);


        res.status(201).json({ url: optimizedUrl, page });
    } catch (err) {
        next(err);
    }
};


export const deletePage = async (req, res, next) => {
    const { pageId } = req.params;
    const page = await GalleryImage.findOneAndDelete({
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

        const existingPage = await GalleryImage.findById(pageId);
        if (!existingPage) {
            return next(createHttpError(404, 'Page not found'));
        }

        const updates = {};

        if (req.body.description) {
            updates.description = req.body.description.trim();
        }

        if (req.file) {
            const { optimizedUrl } = await saveFileToCloudinary(req.file.buffer);
            updates.image = optimizedUrl;
        }

        if (Object.keys(updates).length === 0) {
            return next(createHttpError(400, 'No data provided for update'));
        }

        const updatedPage = await GalleryImage.findByIdAndUpdate(pageId, updates, {
            new: true,
        });

        res.status(200).json(updatedPage);
    } catch (err) {
        next(err);
    }
};

