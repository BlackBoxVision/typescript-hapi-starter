import users from './api/users/routes';

export default class Router {
    static register(server: any): void {
        server.route(users);
    }
}
