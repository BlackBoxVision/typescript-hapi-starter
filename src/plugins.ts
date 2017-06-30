import Config from './config';

export default class Plugins {
    static status(server: any) : void {
        server.register({
            register: require('hapijs-status-monitor'),
            path: '/status',
            options: {
                title: 'API Monitor',
                routeConfig: {
                    auth: false
                }
            }
        });
    }

    static swagger(server: any) : void {
        server.register([
            require('vision'),
            require('inert'),
            {
                register: require('hapi-swagger'),
                options: Config.swagger.options
            }
        ]);
    }
}