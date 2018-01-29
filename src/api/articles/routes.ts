import { inject, injectable } from 'inversify';
import BaseRouter from 'app/common/base-router';
import { IArticlesController, IRouteConfiguration } from 'app/interfaces';
import Types from 'app/ioc/types';
import validate from 'app/api/articles/validate';

@injectable()
export default class ArticleRoutes extends BaseRouter {
    private controller: IArticlesController;

    constructor(@inject(Types.Controllers.ArticlesController) controller: IArticlesController) {
        super();

        this.controller = controller;
    }

    public routes(): IRouteConfiguration[] {
        return [
            {
                method: 'POST',
                path: '/api/articles',
                config: {
                    handler: this.controller.create,
                    validate: validate.create,
                    description: 'Method that creates a new user.',
                    tags: ['api', 'articles'],
                    auth: false,
                },
            },
            {
                method: 'PUT',
                path: '/api/articles/{id}',
                config: {
                    handler: this.controller.updateById,
                    validate: validate.updateById,
                    description: 'Method that updates a user by its id.',
                    tags: ['api', 'articles'],
                    auth: false,
                },
            },
            {
                method: 'GET',
                path: '/api/articles/{id}',
                config: {
                    handler: this.controller.getById,
                    validate: validate.getById,
                    description: 'Method that get a user by its id.',
                    tags: ['api', 'articles'],
                    auth: false,
                },
            },
            {
                method: 'GET',
                path: '/api/articles',
                config: {
                    handler: this.controller.getAll,
                    description: 'Method that gets all users.',
                    tags: ['api', 'articles'],
                    auth: false,
                },
            },
            {
                method: 'DELETE',
                path: '/api/articles/{id}',
                config: {
                    handler: this.controller.deleteById,
                    validate: validate.deleteById,
                    description: 'Method that deletes a user by its id.',
                    tags: ['api', 'articles'],
                    auth: false,
                },
            },
        ];
    }
}
