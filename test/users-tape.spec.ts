import * as test from 'tape';
import server from '../src';
import { InjectedResponseObject } from 'hapi';

interface IUser {
    id?: string;
    age: number;
    name: string;
    lastName: string;
}

interface IPayload<T> {
    status: number;
    data: T;
}

const extractPayload = <T>(response: InjectedResponseObject): IPayload<T> => {
    const payload = JSON.parse(response.payload) as IPayload<T>;

    return payload;
};

test('[GET] /api/users should return 200 status', async (t) => {
        const response = await server.inject({
            method: 'GET',
            url: '/api/users',
        });

        const payload = extractPayload<IUser[]>(response);

        t.equals(response.statusCode, 200, 'Status code is 200');
        t.equals(payload.data.length, 0, 'Data is empty');

        t.end();
        server.stop();
});

test('[POST] /api/users should return 201', async (t) => {
    const response = await server.inject({
        method: 'POST',
        url: '/api/users',
        payload: {
            age: 33,
            name: 'John',
            lastName: 'Doe',
        }
    });

    const payload = extractPayload<IUser>(response);

    t.equal(response.statusCode, 200, 'Status is 200');
    t.assert(typeof payload.data.id === 'string', 'ID is a string');

    t.end();
    server.stop();
});
