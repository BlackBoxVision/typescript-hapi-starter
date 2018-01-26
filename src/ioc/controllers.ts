import { interfaces } from 'inversify';
import ArticlesController from '../api/articles/controller';
import UsersController from '../api/users/controller';
import { ICrudController } from '../interfaces';
import Types from './types';

export default (c: interfaces.Container): void => {
    c.bind<ICrudController>(Types.Controllers.UsersController).to(UsersController);
    c.bind<ICrudController>(Types.Controllers.ArticlesController).to(ArticlesController);
};
