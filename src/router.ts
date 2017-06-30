import users from './api/users/routes';

export const register = (server: any) : void => {
    server.route(users);
}