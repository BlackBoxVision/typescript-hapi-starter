import { inject } from 'inversify';
import Resolver from '../../common/base-resolver';
import { IUser, IUserRepository } from '../../interfaces';
import Types from '../../ioc/types';

export default class UserResolver extends Resolver<IUser> {
    constructor(@inject(Types.Repositories.UserRepository) repository: IUserRepository) {
        super(repository);
    }
}
