import * as Hapi from 'hapi';
import Server from "../src/server";
import * as test from 'tape';
import { Test } from 'tape';

export interface IPayload<T> {
    status: number;
    data: T;
}

export const startServer = async (): Promise<Hapi.Server> => {
    if (Server.instance() === undefined) {
        return await Server.start();
    }

    return await Server.recycle();
};

export const stopServer = async (): Promise<void | Error> => {
    return await Server.stop();
};

export const extractPayload = <T>(response: Hapi.ServerInjectResponse): IPayload<T> => {
    const payload = JSON.parse(response.payload) as IPayload<T>;

    return payload;
};

export const serverTest = async (description: string, testFunc: (server: Hapi.Server, t: Test) => void) => {
    test(description, async (t) => {
        const server = await startServer();
        await testFunc(server, t);
        await stopServer();
        t.end();
    });
};
