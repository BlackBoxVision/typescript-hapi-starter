import * as test from 'tape';
import { TestCase, Test } from 'tape';
import Server from '../src/server';
import * as Hapi from 'hapi';
import { serverTest, extractPayload } from './helpers';
import User from '../src/model/user';
import UserResolver from '../src/api/users/resolver';


interface IUser {
    id?: string;
    age: number;
    name: string;
    lastName: string;
}

const createTestUser = async () => {
    const user = new User();
    user.age = '33';
    user.name = 'John';
    user.lastName = 'Doe';

    const dataSource = new UserResolver();
    return await dataSource.save(user);
};

serverTest('[GET] /api/users should return 200 status', async (server, t) => {
    const response = await server.inject({
        method: 'GET',
        url: '/api/users',
    });

    const payload = extractPayload<IUser[]>(response);

    t.equals(response.statusCode, 200, 'Status code is 200');
    t.equals(payload.data.length, 0, 'Data is empty');
});

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

    t.equal(response.statusCode, 200, 'Status is 200');
    t.assert(typeof payload.data.id === 'string', 'ID is a string');
});

serverTest('[Get] /api/users should return single result', async (server, t) => {
    await createTestUser();

    const response = await server.inject({
        method: 'GET',
        url: '/api/users',
    });

    const payload = extractPayload<IUser[]>(response);

    t.equal(response.statusCode, 200, 'Status is 200');
    t.equal(payload.data.length, 1, 'One result returned');
});

// test('[GET] /api/users should return 200 status', async (t) => {
//     const instance = await startServer();

//     const response = await instance.inject({
//         method: 'GET',
//         url: '/api/users',
//     });

//     const payload = extractPayload<IUser[]>(response);

//     t.equals(response.statusCode, 200, 'Status code is 200');
//     t.equals(payload.data.length, 0, 'Data is empty');

//     await instance.stop();
//     t.end();
// });

// test('[POST] /api/users should return 201', async (t) => {
//     const instance = await startServer();

//     const response = await instance.inject({
//         method: 'POST',
//         url: '/api/users',
//         payload: {
//             age: 33,
//             name: 'John',
//             lastName: 'Doe',
//         }
//     });

//     const payload = extractPayload<IUser>(response);

//     t.equal(response.statusCode, 200, 'Status is 200');
//     t.assert(typeof payload.data.id === 'string', 'ID is a string');

//     instance.stop();
//     t.end();
// });
