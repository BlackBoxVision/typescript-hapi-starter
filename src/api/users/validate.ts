import * as Joi from 'joi';

export default {
    create: {
        payload: {
            age: Joi.number().integer().required(),
            name: Joi.string().required(),
            last_name: Joi.string().required(),
        },
    },
    updateById: {
        params: {
            id: Joi.string().required(),
        },
        payload: {
            age: Joi.number().integer().optional(),
            name: Joi.string().optional(),
            last_name: Joi.string().optional(),
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
