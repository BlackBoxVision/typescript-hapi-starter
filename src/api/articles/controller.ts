import { inject, injectable } from 'inversify';
import CrudController from 'app/common/crud-controller';
import { IArticle, IArticleResolver, IUsersController } from 'app/interfaces';
import Types from 'app/ioc/types';

@injectable()
export default class ArticlesController extends CrudController<IArticle> implements IUsersController {
    constructor(@inject(Types.Resolvers.ArticleResolver) resolver: IArticleResolver) {
        super(resolver);
    }
}
