import { interfaces } from 'inversify';
import ArticleResolver from '../api/articles/resolver';
import UserResolver from '../api/users/resolver';
import { IArticleResolver, IUserResolver } from '../interfaces';
import Types from './types';

export default (c: interfaces.Container): void => {
    c.bind<IUserResolver>(Types.Resolvers.UserResolver).to(UserResolver);
    c.bind<IArticleResolver>(Types.Resolvers.ArticleResolver).to(ArticleResolver);
};
