import { inject, injectable, interfaces } from 'inversify';
import Repository from '../../common/base-nedb-repository';
import { IArticle, INedbDatastore } from '../../interfaces';
import { NedbDataStoreTypes } from '../../ioc/datastore';
import Types from '../../ioc/types';

@injectable()
class ArticleRepository extends Repository<IArticle> {
    /**
     *
     * @param {interfaces.Factory<INedbDatastore>} factory
     */
    public constructor(@inject(Types.DataStores.NedbFactory) factory: interfaces.Factory<INedbDatastore>) {
        const datastore = factory(NedbDataStoreTypes.ARTICLES) as INedbDatastore;

        super(datastore);
    }
}

export default ArticleRepository;
