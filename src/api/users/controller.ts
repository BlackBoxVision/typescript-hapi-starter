import User from '../../model/user';
import UserService from './service';
import CrudController from '../../common/crud-controller';

export default class UserController extends CrudController<User> {
    constructor() {
        super(new UserService());
    }
}
