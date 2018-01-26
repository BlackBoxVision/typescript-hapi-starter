import { inject } from 'inversify';
import CrudController from '../../common/crud-controller';
import { IUser, IUserResolver } from '../../interfaces';
import Types from '../../ioc/types';

export default class UsersController extends CrudController<IUser> {
    /**
     * Users Controller constructor
     *
     * @param {IResolver<Article>} resolver
     */
    constructor(@inject(Types.Resolvers.UserResolver) resolver: IUserResolver) {
        super(resolver);
    }
}
