import Config from './config';

export default class Plugins {
    static status(server: any): void {
        server.register({
            path: '/status',
            options: Config.status.options,
            register: require('hapijs-status-monitor')
        });
    }

    static swagger(server: any): void {
        server.register([
            require('vision'),
            require('inert'),
            {
                options: Config.swagger.options,
                register: require('hapi-swagger')
            }
        ]);
    }
}
