import { inject } from 'inversify';
import Resolver from 'app/common/base-resolver';
import { IUser, IUserRepository, IUserResolver } from 'app/interfaces';
import Types from 'app/ioc/types';

export default class UserResolver extends Resolver<IUser, string> implements IUserResolver {
    constructor(@inject(Types.Repositories.UserRepository) repository: IUserRepository) {
        super(repository);
    }
}
