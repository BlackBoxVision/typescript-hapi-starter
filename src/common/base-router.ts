import { inject, injectable } from 'inversify';
import { ILogger, IRouteConfiguration, IServer, IServerRegisterable } from 'app/interfaces';
import Types from 'app/ioc/types';

@injectable()
abstract class BaseRouter implements IServerRegisterable {
    /**
     * Logging Service
     */
    @inject(Types.Services.Logger) private logger: ILogger;

    /**
     * Register the routes
     * @param {Server} server
     * @returns {Promise<any>}
     */
    public async register(server: IServer): Promise<any> {
        return new Promise(resolve => {
            this.logger.info(`Router - Start adding ${this.getRouteName()}.`);

            server.route(this.routes());

            this.logger.info(`Router - Finish adding ${this.getRouteName()}.`);

            resolve();
        });
    }

    protected abstract routes(): IRouteConfiguration[];

    /**
     * Get the name of the current route. Override this method to change the name printed in the log
     *
     * @returns {string}
     */
    protected getRouteName(): string {
        return this.constructor.name;
    }
}

export default BaseRouter;
