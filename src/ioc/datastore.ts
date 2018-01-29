import { interfaces } from 'inversify';
import { IConfig, ILogger, INedbDatastore } from 'app/interfaces';
import Types from 'app/ioc/types';
import * as Nedb from 'nedb';

const nedbLoader = (name: string, options: Nedb.DataStoreOptions, logger: ILogger) => {
    const ds = new Nedb(options);
    logger.info(`Nedb - Loading ${name}`);
    ds.loadDatabase(err => {
        if (err !== null) {
            logger.error(`Nedb - Error loading ${name}\n` + err);
        }
    });

    return ds;
};

export default (container: interfaces.Container): void => {
    const config = container.get<IConfig>(Types.Services.Config);
    const logger = container.get<ILogger>(Types.Services.Logger);

    container
        .bind<INedbDatastore>(Types.DataStores.NedbDataStore)
        .toDynamicValue((context: interfaces.Context) => nedbLoader('users', config.datastore.nedb.users, logger))
        .inSingletonScope()
        .whenTargetNamed(Types.DataStores.NedbUserDataStore);

    container
        .bind<INedbDatastore>(Types.DataStores.NedbDataStore)
        .toDynamicValue((context: interfaces.Context) => nedbLoader('articles', config.datastore.nedb.articles, logger))
        .inSingletonScope()
        .whenTargetNamed(Types.DataStores.NedbArticleDataStore);

    container
        .bind<interfaces.Factory<INedbDatastore>>(Types.DataStores.NedbFactory)
        .toFactory<INedbDatastore>((context: interfaces.Context) => (name: symbol) =>
            context.container.getNamed<INedbDatastore>(Types.DataStores.NedbDataStore, name),
        );
};
