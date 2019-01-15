import * as Joi from 'joi';

export default {
    create: {
        payload: {
            age: Joi.number()
                .integer()
                .required(),
            name: Joi.string().required(),
            lastName: Joi.string().required(),
        },
    },
    updateById: {
        params: {
            id: Joi.string().required(),
        },
        payload: {
            age: Joi.number()
                .integer()
                .optional(),
            name: Joi.string().optional(),
            lastName: Joi.string().optional(),
        },
    },
    getById: {
        params: {
            id: Joi.string().required(),
        },
    },
    deleteById: {
        params: {
            id: Joi.string().required(),
        },
    },
};
