import Config from '../config';
import * as Hapi from '@hapi/hapi';
import Logger from '../helper/logger';

export default class Plugins {
  public static async status(server: Hapi.Server): Promise<Error | any> {
    try {
      Logger.info('Plugins - Registering status-monitor');

      await Plugins.register(server, {
        options: Config.status.options,
        plugin: require('hapijs-status-monitor'),
      });
    } catch (error) {
      Logger.info(
        `Plugins - Ups, something went wrong when registering status plugin: ${error}`
      );
    }
  }

  public static async swagger(server: Hapi.Server): Promise<Error | any> {
    try {
      Logger.info('Plugins - Registering swagger-ui');

      await Plugins.register(server, [
        require('@hapi/vision'),
        require('@hapi/inert'),
        {
          options: Config.swagger.options,
          plugin: require('hapi-swagger'),
        },
      ]);
    } catch (error) {
      Logger.info(
        `Plugins - Ups, something went wrong when registering swagger-ui plugin: ${error}`
      );
    }
  }

  public static async registerAll(server: Hapi.Server): Promise<Error | any> {
    if (process.env.NODE_ENV === 'development') {
      await Plugins.status(server);
      await Plugins.swagger(server);
    }
  }

  private static async register(
    server: Hapi.Server,
    plugin: any
  ): Promise<void> {
    Logger.debug('registering: ' + JSON.stringify(plugin));

    return new Promise((resolve, reject) => {
      server.register(plugin);
      resolve();
    });
  }
}
