import { interfaces } from 'inversify';
import { IConfig, ILogger, INedbDatastore } from '../interfaces';
import Types from './types';
import * as Nedb from 'nedb';

export enum NedbDataStoreTypes {
    USERS = 0x1,
    ARTICLES = 0x2,
}
export default (container: interfaces.Container): void => {
    container
        .bind<INedbDatastore>(Types.DataStores.NedbDataStore)
        .toDynamicValue((context: interfaces.Context) => {
            const config = context.container.get<IConfig>(Types.Services.Config);
            const ds = new Nedb(config.datastore.nedb.users);
            ds.loadDatabase(err => {
                if (err !== null) {
                    const logger = context.container.get<ILogger>(Types.Services.Logger);
                    logger.error('Article Database:' + err);
                }
            });

            return ds;
        })
        .inSingletonScope()
        .whenTargetNamed(NedbDataStoreTypes.USERS);

    container
        .bind<INedbDatastore>(Types.DataStores.NedbDataStore)
        .toDynamicValue((context: interfaces.Context) => {
            const config = context.container.get<IConfig>(Types.Services.Config);
            const ds = new Nedb(config.datastore.nedb.articles);
            ds.loadDatabase(err => {
                if (err !== null) {
                    const logger = context.container.get<ILogger>(Types.Services.Logger);
                    logger.error('Article Database:' + err);
                }
            });

            return ds;
        })
        .inSingletonScope()
        .whenTargetNamed(NedbDataStoreTypes.ARTICLES);

    container
        .bind<interfaces.Factory<INedbDatastore>>(Types.DataStores.NedbFactory)
        .toFactory<INedbDatastore>((context: interfaces.Context) => {
            return (name: number) => {
                return context.container.getNamed<INedbDatastore>(Types.DataStores.NedbDataStore, name);
            };
        });
};
