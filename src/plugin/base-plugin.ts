import { inject, injectable } from 'inversify';
import { IConfig, ILogger, IServer, IServerRegisterable } from 'app/interfaces';
import Types from 'app/ioc/types';

@injectable()
export default abstract class BasePlugin implements IServerRegisterable {
    /**
     * Determines whether the plugin should load in development
     */
    protected devOnly: boolean = false;

    /**
     * Logging service
     */
    @inject(Types.Services.Logger) protected logger: ILogger;

    /**
     * Config service
     */
    @inject(Types.Services.Config) protected config: IConfig;

    /**
     * Register the plugin
     *
     * @param {Server} server
     * @returns {Promise<Error | any>}
     */
    public register(server: IServer): Promise<Error | any> {
        return new Promise((resolve, reject) => {
            // Skip plugins if they are marked as development only
            if (process.env.NODE_ENV !== 'development' && this.isDevOnly() === true) {
                this.logger.info(`Plugin - Skipping ${this.getPluginName()} in development mode!`);

                return resolve(true);
            }

            // Register plugin with hapi
            server.register(this.configurePlugin(), error => {
                if (error) {
                    this.logger.error(
                        `Plugins - Ups, something went wrong when registering ${this.getPluginName()} plugin: ${error}`,
                    );
                    reject(error);
                }
                this.logger.info(`Plugin - Registering ${this.getPluginName()}`);
                resolve();
            });
        });
    }

    /**
     * Configure the plugin and return an array or object literal containing the plugin config
     *
     * @returns {any}
     */
    protected abstract configurePlugin(): any;

    /**
     * Determine if the plugin should be loaded in development mode
     *
     * @returns {boolean}
     */
    protected isDevOnly(): boolean {
        return this.devOnly;
    }

    /**
     * Retrieve the plugin name
     *
     * @returns {string}
     */
    protected getPluginName(): string {
        return this.constructor.name;
    }
}
