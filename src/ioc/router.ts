import { interfaces } from 'inversify';
import ArticleRoutes from '../api/articles/routes';
import UserRoutes from '../api/users/routes';
import { IServerRegisterable } from '../interfaces';
import Types from './types';

export default (c: interfaces.Container): void => {
    c.bind<IServerRegisterable>(Types.Routes.Route).to(UserRoutes);
    c.bind<IServerRegisterable>(Types.Routes.Route).to(ArticleRoutes);
};
