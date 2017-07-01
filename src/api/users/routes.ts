import UserController from './controller';
import UserValidation from './validate';

export default [
    {
        method: 'POST',
        path: '/api/users',
        config: {
            handler: UserController.create,
            validate: UserValidation.create,
            description: 'Method that creates a new user.',
            tags: ['api', 'users'],
            auth: false,
        },
    },
    {
        method: 'PUT',
        path: '/api/users/{id}',
        config: {
            handler: UserController.updateById,
            validate: UserValidation.updateById,
            description: 'Method that updates a user by its id.',
            tags: ['api', 'users'],
            auth: false,
        },
    },
    {
        method: 'GET',
        path: '/api/users/{id}',
        config: {
            handler: UserController.getById,
            validate: UserValidation.getById,
            description: 'Method that get a user by its id.',
            tags: ['api', 'users'],
            auth: false,
        },
    },
    {
        method: 'GET',
        path: '/api/users',
        config: {
            handler: UserController.getAll,
            description: 'Method that gets all users.',
            tags: ['api', 'users'],
            auth: false,
        },
    },
    {
        method: 'DELETE',
        path: '/api/users/{id}',
        config: {
            handler: UserController.deleteById,
            validate: UserValidation.deleteById,
            description: 'Method that deletes a user by its id.',
            tags: ['api', 'users'],
            auth: false,
        },
    },
];
