import * as Nedb from 'nedb'; // Required or the nedb helpers break.
import { INedbDatastore } from "app/interfaces";
import container from "app/ioc";
import Types from "app/ioc/types";
import { interfaces } from "inversify";
import Factory = interfaces.Factory;

export const getStore = (type: symbol) => {
    const factory = container.get<Factory<INedbDatastore>>(Types.DataStores.NedbFactory);

    const store = factory(type) as INedbDatastore;
    clearDB(store);

    return store;
};

export const insertRecords = async <T>(records: T, store: INedbDatastore): Promise<T> => {
    return new Promise((resolve, reject) => {
        store.insert<T>(records, (err, docs: T) => {
            if (err) {
                reject(err);
            }

            resolve(docs);
        });
    }) as Promise<T>;
};

export const clearDB = async (store: INedbDatastore): Promise<any> => {
    return new Promise((resolve, reject) => {
        store.remove({}, { multi: true }, (err, num) => {
            store.loadDatabase();
            return resolve();
        });
    })
};