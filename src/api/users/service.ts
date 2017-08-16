import CrudService from '../../common/crud-service';
import User from '../../model/user';
import Repository from '../../common/crud-repository';

export default class UserService extends CrudService<User> {
    constructor() {
        super(new Repository());
    }
}
