import { interfaces } from 'inversify';
import ArticleRepository from '../api/articles/repository';
import UserRepository from '../api/users/repository';
import { IRepository, IUser, IArticle } from '../interfaces';
import Types from './types';

export default (c: interfaces.Container): void => {
    c.bind<IRepository<IUser>>(Types.Repositories.UserRepository).to(UserRepository);
    c.bind<IRepository<IArticle>>(Types.Repositories.ArticleRepository).to(ArticleRepository);
};
