import User from '../../model/user';
import UserResolver from './resolver';
import CrudController from '../../common/crud-controller';

export default class UserController extends CrudController<User> {
    constructor() {
        super(new UserResolver());
    }
}
