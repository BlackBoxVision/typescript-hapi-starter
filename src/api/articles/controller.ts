import { inject, injectable } from 'inversify';
import CrudController from '../../common/crud-controller';
import { IArticle, IArticleResolver } from '../../interfaces';
import Types from '../../ioc/types';

@injectable()
export default class ArticlesController extends CrudController<IArticle> {
    constructor(@inject(Types.Resolvers.ArticleResolver) resolver: IArticleResolver) {
        super(resolver);
    }
}
