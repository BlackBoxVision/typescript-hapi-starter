import Repository from '../../common/base-repository';
import Resolver from '../../common/base-resolver';
import User from '../../model/user';

export default class UserResolver extends Resolver<User> {
  constructor() {
    super(new Repository());
  }
}
