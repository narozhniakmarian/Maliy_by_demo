import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';


export const validateGetAllProduct = {
    [Segments.QUERY]: Joi.object({
        color: Joi.string(), // ?color=red
        price: Joi.number().min(0),

    }),
};


export const validateProductIdParam = {
    [Segments.PARAMS]: Joi.object({
        productId: Joi.string().custom((value, helpers) => {
            if (!isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'ObjectId validation').required(),
    }),
};

export const validateCreateProduct = {
    [Segments.BODY]: Joi.object({
        title: Joi.string().trim().min(1).required(),
        // images: Joi.array().items(Joi.string().uri()).min(1).required(),
        description: Joi.string().trim().allow(''),
        dimensions: Joi.object({
            length: Joi.number().positive().required(),
            height: Joi.number().positive().required(),
            width: Joi.number().positive().required(),
        }).required(),
        weight: Joi.number().positive().required(),
        colors: Joi.array().items(Joi.string().trim()).min(1).required(),
        price: Joi.number().min(0).required(),
    }),
};



export const validateUpdateProduct = {
    [Segments.PARAMS]: Joi.object({
        productId: Joi.string().custom((value, helpers) => {
            if (!isValidObjectId(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'ObjectId validation').required(),
    }),
    [Segments.BODY]: Joi.object({
        title: Joi.string().trim(),
        // images: Joi.array().items(Joi.string().uri()),
        description: Joi.string().trim(),
        dimensions: Joi.object({
            length: Joi.number().positive(),
            height: Joi.number().positive(),
            width: Joi.number().positive(),
        }),
        weight: Joi.number().positive(),
        colors: Joi.array().items(Joi.string().trim()),
        price: Joi.number().min(0),
    }).min(1), // хоча б одне поле має бути
};