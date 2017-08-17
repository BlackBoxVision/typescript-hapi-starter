import User from '../../model/user';
import Resolver from '../../common/base-resolver';
import Repository from '../../common/base-repository';

export default class UserResolver extends Resolver<User> {
    constructor() {
        super(new Repository());
    }
}
