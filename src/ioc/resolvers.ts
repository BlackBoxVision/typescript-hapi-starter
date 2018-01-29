import { interfaces } from 'inversify';
import ArticleResolver from 'app/api/articles/resolver';
import UserResolver from 'app/api/users/resolver';
import { IArticleResolver, IUserResolver } from 'app/interfaces';
import Types from 'app/ioc/types';

export default (c: interfaces.Container): void => {
    c.bind<IUserResolver>(Types.Resolvers.UserResolver).to(UserResolver);
    c.bind<IArticleResolver>(Types.Resolvers.ArticleResolver).to(ArticleResolver);
};
