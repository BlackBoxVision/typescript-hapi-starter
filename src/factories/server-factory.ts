import * as Hapi from 'hapi';
import { injectable, multiInject } from 'inversify';
import { IServerRegisterable } from 'app/interfaces';
import Types from 'app/ioc/types';

/**
 * Server Factory Class
 */
@injectable()
export default class ServerFactory {
    /**
     * Routes to be registered
     */
    private routes: IServerRegisterable[];

    /**
     * Plugins to be registered
     */
    private plugins: IServerRegisterable[];

    /**
     * ServerFactory constructor
     *
     * @param {IServerRegisterable[]} routes
     * @param {IServerRegisterable[]} plugins
     */
    public constructor(
        @multiInject(Types.Routes.Route) routes: IServerRegisterable[],
        @multiInject(Types.Plugins.Plugin) plugins: IServerRegisterable[],
    ) {
        this.routes = routes;
        this.plugins = plugins;
    }

    /**
     * Create a new instance of the Hapi Server
     *
     * @returns {Promise<Server>}
     */
    public async create(): Promise<Hapi.Server> {
        const instance = new Hapi.Server();
        instance.connection({
            host: process.env.HOST,
            port: process.env.PORT,
        });

        await Promise.all(this.plugins.map(plugin => plugin.register(instance)));
        await Promise.all(this.routes.map(route => route.register(instance)));

        return await Promise.resolve(instance);
    }
}
