import { inject, injectable, interfaces } from 'inversify';
import Repository from 'app/common/base-nedb-repository';
import { IArticle, IArticleRepository, INedbDatastore } from 'app/interfaces';
import { DataStores } from 'app/ioc/types';

@injectable()
class ArticleRepository extends Repository<IArticle> implements IArticleRepository {
    /**
     *
     * @param {interfaces.Factory<INedbDatastore>} factory
     */
    public constructor(@inject(DataStores.NedbFactory) factory: interfaces.Factory<INedbDatastore>) {
        const datastore = factory(DataStores.NedbArticleDataStore) as INedbDatastore;

        super(datastore);
    }
}

export default ArticleRepository;
