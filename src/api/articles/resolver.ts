import { inject, injectable } from 'inversify';
import Resolver from 'app/common/base-resolver';
import { IArticle, IArticleRepository, IArticleResolver } from 'app/interfaces';
import Types from 'app/ioc/types';

@injectable()
export default class ArticleResolver extends Resolver<IArticle, string> implements IArticleResolver {
    constructor(@inject(Types.Repositories.ArticleRepository) repository: IArticleRepository) {
        super(repository);
    }
}
