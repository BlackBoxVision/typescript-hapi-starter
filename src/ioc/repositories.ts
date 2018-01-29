import { interfaces } from 'inversify';
import ArticleRepository from 'app/api/articles/repository';
import UserRepository from 'app/api/users/repository';
import { IUserRepository, IArticleRepository } from 'app/interfaces';
import Types from 'app/ioc/types';

export default (c: interfaces.Container): void => {
    c.bind<IUserRepository>(Types.Repositories.UserRepository).to(UserRepository);
    c.bind<IArticleRepository>(Types.Repositories.ArticleRepository).to(ArticleRepository);
};
