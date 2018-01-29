import * as Hapi from 'hapi';
import { interfaces } from "inversify";
import * as test from 'tape';
import { Test } from 'tape';
import { IPayload, IServerFactory } from "app/interfaces";
import container from "app/ioc";
import Types from 'app/ioc/types';

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
