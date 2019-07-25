import UserResolver from '../../api/users/resolver';
import CrudController from '../../common/crud-controller';
import User from '../../model/user';

export default class UserController extends CrudController<User> {
  constructor() {
    super(new UserResolver());
  }
}
