import { inject } from 'inversify';
import CrudController from 'app/common/crud-controller';
import { IUser, IUserResolver, IUsersController } from 'app/interfaces';
import Types from 'app/ioc/types';

export default class UsersController extends CrudController<IUser> implements IUsersController {
    /**
     * Users Controller constructor
     *
     * @param {IResolver<Article>} resolver
     */
    constructor(@inject(Types.Resolvers.UserResolver) resolver: IUserResolver) {
        super(resolver);
    }
}
