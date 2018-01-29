import { inject, injectable, interfaces } from 'inversify';
import Repository from 'app/common/base-nedb-repository';
import { INedbDatastore, IUser, IUserRepository } from 'app/interfaces';
import { DataStores } from 'app/ioc/types';

@injectable()
export default class UserRepository extends Repository<IUser> implements IUserRepository {
    /**
     * User BaseNedbRepository Constructor
     * @param {interfaces.Factory<INedbDatastore>} factory
     */
    public constructor(@inject(DataStores.NedbFactory) factory: interfaces.Factory<INedbDatastore>) {
        const datastore = factory(DataStores.NedbUserDataStore) as INedbDatastore;

        super(datastore);
    }
}
