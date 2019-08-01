import * as Joi from '@hapi/joi';

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
      USER_ID: Joi.string().required(),
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
      USER_ID: Joi.string().required(),
    },
  },
  deleteById: {
    params: {
      USER_ID: Joi.string().required(),
    },
  },
};
