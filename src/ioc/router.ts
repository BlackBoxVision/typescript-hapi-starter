import { interfaces } from 'inversify';
import ArticleRoutes from 'app/api/articles/routes';
import UserRoutes from 'app/api/users/routes';
import { IServerRegisterable } from 'app/interfaces';
import Types from 'app/ioc/types';

export default (c: interfaces.Container): void => {
    c.bind<IServerRegisterable>(Types.Routes.Route).to(UserRoutes);
    c.bind<IServerRegisterable>(Types.Routes.Route).to(ArticleRoutes);
};
