import { inject, injectable } from 'inversify';
import Resolver from '../../common/base-resolver';
import { IArticle, IArticleRepository } from '../../interfaces';
import Types from '../../ioc/types';

@injectable()
export default class ArticleResolver extends Resolver<IArticle> {
    constructor(@inject(Types.Repositories.ArticleRepository) repository: IArticleRepository) {
        super(repository);
    }
}
