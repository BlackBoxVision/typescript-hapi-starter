import { inject, injectable, interfaces } from 'inversify';
import Repository from '../../common/base-nedb-repository';
import { INedbDatastore, IUser, IUserRepository } from '../../interfaces';
import { NedbDataStoreTypes } from '../../ioc/datastore';
import Types from '../../ioc/types';

@injectable()
export default class UserRepository extends Repository<IUser> implements IUserRepository {
    /**
     * User BaseNedbRepository Constructor
     * @param {interfaces.Factory<INedbDatastore>} factory
     */
    public constructor(@inject(Types.DataStores.NedbFactory) factory: interfaces.Factory<INedbDatastore>) {
        const datastore = factory(NedbDataStoreTypes.USERS) as INedbDatastore;

        super(datastore);
    }
}
