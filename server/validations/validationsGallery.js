import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';


export const validateGetAllPages = {
    [Segments.QUERY]: Joi.object({
        alt: Joi.string().trim(),
    }),
};


export const validatePageIdParam = {
    [Segments.PARAMS]: Joi.object({
        pageId: Joi.string().custom((value, helpers) => {
            if (!isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'ObjectId validation').required(),
    }),
};

export const validateCreatePage = {
    [Segments.BODY]: Joi.object({
        // src: Joi.string().uri().required(),
        alt: Joi.string().trim().min(1).required(),
    }),
};


export const validateUpdatePage = {
    [Segments.PARAMS]: Joi.object({
        pageId: Joi.string().custom((value, helpers) => {
            if (!isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'ObjectId validation').required(),
    }),
    [Segments.BODY]: Joi.object({
        // src: Joi.string().uri(),
        alt: Joi.string().trim(),
    }).min(1),
};