import { NedbDataStoreTypes } from "../src/ioc/datastore";
import { serverTest, extractPayload, insertRecords, nedbGetStore, clearDB, TestCallbackFunc } from './helpers';

interface IUser {
    id?: string;
    age: number;
    name: string;
    lastName: string;
}

const cleanup: TestCallbackFunc = (container, server) => {
    const store = nedbGetStore(NedbDataStoreTypes.USERS);
    clearDB(store);
};

serverTest('[GET] /api/users should return 200 status', async (server, t) => {
    const response = await server.inject({
        method: 'GET',
        url: '/api/users',
    });

    const payload = extractPayload<IUser[]>(response);

    t.equals(response.statusCode, 200, 'Status code is 200');
    t.equals(payload.data.length, 0, 'Data should be empty');
}, cleanup, cleanup);

serverTest('[GET] /api/users should return a list of users', async (server, t) => {
    const store = nedbGetStore(NedbDataStoreTypes.USERS);

    await insertRecords<IUser[]>([{
        name: 'John',
        lastName: 'Doe',
        age: 23,
    }, {
        name: 'Jane',
        lastName: 'Doe',
        age: 21,
    }], store);

    const response = await server.inject({
        method: 'GET',
        url: '/api/users',
    });

    const payload = extractPayload<IUser[]>(response);

    t.equals(response.statusCode, 200, 'Status code is 200');
    t.equals(payload.data.length, 2, 'Response should contain 2 records');
}, cleanup, cleanup);

serverTest('[POST] /api/users should return 201', async (server, t) => {
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

    t.equal(response.statusCode, 201, 'Status is 201');
    t.assert(typeof payload.data.id === 'string', 'ID is a string');

    const store = nedbGetStore(NedbDataStoreTypes.USERS);
    clearDB(store);
}, cleanup, cleanup);
