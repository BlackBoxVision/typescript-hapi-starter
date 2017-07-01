import Config from './config';

export default class Plugins {
    public static status(server: any): void {
        server.register({
            path: '/status',
            options: Config.status.options,
            register: require('hapijs-status-monitor'),
        });
    }

    public static swagger(server: any): void {
        server.register([
            require('vision'),
            require('inert'),
            {
                options: Config.swagger.options,
                register: require('hapi-swagger'),
            },
        ]);
    }
}
