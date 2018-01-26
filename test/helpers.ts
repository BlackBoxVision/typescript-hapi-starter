import * as Hapi from 'hapi';
import { interfaces } from "inversify";
import * as Nedb from 'nedb';
import * as test from 'tape';
import { Test } from 'tape';
import { INedbDatastore, IServer, IServerFactory } from "../src/interfaces";
import container from "../src/ioc";
import { NedbDataStoreTypes } from "../src/ioc/datastore";
import Types from '../src/ioc/types';
import Factory = interfaces.Factory;

export interface IPayload<T> {
    status: number;
    data: T;
}

export type TestFunc = (server: Hapi.Server, t: Test) => void;
export type TestCallbackFunc = (container: interfaces.Container, server: Hapi.Server) => void

export const extractPayload = <T>(response: Hapi.InjectedResponseObject): IPayload<T> => {
    const payload = JSON.parse(response.payload) as IPayload<T>;

    return payload;
};

export const serverTest = async (description: string, testFunc: TestFunc, before?: TestCallbackFunc, after?: TestCallbackFunc) => {
    const factory = container.get<IServerFactory>(Types.Factories.ServerFactory);
    test(description, async (t) => {
        // create server
        const server = await factory.create();

        // call before func
        before && before(container, server);

        // fire test
        await testFunc(server, t);

        // call after func
        after && after(container, server);

        // stop server
        await server.stop();

        t.end();
    });
};

export const nedbGetStore = (type: NedbDataStoreTypes) => {
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
