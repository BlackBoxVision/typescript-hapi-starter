import * as Hapi from 'hapi';

import users from './api/users/routes';
import Logger from './helper/logger';

export default class Router {
    public static async init(server: Hapi.Server): Promise<any> {
        Logger.info('Router - Start adding routes.');

        await users.register(server);

        Logger.info('Router - Finish adding routes.');
    }
}
